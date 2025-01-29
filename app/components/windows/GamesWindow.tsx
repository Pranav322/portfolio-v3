import { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { IconDeviceGamepad2, IconX, IconMinus, IconSquare } from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';

interface GamesWindowProps {
  onClose: () => void;
}

export function GamesWindow({ onClose }: GamesWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragControls = useDragControls();

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  if (isMinimized) return null;

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
      initialWidth={800}
      initialHeight={600}
    >
      <div className="h-full flex flex-col">
        <motion.div
          className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={e => !isMaximized && dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 p-1.5 rounded-full">
              <IconDeviceGamepad2 size={16} className="text-purple-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Games</span>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              className="p-2 rounded-full"
              onClick={handleMinimize}
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

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <IconDeviceGamepad2 size={48} className="text-purple-400 mx-auto" />
            <h2 className="text-xl font-medium text-white/90">Coming Soon!</h2>
            <p className="text-white/70">
              Or maybe not
              <br />
            </p>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
