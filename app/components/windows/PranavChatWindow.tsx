import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import {
  IconCircleX,
  IconLoader2,
  IconMessageCircle,
  IconMinus,
  IconRefresh,
  IconSend,
  IconSquare,
  IconX,
} from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';
import { TurnstileWidget } from '../ui/TurnstileWidget';

interface PranavChatWindowProps {
  onClose: () => void;
}

interface Citation {
  filename: string;
  fileId?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  failed?: boolean;
}

type StreamEvent =
  | { type: 'delta'; text: string }
  | { type: 'citation'; filename: string; fileId?: string }
  | { type: 'done' }
  | { type: 'error'; code: string; message: string };

const greeting: Message = {
  role: 'assistant',
  content: "Hi! I'm Pranav AI. Ask about Pranav's skills, experience, or projects.",
};

const suggestions = [
  "What are Pranav's strongest technical skills?",
  'Which projects best demonstrate his backend experience?',
  'Summarize his professional experience.',
];

const cleanText = (value: string) =>
  value.replace(/<\/?think>/gi, '').replace(/<\/?reasoning>/gi, '');

export function PranavChatWindow({ onClose }: PranavChatWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const dragControls = useDragControls();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    fetch('/api/pranav/session', { cache: 'no-store' })
      .then(response => response.json())
      .then(data => setIsVerified(Boolean(data.verified)))
      .catch(() => setIsVerified(false))
      .finally(() => setIsCheckingSession(false));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const updateLastAssistant = useCallback((update: (message: Message) => Message) => {
    setMessages(previous => {
      const next = [...previous];
      const index = next.length - 1;
      if (index >= 0 && next[index].role === 'assistant') next[index] = update(next[index]);
      return next;
    });
  }, []);

  const consumeStream = async (response: Response) => {
    if (!response.body) throw new Error('Streaming is unavailable');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let failed = false;

    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const blocks = buffer.split(/\r?\n\r?\n/);
      buffer = blocks.pop() || '';

      for (const block of blocks) {
        const data = block
          .split('\n')
          .find(line => line.startsWith('data:'))
          ?.slice(5)
          .trim();
        if (!data) continue;
        const streamEvent = JSON.parse(data) as StreamEvent;

        if (streamEvent.type === 'delta') {
          updateLastAssistant(message => ({
            ...message,
            content: cleanText(message.content + streamEvent.text),
          }));
        } else if (streamEvent.type === 'citation') {
          updateLastAssistant(message => {
            const citations = message.citations ?? [];
            const duplicate = citations.some(
              citation =>
                citation.filename === streamEvent.filename && citation.fileId === streamEvent.fileId
            );
            return duplicate
              ? message
              : {
                  ...message,
                  citations: [
                    ...citations,
                    { filename: streamEvent.filename, fileId: streamEvent.fileId },
                  ],
                };
          });
        } else if (streamEvent.type === 'error') {
          failed = true;
          updateLastAssistant(message => ({
            ...message,
            content: streamEvent.message,
            citations: [],
            failed: true,
          }));
          setStatus(streamEvent.message);
        }
      }
      if (done) break;
    }
    return failed;
  };

  const sendMessage = async (suggestedMessage?: string) => {
    const userMessage = (suggestedMessage ?? input).trim();
    if (!userMessage || isLoading || !isVerified) return;

    const history = messages.map(({ role, content }) => ({ role, content }));
    setInput('');
    setStatus('Pranav AI is thinking…');
    setMessages(previous => [
      ...previous,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: '' },
    ]);
    setIsLoading(true);
    abortRef.current = new AbortController();

    try {
      const response = await fetch('/api/pranav/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history }),
        signal: abortRef.current.signal,
      });

      if (response.status === 401) {
        setIsVerified(false);
        throw new Error('Your verification expired. Please verify again.');
      }
      if (response.status === 429) throw new Error('Chat limit reached. Please try again later.');
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to get a response.');
      }

      const failed = await consumeStream(response);
      if (!failed) setStatus('Answer complete.');
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        updateLastAssistant(message => ({
          ...message,
          content: message.content || 'Response stopped.',
          failed: true,
        }));
        setStatus('Response stopped.');
      } else {
        const message = error instanceof Error ? error.message : 'Pranav AI is unavailable.';
        updateLastAssistant(previous => ({ ...previous, content: message, failed: true }));
        setStatus(message);
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([greeting]);
    setInput('');
    setStatus('Chat cleared.');
  };

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full border border-purple-400/20 bg-gray-950/95 px-4 py-2 text-sm text-purple-200 shadow-xl backdrop-blur transition hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        aria-label="Restore Pranav AI"
      >
        <IconMessageCircle size={16} />
        Pranav AI
      </button>
    );
  }

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={() => setIsMinimized(true)}
      initialWidth={800}
      initialHeight={600}
    >
      <div className="h-full flex flex-col">
        <motion.div
          className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={event => !isMaximized && dragControls.start(event)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 p-1.5 rounded-full">
              <IconMessageCircle size={16} className="text-purple-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Pranav AI</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={clearChat}
              title="Clear chat"
              aria-label="Clear chat"
              className="p-2 rounded-full hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <IconRefresh size={14} className="text-white/80" />
            </button>
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              title="Minimize"
              aria-label="Minimize"
              className="p-2 rounded-full hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <IconMinus size={14} className="text-white/80" />
            </button>
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              title={isMaximized ? 'Restore' : 'Maximize'}
              aria-label={isMaximized ? 'Restore' : 'Maximize'}
              className="p-2 rounded-full hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <IconSquare size={14} className="text-white/80" />
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close"
              aria-label="Close"
              className="p-2 rounded-full hover:bg-red-500/20 focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <IconX size={14} className="text-white/80" />
            </button>
          </div>
        </motion.div>

        {isCheckingSession ? (
          <div className="flex flex-1 items-center justify-center text-white/60">
            <IconLoader2 className="mr-2 animate-spin" size={18} /> Checking chat access…
          </div>
        ) : !isVerified ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 p-6 text-center">
            <div>
              <h2 className="text-lg font-medium text-white/90">Verify to chat</h2>
              <p className="mt-1 text-sm text-white/55">
                This keeps the public Azure demo fast and available for everyone.
              </p>
            </div>
            <TurnstileWidget onVerified={() => setIsVerified(true)} />
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4 custom-scrollbar mobile-hide-scrollbar">
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg border p-3 sm:p-4 ${
                          message.role === 'user'
                            ? 'border-purple-500/20 bg-purple-500/10'
                            : message.failed
                              ? 'border-red-400/20 bg-red-400/5'
                              : 'border-white/10 bg-white/5'
                        }`}
                      >
                        {message.content ? (
                          <p className="whitespace-pre-wrap text-xs text-white/75 sm:text-sm">
                            {cleanText(message.content)}
                          </p>
                        ) : (
                          <span className="flex items-center gap-2 text-sm text-white/55">
                            <IconLoader2 size={14} className="animate-spin text-purple-400" />
                            Searching Pranav&apos;s résumé…
                          </span>
                        )}
                        {message.citations && message.citations.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                            {message.citations.map(citation => (
                              <span
                                key={`${citation.fileId ?? ''}:${citation.filename}`}
                                className="rounded-full border border-purple-400/20 bg-purple-400/10 px-2.5 py-1 text-xs text-purple-200"
                              >
                                Source: {citation.filename}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {messages.length === 1 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {suggestions.map(suggestion => (
                      <button
                        type="button"
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-left text-xs text-white/60 transition hover:bg-white/10 hover:text-white/80"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/5 p-3">
              <div className="flex h-10 gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  maxLength={1000}
                  onChange={event => setInput(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask about Pranav…"
                  aria-label="Message Pranav AI"
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-purple-500/50 sm:px-4 sm:text-sm"
                  disabled={isLoading}
                />
                {isLoading ? (
                  <button
                    type="button"
                    onClick={() => abortRef.current?.abort()}
                    aria-label="Stop response"
                    className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 text-red-300 transition hover:bg-red-400/20 sm:px-4"
                  >
                    <IconCircleX size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    aria-label="Send message"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 transition hover:bg-white/10 disabled:opacity-40 sm:px-4"
                  >
                    <IconSend size={16} className="text-purple-400" />
                  </button>
                )}
              </div>
              <p className="sr-only" role="status" aria-live="polite">
                {status}
              </p>
            </div>
          </>
        )}
      </div>
    </WindowWrapper>
  );
}
