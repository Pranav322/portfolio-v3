import React, { useState, useEffect, useRef } from 'react';
import {
  IconX,
  IconMinus,
  IconSquare,
  IconUser,
  IconBrandGithub,
  IconExternalLink,
} from '@tabler/icons-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { WindowWrapper } from '../ui/WindowWrapper';
import { skills } from '../helpers/Skills';
import { projects } from '../helpers/Projects';
interface AboutWindowProps {
  onClose: () => void;
}

export default function AboutWindow({ onClose }: AboutWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragControls = useDragControls();

  const handleMinimize = () => {
    setIsMinimized(true);
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
        {/* Window Header */}
        <motion.div
          className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={e => !isMaximized && dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-1.5 rounded-full">
              <IconUser size={16} className="text-blue-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">About Me</span>
          </div>
          {/* Window Controls */}
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

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 h-[calc(100%-3rem)] overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                  Pranav Kumar
                </h1>
                <p className="text-lg text-blue-400 mb-4">Full Stack Developer</p>
                <div className="flex justify-center gap-6 text-sm">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <span>📍</span> <p className="text-white/90">Chandigarh</p>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <span>📧</span> <p className="text-white/90">pranavdotdev@gmail.com</p>
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                    onClick={() => window.open('https://github.com/Pranav322', '_blank')}
                  >
                    <span>🔗</span> <p className="text-white/90">github.com/pranav322</p>
                  </motion.button>
                </div>
              </motion.div>

              {/* About Section */}
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold mb-4 text-blue-400">About</h2>
                <p className="text-white/70 leading-relaxed">
                  Full Stack Developer with a passion for building beautiful, functional, and
                  user-friendly applications. I specialize in React, Next.js, Node.js, and modern
                  web technologies and asking chatgpt to do things for me.
                </p>
              </motion.section>

              {/* Skills Section */}
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Skills</h2>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map(category => (
                    <motion.div
                      key={category.category}
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/5 p-4 rounded-lg border border-white/10"
                    >
                      <h3 className="text-blue-400/80 font-medium mb-3">{category.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map(skill => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/70"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Featured Projects Section */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Featured Projects</h2>
                <div className="grid grid-cols-2 gap-4">
                  {projects.slice(0, 4).map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
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
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-white/90 mb-2 group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.techStack.slice(0, 3).map(tech => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/70"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
