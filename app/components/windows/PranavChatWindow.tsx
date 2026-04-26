import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragControls } from 'framer-motion';
import {
  IconX,
  IconMinus,
  IconSquare,
  IconMessageCircle,
  IconSend,
  IconLoader2,
} from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';

interface PranavChatWindowProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{
    document_id: string;
    document_name: string;
    content: string;
    similarity: number;
  }>;
}

const CHAT_API_URL = process.env.NEXT_PUBLIC_PRANAV_AI_URL || 'http://localhost:8001';

export function PranavChatWindow({ onClose }: PranavChatWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragControls = useDragControls();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Pranav AI. Ask me anything about Pranav's skills, experience, or projects!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch(`${CHAT_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, chat_history: chatHistory }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response, sources: data.sources },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't connect to the server. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
      initialWidth={800}
      initialHeight={600}
    >
      <div className="h-full flex flex-col">
        {/* Header - exactly like SkillsWindow */}
        <motion.div
          className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={e => !isMaximized && dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 p-1.5 rounded-full">
              <IconMessageCircle size={16} className="text-purple-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Pranav AI</span>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              className="p-2 rounded-full"
            >
              <IconMinus size={14} className="text-white/80" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 rounded-full"
            >
              <IconSquare size={14} className="text-white/80" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
              onClick={onClose}
              className="p-2 rounded-full"
            >
              <IconX size={14} className="text-white/80" />
            </motion.button>
          </div>
        </motion.div>

        {/* Content - matching SkillsWindow pattern */}
        <div className="p-3 sm:p-4 h-[calc(100%-3rem-4rem)] overflow-y-auto custom-scrollbar mobile-hide-scrollbar">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] bg-white/5 p-3 sm:p-4 rounded-lg border border-white/10 ${
                      message.role === 'user' ? 'bg-purple-500/10 border-purple-500/20' : ''
                    }`}
                  >
                    <p className="text-white/70 text-xs sm:text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <p className="text-xs text-white/40">Sources:</p>
                        {message.sources.map((source, i) => (
                          <p key={i} className="text-xs text-purple-400/70">
                            📄 {source.document_name} ({Math.round(source.similarity * 100)}%)
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 p-3 sm:p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <IconLoader2 size={14} className="text-purple-400 animate-spin" />
                    <span className="text-xs sm:text-sm text-white/60">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </motion.div>
        </div>

        {/* Input Area */}
        <div className="h-16 p-3 border-t border-white/10 bg-white/5">
          <div className="flex gap-2 h-full">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-3 sm:px-4 bg-white/5 hover:bg-white/10 disabled:opacity-50 rounded-lg border border-white/10 transition-colors touch-target"
            >
              <IconSend size={16} className="text-purple-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
