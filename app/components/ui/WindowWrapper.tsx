import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Resizable } from 're-resizable';
import { useDragControls } from 'framer-motion';

interface WindowWrapperProps {
  children: React.ReactNode;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  initialWidth?: number;
  initialHeight?: number;
}

export function WindowWrapper({
  children,
  isMaximized,
  onClose,
  onMinimize,
  initialWidth = 800,
  initialHeight = 600,
}: WindowWrapperProps) {
  const [position, setPosition] = useState({ x: window.innerWidth / 4, y: window.innerHeight / 8 });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const windowRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      <div ref={constraintsRef} className="absolute inset-0">
        <motion.div
          ref={windowRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: isMaximized ? 0 : position.x,
            y: isMaximized ? 0 : position.y,
            width: isMaximized ? '100%' : size.width,
            height: isMaximized ? '100%' : size.height,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          drag={!isMaximized}
          dragControls={dragControls}
          dragConstraints={constraintsRef}
          dragMomentum={false}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          className="fixed bg-gradient-to-br from-gray-900/95 to-black/95 rounded-xl overflow-hidden border border-white/10"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
        >
          {!isMaximized && (
            <Resizable
              size={size}
              onResizeStop={(e, direction, ref, d) => {
                setSize({
                  width: size.width + d.width,
                  height: size.height + d.height,
                });
              }}
              enable={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
              }}
              minWidth={400}
              minHeight={300}
            >
              {children}
            </Resizable>
          )}
          {isMaximized && children}
        </motion.div>
      </div>
      <div className="window-controls">
        <button onClick={onMinimize}>Minimize</button>
      </div>
    </motion.div>
  );
}
