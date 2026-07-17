import { cleanModelText } from './security';
import { getAzureAgentConfig } from './config';

export type ChatHistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type Citation = {
  filename: string;
  fileId?: string;
};

type AzureAnnotation = {
  type?: string;
  filename?: string;
  file_id?: string;
};

const collectAnnotations = (value: unknown, annotations: AzureAnnotation[] = []) => {
  if (!value || typeof value !== 'object') return annotations;
  if (Array.isArray(value)) {
    value.forEach(item => collectAnnotations(item, annotations));
    return annotations;
  }

  const record = value as Record<string, unknown>;
  if (record.type === 'file_citation' && typeof record.filename === 'string') {
    annotations.push(record as AzureAnnotation);
  }
  Object.values(record).forEach(item => collectAnnotations(item, annotations));
  return annotations;
};

export const citationsFromEvent = (event: unknown): Citation[] => {
  const unique = new Map<string, Citation>();
  for (const annotation of collectAnnotations(event)) {
    const citation = { filename: annotation.filename!, fileId: annotation.file_id };
    unique.set(`${citation.fileId ?? ''}:${citation.filename}`, citation);
  }
  return [...unique.values()];
};

export async function createAzureResponseStream(
  message: string,
  history: ChatHistoryMessage[],
  signal: AbortSignal
) {
  const { endpoint, agentName, agentVersion, apiKey } = getAzureAgentConfig();
  const response = await fetch(`${endpoint}/openai/v1/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      input: [...history, { role: 'user', content: message }],
      stream: true,
      include: ['file_search_call.results'],
      agent_reference: {
        name: agentName,
        version: agentVersion,
        type: 'agent_reference',
      },
    }),
    signal,
  });

  if (!response.ok || !response.body) {
    const errorBody = await response.text();
    console.error('Azure agent request failed', response.status, errorBody.slice(0, 500));
    throw new Error(`Azure agent returned ${response.status}`);
  }

  return response.body;
}

export const parseAzureEvent = (block: string) => {
  const data = block
    .split('\n')
    .filter(line => line.startsWith('data:'))
    .map(line => line.slice(5).trimStart())
    .join('\n');
  if (!data || data === '[DONE]') return null;
  try {
    return JSON.parse(data) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const deltaFromAzureEvent = (event: Record<string, unknown>) =>
  event.type === 'response.output_text.delta' && typeof event.delta === 'string'
    ? cleanModelText(event.delta)
    : '';
