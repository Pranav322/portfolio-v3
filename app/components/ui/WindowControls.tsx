import React from 'react';
import { motion } from 'framer-motion';
import { IconMinus, IconSquare, IconX } from '@tabler/icons-react';

interface WindowControlsProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose: () => void;
  isMaximized?: boolean;
}

export function WindowControls({
  onMinimize,
  onMaximize,
  onClose,
  isMaximized,
}: WindowControlsProps) {
  return (
    <div className="flex items-center gap-1">
      {onMinimize && (
        <motion.button
          aria-label="Minimize window"
          whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
          onClick={onMinimize}
          className="p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <IconMinus size={14} className="text-white/80" />
        </motion.button>
      )}
      {onMaximize && (
        <motion.button
          aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
          whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
          onClick={onMaximize}
          className="p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <IconSquare size={14} className="text-white/80" />
        </motion.button>
      )}
      <motion.button
        aria-label="Close window"
        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
        onClick={onClose}
        className="p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      >
        <IconX size={14} className="text-white/80" />
      </motion.button>
    </div>
  );
}
