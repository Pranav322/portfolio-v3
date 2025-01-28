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

interface ProjectsWindowProps {
  onClose: () => void;
}

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export function ProjectsWindow({ onClose }: ProjectsWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

  // Sample projects data
  const projects: Project[] = [
    {
      title: 'Portfolio Website',
      description:
        'A modern portfolio website with CLI and GUI interfaces built with Next.js and TailwindCSS.',
      image: '/projects/portfolio.png',
      techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
      githubUrl: 'https://github.com/yourusername/portfolio',
      liveUrl: 'https://yourportfolio.com',
    },
    {
      title: 'ElecTrade',
      description:
        'Energy trading platform with blockchain integration allowing users to trade electricity',
      techStack: ['React', 'Node.js', 'MongoDB', 'Blockchain', 'Web3'],
      githubUrl: 'https://github.com/Pranav322/ElecTrade',
      liveUrl: 'https://electrade.demo',
      image: '/projects/electrade.png',
    },
    {
      title: 'TeamFinder',
      description: 'Platform for finding team members and projects with AI-powered matching',
      techStack: ['Next.js', 'Auth0', 'Prisma', 'PostgreSQL', 'Node.js'],
      githubUrl: 'https://github.com/Pranav322/TeamFinder',
      liveUrl: 'https://teamfinder.demo',
      image: '/projects/teamfinder.png',
    },
    {
      title: 'Redact - Privacy App',
      description: 'Cross-platform mobile app for hiding sensitive information in photos',
      techStack: ['Flutter', 'Dart', 'Firebase', 'Android SDK', 'iOS SDK'],
      githubUrl: 'https://github.com/Pranav322/redact',
      liveUrl: 'https://redact.demo',
      image: '/projects/redact.png',
    },
    {
      title: 'Tech Quiz App',
      description:
        'Mobile application for testing technical knowledge in various programming domains',
      techStack: ['Flutter', 'Dart', 'Firebase', 'Node.js'],
      githubUrl: 'https://github.com/Pranav322/Quizapp',
      liveUrl: 'https://quizapp.demo',
      image: '/projects/quizapp.png',
    },
    {
      title: 'Real Time Chat App',
      description: 'Secure messaging platform with real-time notifications and E2E encryption',
      techStack: ['Flutter', 'Node.js', 'Firebase', 'WebSocket', 'Dart'],
      githubUrl: 'https://github.com/Pranav322/ChatApp',
      liveUrl: 'https://chat.demo',
      image: '/projects/chat.png',
    },
  ];

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
            <div className="bg-yellow-500/20 p-1.5 rounded-full">
              <IconFolder size={16} className="text-yellow-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Projects</span>
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

        {/* Content Area */}
        <div className="p-6 overflow-auto custom-scrollbar">
          <motion.div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {project.image && (
                  <div className="h-40 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-white/90 mb-2 group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 text-xs"
                    >
                      <IconBrandGithub size={14} />
                      GitHub
                    </motion.a>
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 text-xs"
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
