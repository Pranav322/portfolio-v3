import React from 'react';
import { motion } from 'framer-motion';
import { IconMinus, IconSquare, IconX } from '@tabler/icons-react';

interface WindowControlsProps {
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  isMaximized: boolean;
}

export function WindowControls({
  onMinimize,
  onMaximize,
  onClose,
  isMaximized,
}: WindowControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <motion.button
        whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
        onClick={onMinimize}
        className="p-2 rounded-full"
        aria-label="Minimize window"
      >
        <IconMinus size={14} className="text-white/80" />
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
        onClick={onMaximize}
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
  );
}
