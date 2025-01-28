import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Minus, Maximize2, Minimize2, PenTool } from 'lucide-react';

interface SkillsWindowProps {
  onClose: () => void;
}

const skills = [
  {
    name: 'React/Next.js',
    description: 'Modern frontend development with TypeScript',
    icon: '⚛️',
    github: 'https://github.com/Pranav322/portfolio',
    projects: ['Portfolio Site', 'E-commerce Platform'],
  },
  {
    name: 'Node.js',
    description: 'Backend development & REST APIs',
    icon: '🚀',
    github: 'https://github.com/Pranav322/backend-boilerplate',
    projects: ['API Service', 'Authentication System'],
  },
  {
    name: 'Flutter',
    description: 'Cross-platform mobile development',
    icon: '📱',
    github: 'https://github.com/Pranav322/flutter-weather-app',
    projects: ['Weather App', 'Task Manager'],
  },
  {
    name: 'Python/Django',
    description: 'Full-stack web applications',
    icon: '🐍',
    github: 'https://github.com/Pranav322/ecommerce-django',
    projects: ['E-commerce Platform', 'CMS'],
  },
];

export function SkillsWindow({ onClose }: SkillsWindowProps) {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 4, y: window.innerHeight / 8 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        setPosition(prev => ({
          x: Math.min(prev.x, window.innerWidth - rect.width),
          y: Math.min(prev.y, window.innerHeight - rect.height),
        }));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        style={{
          width: isMaximized ? '95vw' : '750px',
          height: isMaximized ? '90vh' : '600px',
        }}
        className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        ref={windowRef}
      >
        <div className="h-14 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <PenTool size={18} className="text-blue-400" />
            </div>
            <span className="text-white/90 text-base font-medium">My Skills & Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Minus size={16} className="text-white/80" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMaximized ? (
                <Minimize2 size={16} className="text-white/80" />
              ) : (
                <Maximize2 size={16} className="text-white/80" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgb(239 68 68 / 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <X size={16} className="text-white/80" />
            </motion.button>
          </div>
        </div>

        <div className="p-8 h-[calc(100%-3.5rem)] overflow-y-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={item}
                className="relative group"
                onHoverStart={() => setHoveredSkill(index)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <motion.div
                  className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-2xl mb-1">{skill.icon}</div>
                    <motion.a
                      href={skill.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                    </motion.a>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">{skill.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{skill.description}</p>
                </motion.div>

                <AnimatePresence>
                  {hoveredSkill === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className="absolute z-10 top-full left-0 right-0 mt-4 bg-gray-900/95 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-xl"
                    >
                      <h4 className="text-sm font-medium text-blue-400 mb-3">Featured Projects</h4>
                      <div className="space-y-2">
                        {skill.projects.map((project, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                            {project}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
