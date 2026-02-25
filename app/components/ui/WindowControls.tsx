import { motion } from 'framer-motion';
import { IconX, IconMinus, IconSquare } from '@tabler/icons-react';

interface WindowControlsProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
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
      {onMinimize && (
        <motion.button
          type="button"
          aria-label="Minimize window"
          whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
          onClick={onMinimize}
          className="p-2 rounded-full text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <IconMinus size={14} />
        </motion.button>
      )}
      {onMaximize && (
        <motion.button
          type="button"
          aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
          whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
          onClick={onMaximize}
          className="p-2 rounded-full text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <IconSquare size={14} />
        </motion.button>
      )}
      {onClose && (
        <motion.button
          type="button"
          aria-label="Close window"
          whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
          onClick={onClose}
          className="p-2 rounded-full text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <IconX size={14} />
        </motion.button>
      )}
    </div>
  );
}
