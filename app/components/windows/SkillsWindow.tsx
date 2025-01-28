import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDragControls } from 'framer-motion';
import { IconX, IconMinus, IconSquare, IconTools } from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';

interface SkillsWindowProps {
  onClose: () => void;
}

const skills = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TailwindCSS', 'HTML/CSS', 'Redux'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Django', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Database',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase'],
  },
  {
    category: 'DevOps',
    items: ['Docker', 'Git', 'AWS', 'CI/CD', 'Linux'],
  },
];

export function SkillsWindow({ onClose }: SkillsWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

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

        <div className="p-6 h-[calc(100%-3rem)] overflow-y-auto">
          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6">
            {skills.map(category => (
              <motion.div
                key={category.category}
                variants={item}
                className="bg-white/5 p-4 rounded-lg border border-white/10"
              >
                <h3 className="text-green-400 font-medium mb-3">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-white/5 rounded-lg text-sm text-white/70 hover:text-white/90 transition-colors"
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
