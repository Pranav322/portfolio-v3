import { useState, useRef, useEffect } from 'react';
import {
  IconX,
  IconMinus,
  IconSquare,
  IconArrowLeft,
  IconArrowRight,
  IconRefresh,
  IconBrandGithub,
} from '@tabler/icons-react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';

interface BrowserWindowProps {
  onClose: () => void;
  initialUrl: string;
}

export function BrowserWindow({ onClose, initialUrl }: BrowserWindowProps) {
  const [url, setUrl] = useState(initialUrl);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 4, y: window.innerHeight / 8 });
  const windowRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [hasFrameError, setHasFrameError] = useState(false);

  const handleNavigate = (newUrl: string) => {
    try {
      const validUrl = new URL(newUrl.startsWith('http') ? newUrl : `https://${newUrl}`);

      // Block GitHub URLs in iframe
      if (validUrl.hostname.includes('github.com')) {
        window.open(validUrl.toString(), '_blank');
        setHasFrameError(true);
        return;
      }

      setUrl(validUrl.toString());
      setHistory(prev => [...prev.slice(0, currentIndex + 1), validUrl.toString()]);
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      setHasFrameError(true);
    }
  };

  const handleBack = () => currentIndex > 0 && setCurrentIndex(prev => prev - 1);
  const handleForward = () =>
    currentIndex < history.length - 1 && setCurrentIndex(prev => prev + 1);
  const handleRefresh = () => {
    if (iframeRef.current) {
      // Create a new URL to force refresh
      const url = new URL(iframeRef.current.src);
      url.searchParams.set('refresh', Date.now().toString());
      iframeRef.current.src = url.toString();
    }
  };

  useEffect(() => {
    if (iframeRef.current && history[currentIndex]) {
      iframeRef.current.src = history[currentIndex];
    }
  }, [currentIndex, history]);

  // Add window resize handler and drag logic similar to ProjectsWindow
  // ...

  // Add AnimatePresence and window management logic from AboutWindow
  const windowSize = isMaximized
    ? { width: '100%', height: '100%', x: 0, y: 0 }
    : { width: '800px', height: '600px', x: position.x, y: position.y };

  // Add resize handler from AboutWindow
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

  // Update drag handling to match AboutWindow
  const handleDragEnd = (event: any, info: any) => {
    if (!windowRef.current) return;
    const windowWidth = windowRef.current.offsetWidth;
    const windowHeight = windowRef.current.offsetHeight;

    const newX = Math.min(Math.max(0, position.x + info.delta.x), window.innerWidth - windowWidth);
    const newY = Math.min(
      Math.max(0, position.y + info.delta.y),
      window.innerHeight - windowHeight
    );

    setPosition({ x: newX, y: newY });
  };

  return (
    <AnimatePresence>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none">
        <motion.div
          ref={windowRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, ...windowSize }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          drag={!isMaximized}
          dragMomentum={false}
          dragControls={dragControls}
          dragConstraints={constraintsRef}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          className="fixed bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-lg overflow-hidden pointer-events-auto border border-white/10"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
        >
          {/* Title Bar with Browser Controls */}
          <motion.div
            className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
            onPointerDown={e => !isMaximized && dragControls.start(e)}
          >
            <div className="flex items-center gap-2 flex-1">
              {/* Navigation Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleBack}
                  disabled={currentIndex === 0}
                  className="p-1.5 hover:bg-white/10 rounded-full"
                >
                  <IconArrowLeft size={16} className="text-white/80" />
                </button>
                <button
                  onClick={handleForward}
                  disabled={currentIndex === history.length - 1}
                  className="p-1.5 hover:bg-white/10 rounded-full"
                >
                  <IconArrowRight size={16} className="text-white/80" />
                </button>
                <button onClick={handleRefresh} className="p-1.5 hover:bg-white/10 rounded-full">
                  <IconRefresh size={16} className="text-white/80" />
                </button>
              </div>

              {/* URL Bar */}
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleNavigate(url)}
                className="ml-2 px-3 py-1.5 bg-white/5 rounded text-sm text-white/80 flex-1"
                placeholder="Enter URL"
              />
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 ml-4">
              <motion.button
                whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-2 rounded-full"
              >
                {isMaximized ? <IconSquare size={14} /> : <IconSquare size={14} />}
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

          {/* Browser Content */}
          <div className="h-[calc(100%-3rem)] flex items-center justify-center">
            {hasFrameError ? (
              <div className="text-center p-8">
                <p className="text-red-400 mb-4">This site cannot be embedded</p>
                <button
                  onClick={() => window.open(history[currentIndex], '_blank')}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30"
                >
                  Open in New Tab
                </button>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={history[currentIndex]}
                className="w-full h-full"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onError={() => setHasFrameError(true)}
              />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
