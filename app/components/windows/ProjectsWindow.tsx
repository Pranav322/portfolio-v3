import { useState, useRef, useEffect } from 'react';
import {
  IconX,
  IconMinus,
  IconSquare,
  IconFolder,
  IconBrandGithub,
  IconExternalLink,
} from '@tabler/icons-react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { WindowWrapper } from '../ui/WindowWrapper';
import { projects } from '../helpers/Projects';
interface ProjectsWindowProps {
  onClose: () => void;
}

export function ProjectsWindow({ onClose }: ProjectsWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const [isMinimized, setIsMinimized] = useState(false);
  const handleMinimize = () => {
    setIsMinimized(true);
  };

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      initialWidth={800}
      initialHeight={600}
      onMinimize={handleMinimize}
    >
      <div className="h-full flex flex-col">
        <motion.div
          className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={e => !isMaximized && dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-1.5 rounded-full">
              <IconFolder size={16} className="text-yellow-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Projects</span>
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

        {/* Content Area */}
        <div className="p-3 sm:p-6 overflow-auto custom-scrollbar mobile-hide-scrollbar">
          {/* Mobile: Vertical stack, Tablet: 1 col, Desktop: 2-3 cols */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 w-full"
              >
                {project.image && (
                  <div className="h-32 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-3 sm:p-4">
                  <h3 className="text-white/90 font-medium mb-2 text-sm sm:text-base group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3">
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 border border-white/20 rounded-full text-xs text-white/90 backdrop-blur-sm shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 text-xs touch-target"
                      >
                        <IconBrandGithub size={14} />
                        GitHub
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 text-xs touch-target"
                      >
                        <IconExternalLink size={14} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </WindowWrapper>
  );
}
