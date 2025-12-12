import { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import {
  IconX,
  IconMinus,
  IconSquare,
  IconMessageCircle,
  IconArrowLeft,
  IconArrowRight,
  IconRefresh,
} from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';

interface PranavChatWindowProps {
  onClose: () => void;
}

export function PranavChatWindow({ onClose }: PranavChatWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const chatUrl = 'http://162.215.175.94:8000/chat';
  const [isMinimized, setIsMinimized] = useState(false);
  const [key, setKey] = useState(0); // For forcing iframe refresh

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const refresh = () => {
    // Force iframe refresh by changing key
    setKey(prev => prev + 1);
  };

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
      initialWidth={900}
      initialHeight={650}
    >
      <div className="h-full flex flex-col">
        <motion.div
          className="h-12 bg-gradient-to-r from-blue-800/50 to-blue-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={e => !isMaximized && dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-1.5 rounded-full">
              <IconMessageCircle size={16} className="text-blue-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Pranav AI Chat</span>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              onClick={handleMinimize}
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

        {/* Chat Controls */}
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 border-b border-white/10">
          <button onClick={refresh} className="p-1.5 rounded-full hover:bg-white/10">
            <IconRefresh size={16} className="text-white/80" />
          </button>
          <div className="flex-1 px-3 py-1.5 bg-blue-500/10 rounded-lg text-white/80 text-sm">
            {chatUrl}
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 bg-white">
          <iframe
            key={key}
            src={chatUrl}
            className="w-full h-full border-none"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            title="Pranav AI Chatbot"
          />
        </div>
      </div>
    </WindowWrapper>
  );
}
