import { motion } from 'framer-motion';
import { IconX, IconMinus, IconSquare } from '@tabler/icons-react';

interface WindowControlsProps {
  isMaximized?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  className?: string;
}

export function WindowControls({
  isMaximized = false,
  onMinimize,
  onMaximize,
  onClose,
  className = '',
}: WindowControlsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {onMinimize && (
        <motion.button
          whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
          onClick={onMinimize}
          aria-label="Minimize"
          title="Minimize"
          className="p-2 rounded-full focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-neutral-400"
        >
          <IconMinus size={14} className="text-white/80" />
        </motion.button>
      )}
      {onMaximize && (
        <motion.button
          whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
          onClick={onMaximize}
          aria-label={isMaximized ? 'Restore' : 'Maximize'}
          title={isMaximized ? 'Restore' : 'Maximize'}
          className="p-2 rounded-full focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-neutral-400"
        >
          <IconSquare size={14} className="text-white/80" />
        </motion.button>
      )}
      {onClose && (
        <motion.button
          whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
          onClick={onClose}
          aria-label="Close"
          title="Close"
          className="p-2 rounded-full focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-red-400"
        >
          <IconX size={14} className="text-white/80" />
        </motion.button>
      )}
    </div>
  );
}
