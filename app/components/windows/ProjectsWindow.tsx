import { useState, useRef } from 'react';
import {
  IconX,
  IconMinus,
  IconSquare,
  IconFolder,
  IconBrandGithub,
  IconExternalLink,
} from '@tabler/icons-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

interface ProjectsWindowProps {
  onClose: () => void;
}

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
}

export function ProjectsWindow({ onClose }: ProjectsWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 4, y: window.innerHeight / 8 });
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const projects: Project[] = [
    {
      title: 'TeamFinder',
      description:
        'A platform for finding team members for your projects. Connect with developers, designers, and other professionals.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      githubUrl: 'https://github.com/yourusername/teamfinder',
      liveUrl: 'https://teamfinder.demo',
      image: '/projects/teamfinder.png',
    },
    {
      title: 'Spotify-telegram-bot',
      description:
        'A Telegram bot that lets you control Spotify, search for songs, and share music with friends.',
      techStack: ['Python', 'Telegram API', 'Spotify API'],
      githubUrl: 'https://github.com/yourusername/spotify-telegram-bot',
    },
    {
      title: 'QuizApp',
      description:
        'An interactive quiz application with real-time scoring and multiplayer support.',
      techStack: ['Next.js', 'TypeScript', 'Firebase'],
      githubUrl: 'https://github.com/yourusername/quizapp',
      liveUrl: 'https://quizapp.demo',
    },
    {
      title: 'ElecTrade',
      description:
        'A cryptocurrency trading platform with real-time price updates and portfolio tracking.',
      techStack: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
      githubUrl: 'https://github.com/yourusername/electrade',
    },
  ];

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
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isMaximized ? 0 : position.x,
          y: isMaximized ? 0 : position.y,
          width: isMaximized ? '100%' : '900px',
          height: isMaximized ? '100%' : '600px',
        }}
        drag={!isMaximized}
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={(event, info) => {
          setPosition({ x: info.point.x, y: info.point.y });
        }}
        className={`fixed bg-black/80 backdrop-blur-md rounded-lg overflow-hidden pointer-events-auto`}
        style={{
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Window Title Bar - Make it the drag handle */}
        <motion.div
          className="h-10 bg-gray-900/50 flex items-center justify-between px-4 cursor-move"
          onPointerDown={e => {
            if (!isMaximized) {
              dragControls.start(e);
            }
          }}
        >
          <div className="flex items-center gap-2">
            <IconFolder size={16} className="text-yellow-400" />
            <span className="text-white/80 text-sm">Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => {}} className="p-1.5 hover:bg-gray-700/50 rounded-full">
              <IconMinus size={14} className="text-white/80" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 hover:bg-gray-700/50 rounded-full"
            >
              <IconSquare size={14} className="text-white/80" />
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-red-500/50 rounded-full">
              <IconX size={14} className="text-white/80" />
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="p-6 h-[calc(100%-2.5rem)] overflow-y-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                {project.image && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 transition-colors text-sm"
                    >
                      <IconBrandGithub size={16} />
                      GitHub
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 transition-colors text-sm"
                      >
                        <IconExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
