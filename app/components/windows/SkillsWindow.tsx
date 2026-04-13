import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDragControls } from 'framer-motion';
import { IconX, IconMinus, IconSquare, IconTools } from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';
import { skills } from '../helpers/Skills';
interface SkillsWindowProps {
  onClose: () => void;
}

export function SkillsWindow({ onClose }: SkillsWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragControls = useDragControls();
  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
        <motion.div
          className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={e => !isMaximized && dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-1.5 rounded-full">
              <IconTools size={16} className="text-green-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Skills</span>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              className="p-2 rounded-full"
              aria-label="Minimize"
              title="Minimize"
            >
              <IconMinus size={14} className="text-white/80" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 rounded-full"
              aria-label={isMaximized ? 'Restore' : 'Maximize'}
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              <IconSquare size={14} className="text-white/80" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
              onClick={onClose}
              className="p-2 rounded-full"
              aria-label="Close"
              title="Close"
            >
              <IconX size={14} className="text-white/80" />
            </motion.button>
          </div>
        </motion.div>

        <div className="p-3 sm:p-6 h-[calc(100%-3rem)] overflow-y-auto custom-scrollbar mobile-hide-scrollbar">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:gap-6"
          >
            {skills.map(category => (
              <motion.div
                key={category.category}
                variants={item}
                className="bg-white/5 p-3 sm:p-4 rounded-lg border border-white/10"
              >
                <h3 className="text-green-400 font-medium mb-3 text-sm sm:text-base">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.items.map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 rounded-lg text-xs sm:text-sm text-white/70 hover:text-white/90 transition-colors touch-target"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </WindowWrapper>
  );
}
