import { NextRequest, NextResponse } from 'next/server';
import {
  citationsFromEvent,
  createAzureResponseStream,
  deltaFromAzureEvent,
  parseAzureEvent,
  type ChatHistoryMessage,
} from '@/lib/pranav/azure';
import { getChatSecurityConfig } from '@/lib/pranav/config';
import {
  CHAT_SESSION_COOKIE,
  cleanModelText,
  getClientIp,
  hashClientIp,
  verifySessionToken,
} from '@/lib/pranav/security';

export const runtime = 'nodejs';
export const maxDuration = 60;

const encoder = new TextEncoder();
const event = (type: string, data: Record<string, unknown> = {}) =>
  encoder.encode(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`);

const validateHistory = (value: unknown): ChatHistoryMessage[] | null => {
  if (!Array.isArray(value)) return [];
  const history = value.slice(-8);
  let length = 0;
  const validated: ChatHistoryMessage[] = [];
  for (const item of history) {
    if (!item || typeof item !== 'object') return null;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
    const trimmed = content.trim().slice(0, 3000);
    length += trimmed.length;
    if (!trimmed || length > 12000) return null;
    validated.push({ role, content: trimmed });
  }
  return validated;
};

export async function POST(request: NextRequest) {
  try {
    if (Number(request.headers.get('content-length') || 0) > 32_000) {
      return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
    }

    const { sessionSecret } = getChatSecurityConfig();
    const ipHash = hashClientIp(getClientIp(request), sessionSecret);
    const sessionIsValid = verifySessionToken(
      request.cookies.get(CHAT_SESSION_COOKIE)?.value,
      ipHash,
      sessionSecret
    );
    if (!sessionIsValid) {
      return NextResponse.json({ error: 'Verification required.' }, { status: 401 });
    }

    const body = (await request.json()) as { message?: unknown; history?: unknown };
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const history = validateHistory(body.history);
    if (!message || message.length > 1000 || history === null) {
      return NextResponse.json({ error: 'Invalid message or chat history.' }, { status: 400 });
    }

    const timeout = new AbortController();
    const timeoutId = setTimeout(() => timeout.abort(), 55_000);
    const abort = () => timeout.abort();
    request.signal.addEventListener('abort', abort, { once: true });

    const stream = new ReadableStream({
      async start(controller) {
        let pending = '';
        const citations = new Map<string, { filename: string; fileId?: string }>();
        try {
          const upstream = await createAzureResponseStream(message, history, timeout.signal);
          const reader = upstream.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { value, done } = await reader.read();
            pending += decoder.decode(value, { stream: !done });
            const blocks = pending.split(/\r?\n\r?\n/);
            pending = blocks.pop() || '';

            for (const block of blocks) {
              const azureEvent = parseAzureEvent(block);
              if (!azureEvent) continue;
              const delta = deltaFromAzureEvent(azureEvent);
              if (delta) controller.enqueue(event('delta', { text: delta }));
              for (const citation of citationsFromEvent(azureEvent)) {
                citations.set(`${citation.fileId ?? ''}:${citation.filename}`, citation);
              }
              if (azureEvent.type === 'response.failed' || azureEvent.type === 'error') {
                throw new Error('Azure response failed');
              }
            }
            if (done) break;
          }

          for (const citation of citations.values()) {
            controller.enqueue(event('citation', citation));
          }
          if (citations.size === 0) {
            controller.enqueue(
              event('error', {
                code: 'citation_required',
                message:
                  "I couldn't verify that answer against Pranav's sources. Please try again.",
              })
            );
          } else {
            controller.enqueue(event('done'));
          }
        } catch (error) {
          const timedOut = timeout.signal.aborted && !request.signal.aborted;
          if (!request.signal.aborted) {
            controller.enqueue(
              event('error', {
                code: timedOut ? 'timeout' : 'upstream_error',
                message: timedOut
                  ? 'The answer took too long. Please try a shorter question.'
                  : 'Pranav AI is temporarily unavailable. Please try again.',
              })
            );
          }
          console.error('Pranav chat stream error', cleanModelText(String(error)));
        } finally {
          clearTimeout(timeoutId);
          request.signal.removeEventListener('abort', abort);
          controller.close();
        }
      },
      cancel() {
        timeout.abort();
        clearTimeout(timeoutId);
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('Pranav chat request error', error);
    return NextResponse.json({ error: 'Chat is temporarily unavailable.' }, { status: 503 });
  }
}
