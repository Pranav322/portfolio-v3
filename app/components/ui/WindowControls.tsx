import { IconMinus, IconSquare, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';

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
  isMaximized = false,
}: WindowControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <motion.button
        whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
        onClick={onMinimize}
        className="p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Minimize"
        type="button"
      >
        <IconMinus size={14} className="text-white/80" />
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
        onClick={onMaximize}
        className="p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label={isMaximized ? 'Restore' : 'Maximize'}
        type="button"
      >
        <IconSquare size={14} className="text-white/80" />
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
        onClick={onClose}
        className="p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
        aria-label="Close"
        type="button"
      >
        <IconX size={14} className="text-white/80" />
      </motion.button>
    </div>
  );
}
