import { useState, useEffect, useRef } from 'react';
import { IconX, IconMinus, IconSquare, IconUser } from '@tabler/icons-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { WindowWrapper } from '../ui/WindowWrapper';

interface AboutWindowProps {
  onClose: () => void;
}

export default function AboutWindow({ onClose }: AboutWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      initialWidth={900}
      initialHeight={600}
    >
      <div className="h-full flex flex-col">
        {/* Title Bar */}
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
                    <span>📍</span> Chandigarh
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <span>📧</span> pranavdotdev@gmail.com
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                    onClick={() =>
                      window.open('/browser?url=https://github.com/Pranav322', '_blank')
                    }
                  >
                    <span>🔗</span> github.com/pranav322
                  </motion.button>
                </div>
              </motion.div>

              <div className="grid grid-cols-[1fr_2fr] gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                  <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-xl font-semibold mb-4 text-blue-400">Education</h2>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 p-4 rounded-lg border border-white/5"
                    >
                      <h3 className="font-medium text-white/90">B.E. Computer Science</h3>
                      <p className="text-sm text-white/60 mt-2">Chandigarh University</p>
                      <p className="text-sm text-white/60">2020 - 2024</p>
                    </motion.div>
                  </motion.section>
                  <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-xl font-semibold mb-4 text-blue-400">Skills</h2>
                    <div className="space-y-3">
                      {[
                        'Languages',
                        'Backend Development',
                        'Databases',
                        'Mobile Development',
                        'Tools',
                      ].map((category, index) => (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/5 p-4 rounded-lg hover:bg-white/8 transition-colors border border-white/5"
                        >
                          <h3 className="font-medium mb-2 text-white/90">{category}</h3>
                          <p className="text-sm text-white/60">
                            {category === 'Languages' && 'JavaScript, TypeScript, Dart, SQL'}
                            {category === 'Backend Development' &&
                              'Node.js, Express.js, REST APIs, Authentication (JWT, OAuth)'}
                            {category === 'Databases' && 'PostgreSQL, MongoDB, SQLite, Prisma'}
                            {category === 'Mobile Development' &&
                              'Flutter, Firebase, Android/iOS SDKs'}
                            {category === 'Tools' &&
                              'Git, Docker, Firebase, Figma, React, Django, Next.js'}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-xl font-semibold mb-4 text-blue-400">Experience</h2>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 p-5 rounded-lg border border-white/5"
                    >
                      <h3 className="font-medium text-white/90">Full Stack Developer</h3>
                      <p className="text-sm text-blue-400/80 mt-1">Company Name • 2023 - Present</p>
                      <ul className="mt-3 space-y-2">
                        {[
                          'Developed and maintained web applications',
                          'Collaborated with cross-functional teams',
                          'Implemented new features and optimizations',
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-sm text-white/60"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/40" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.section>

                  <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-xl font-semibold mb-4 text-blue-400">Projects</h2>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 p-5 rounded-lg border border-white/5"
                    >
                      <h3 className="font-medium text-white/90">Portfolio Website</h3>
                      <div className="flex gap-2 mt-2">
                        {['Next.js', 'TypeScript', 'Tailwind CSS'].map((tech, index) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-white/60 mt-3">
                        A modern portfolio website with CLI and GUI interfaces
                      </p>
                    </motion.div>
                  </motion.section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
