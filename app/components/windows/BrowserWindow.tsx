import { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import {
  IconX,
  IconMinus,
  IconSquare,
  IconBrowser,
  IconArrowLeft,
  IconArrowRight,
  IconRefresh,
} from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';

interface BrowserWindowProps {
  onClose: () => void;
  initialUrl?: string;
}

export function BrowserWindow({
  onClose,
  initialUrl = 'https://iframee.vercel.app',
}: BrowserWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const [url, setUrl] = useState(initialUrl);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  if (isMinimized) return null;

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newUrl]);
    setHistoryIndex(prev => prev + 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setUrl(history[historyIndex + 1]);
    }
  };

  const refresh = () => {
    // Force iframe refresh by temporarily setting src to empty
    setUrl('');
    setTimeout(() => setUrl(history[historyIndex]), 100);
  };

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
      initialWidth={1000}
      initialHeight={700}
    >
      <div className="h-full flex flex-col">
        <motion.div
          className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={e => !isMaximized && dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-1.5 rounded-full">
              <IconBrowser size={16} className="text-blue-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Browser</span>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              className="p-2 rounded-full"
              onClick={handleMinimize}
              aria-label="Minimize window"
            >
              <IconMinus size={14} className="text-white/80" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 rounded-full"
              aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
            >
              <IconSquare size={14} className="text-white/80" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
              onClick={onClose}
              className="p-2 rounded-full"
              aria-label="Close window"
            >
              <IconX size={14} className="text-white/80" />
            </motion.button>
          </div>
        </motion.div>

        {/* Browser Controls */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border-b border-white/10">
          <button
            onClick={goBack}
            disabled={historyIndex === 0}
            className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <IconArrowLeft size={16} className="text-white/80" />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex === history.length - 1}
            className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <IconArrowRight size={16} className="text-white/80" />
          </button>
          <button onClick={refresh} className="p-1.5 rounded-full hover:bg-white/10">
            <IconRefresh size={16} className="text-white/80" />
          </button>
          <input
            type="text"
            value={url}
            onChange={e => handleUrlChange(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-white/5 rounded-lg text-white/80 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400/50"
          />
        </div>

        {/* Browser Content */}
        <div className="flex-1 bg-white">
          <iframe
            src={url}
            className="w-full h-full border-none"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>
    </WindowWrapper>
  );
}
