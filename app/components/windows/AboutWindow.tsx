import { useState, useEffect, useRef } from 'react';
import { IconX, IconMinus, IconSquare, IconUser } from '@tabler/icons-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

interface AboutWindowProps {
  onClose: () => void;
}

export function AboutWindow({ onClose }: AboutWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 4, y: window.innerHeight / 8 });
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        setPosition(prev => ({
          x: Math.min(prev.x, window.innerWidth - rect.width),
          y: Math.min(prev.y, window.innerHeight - rect.height)
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    // Constrain the window within viewport bounds
    const newX = Math.min(Math.max(0, info.point.x), window.innerWidth - (windowRef.current?.offsetWidth || 0));
    const newY = Math.min(Math.max(0, info.point.y), window.innerHeight - (windowRef.current?.offsetHeight || 0));
    setPosition({ x: newX, y: newY });
  };

  const windowSize = isMaximized ? {
    width: '100%',
    height: '100%',
    x: 0,
    y: 0
  } : {
    width: '800px',
    height: '600px',
    x: position.x,
    y: position.y
  };

  return (
    <AnimatePresence>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none">
        <motion.div
          ref={windowRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            ...windowSize
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          drag={!isMaximized}
          dragMomentum={false}
          dragControls={dragControls}
          dragConstraints={constraintsRef}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          className={`fixed bg-black/80 backdrop-blur-md rounded-lg overflow-hidden pointer-events-auto ${
            isMaximized ? 'top-0 left-0' : ''
          }`}
          style={{ 
            boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Window Title Bar */}
          <motion.div 
            className="h-10 bg-gray-900/50 flex items-center justify-between px-4 cursor-move"
            onPointerDown={(e) => {
              if (!isMaximized) {
                dragControls.start(e);
              }
            }}
          >
            <div className="flex items-center gap-2">
              <IconUser size={16} className="text-blue-400" />
              <span className="text-white/80 text-sm">About Me</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onClose()}
                className="p-1.5 hover:bg-gray-700/50 rounded-full"
              >
                <IconMinus size={14} className="text-white/80" />
              </button>
              <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 hover:bg-gray-700/50 rounded-full"
              >
                <IconSquare size={14} className="text-white/80" />
              </button>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-red-500/50 rounded-full"
              >
                <IconX size={14} className="text-white/80" />
              </button>
            </div>
          </motion.div>

          {/* Resume Content */}
          <div className="p-6 h-[calc(100%-2.5rem)] overflow-y-auto">
            <div className="max-w-4xl mx-auto text-white/90">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">Pranav Kumar</h1>
                <p className="text-blue-400">Full Stack Developer</p>
                <div className="flex justify-center gap-4 mt-2 text-sm text-white/60">
                  <span>📍 Location</span>
                  <span>📧 your@email.com</span>
                  <span>🔗 github.com/yourusername</span>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_2fr] gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-blue-400">Skills</h2>
                    <div className="space-y-2">
                      <div className="bg-white/5 p-2 rounded">
                        <h3 className="font-medium mb-1">Frontend</h3>
                        <p className="text-sm text-white/60">React, Next.js, TypeScript, Tailwind</p>
                      </div>
                      <div className="bg-white/5 p-2 rounded">
                        <h3 className="font-medium mb-1">Backend</h3>
                        <p className="text-sm text-white/60">Node.js, Express, MongoDB</p>
                      </div>
                      <div className="bg-white/5 p-2 rounded">
                        <h3 className="font-medium mb-1">Tools</h3>
                        <p className="text-sm text-white/60">Git, Docker, AWS</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-blue-400">Education</h2>
                    <div className="bg-white/5 p-2 rounded">
                      <h3 className="font-medium">B.E. Computer Science</h3>
                      <p className="text-sm text-white/60">Chandigarh University</p>
                      <p className="text-sm text-white/60">2020 - 2024</p>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-blue-400">Experience</h2>
                    <div className="space-y-4">
                      <div className="bg-white/5 p-3 rounded">
                        <h3 className="font-medium">Full Stack Developer</h3>
                        <p className="text-sm text-white/60">Company Name • 2023 - Present</p>
                        <ul className="list-disc list-inside text-sm text-white/60 mt-2">
                          <li>Developed and maintained web applications</li>
                          <li>Collaborated with cross-functional teams</li>
                          <li>Implemented new features and optimizations</li>
                        </ul>
                      </div>
                      {/* Add more experience items */}
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-blue-400">Projects</h2>
                    <div className="space-y-4">
                      <div className="bg-white/5 p-3 rounded">
                        <h3 className="font-medium">Portfolio Website</h3>
                        <p className="text-sm text-white/60">Next.js, TypeScript, Tailwind CSS</p>
                        <p className="text-sm text-white/60 mt-2">
                          A modern portfolio website with CLI and GUI interfaces
                        </p>
                      </div>
                      {/* Add more projects */}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 