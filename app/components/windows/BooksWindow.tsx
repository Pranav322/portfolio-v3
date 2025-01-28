'use client';
import { useState, useRef, useEffect } from 'react';
import { IconX, IconMinus, IconSquare, IconBook } from '@tabler/icons-react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { WindowWrapper } from '../ui/WindowWrapper';
import React from 'react';

interface BooksWindowProps {
  onClose: () => void;
}

interface Book {
  title: string;
  path: string;
}

export function BooksWindow({ onClose }: BooksWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 4, y: window.innerHeight / 8 });
  const windowRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  // Handle window resize
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

  const handleDragEnd = (event: any, info: any) => {
    if (!windowRef.current) return;

    const windowWidth = windowRef.current.offsetWidth;
    const windowHeight = windowRef.current.offsetHeight;

    // Calculate position relative to the drag start point
    const newX = Math.min(Math.max(0, position.x + info.delta.x), window.innerWidth - windowWidth);
    const newY = Math.min(
      Math.max(0, position.y + info.delta.y),
      window.innerHeight - windowHeight
    );

    setPosition({ x: newX, y: newY });
  };

  const windowSize = isMaximized
    ? { width: '100%', height: '100%', x: 0, y: 0 }
    : { width: '800px', height: '600px', x: position.x, y: position.y };

  // PDF viewer plugin
  const pdfWorkerUrl = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

  const books: Book[] = [
    { title: 'Woman By Charles Bukowski', path: '/books/Women-CharlesBukowski.pdf' },
    // Add more books here
  ];

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
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
              <IconBook size={16} className="text-yellow-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Books</span>
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
        <div className="flex-1 overflow-hidden">
          {!selectedBook ? (
            <div className="grid grid-cols-4 gap-4">
              {books.map(book => (
                <div
                  key={book.title}
                  onClick={() => setSelectedBook(book.path)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <IconBook size={48} className="text-yellow-400" />
                  <span className="text-white/80 text-sm text-center">{book.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex justify-between mb-4">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-white/80 hover:text-white"
                >
                  ← Back to Books
                </button>
              </div>
              <div className="flex-1 bg-white rounded-lg">
                <Worker workerUrl={pdfWorkerUrl}>
                  <Viewer fileUrl={selectedBook} plugins={[defaultLayoutPluginInstance]} />
                </Worker>
              </div>
            </div>
          )}
        </div>
      </div>
    </WindowWrapper>
  );
}
