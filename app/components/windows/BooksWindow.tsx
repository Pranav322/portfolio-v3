'use client';
import { useState, useRef, useEffect } from 'react';
import { IconX, IconMinus, IconSquare, IconBook } from '@tabler/icons-react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { Worker, Viewer, SpecialZoomLevel, ThemeContext } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { WindowWrapper } from '../ui/WindowWrapper';
import React from 'react';
import Image from 'next/image';

interface BooksWindowProps {
  onClose: () => void;
}

interface Book {
  title: string;
  path: string;
  author?: string;
  coverImage: string;
}

export function BooksWindow({ onClose }: BooksWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 4, y: window.innerHeight / 8 });
  const windowRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    theme: {
      background: '#1a1b1e',
      text: '#ffffff',
      controlLabel: {
        backgroundColor: '#2b2c2f',
        color: '#ffffff',
      },
      toolbar: {
        backgroundColor: '#2b2c2f',
        color: '#ffffff',
      },
      tooltip: {
        backgroundColor: '#3f3f3f',
        color: '#ffffff',
      },
    },
    toolbarPlugin: {},
    sidebarPlugin: {
      thumbnailPlugin: {
        thumbnailWidth: 150,
      },
    },
  });
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
    {
      title: 'Women',
      path: '/books/Women-CharlesBukowski.pdf',
      author: 'Charles Bukowski',
      coverImage: '/books/covers/womenbukowski.jpg',
    },
    {
      title: 'No Longer Human',
      path: '/books/no-osamu.pdf',
      author: 'Dazai Osamu',
      coverImage: '/books/covers/nolongercover.jpg',
    },
    {
      title: 'A Thousand Splendid Suns',
      path: '/books/thousand-khaled.pdf',
      author: 'Khaled Hosseini',
      coverImage: '/books/covers/thousand.jpg',
    },
  ];

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
      initialWidth={800}
      initialHeight={600}
    >
      <div className="h-full flex flex-col bg-[#1a1b1e]">
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

        {/* Content Area - Now with fixed height */}
        <div className="flex-1 overflow-hidden" style={{ height: 'calc(100% - 3rem)' }}>
          {!selectedBook ? (
            <div className="p-3 sm:p-6 overflow-y-auto custom-scrollbar mobile-hide-scrollbar">
              {/* Mobile: Horizontal scroll, Desktop: Grid */}
              <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Mobile horizontal scroll container */}
                <div className="flex gap-4 overflow-x-auto pb-4 md:hidden mobile-hide-scrollbar">
                  {books.map(book => (
                    <motion.div
                      key={book.title}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedBook(book.path)}
                      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 group flex-shrink-0 w-40"
                    >
                      <div className="relative w-24 h-32 rounded-lg shadow-lg overflow-hidden">
                        {book.coverImage ? (
                          <Image
                            src={book.coverImage}
                            alt={`${book.title} cover`}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 duration-300"
                            sizes="(max-width: 96px) 100vw, 96px"
                            onError={e => {
                              // If image fails to load, remove src to show fallback
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement?.classList.add('fallback-active');
                            }}
                          />
                        ) : null}
                        {/* Fallback that shows when there's no image or if image fails to load */}
                        <div
                          className={`absolute inset-0 w-full h-full bg-gradient-to-b from-gray-700/50 to-gray-900/50 flex items-center justify-center ${book.coverImage ? 'hidden fallback' : ''}`}
                        >
                          <IconBook
                            size={32}
                            className="text-yellow-400/80 group-hover:text-yellow-400 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <h3 className="text-white/90 font-medium group-hover:text-white transition-colors text-xs line-clamp-2">
                          {book.title}
                        </h3>
                        {book.author && (
                          <p className="text-white/50 text-xs group-hover:text-white/70 transition-colors">
                            {book.author}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop grid layout */}
                <div className="hidden md:contents">
                  {books.map(book => (
                    <motion.div
                      key={book.title}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedBook(book.path)}
                      className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 group"
                    >
                      <div className="relative w-32 h-40 rounded-lg shadow-lg overflow-hidden">
                        {book.coverImage ? (
                          <Image
                            src={book.coverImage}
                            alt={`${book.title} cover`}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 duration-300"
                            sizes="(max-width: 128px) 100vw, 128px"
                            onError={e => {
                              // If image fails to load, remove src to show fallback
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement?.classList.add('fallback-active');
                            }}
                          />
                        ) : null}
                        {/* Fallback that shows when there's no image or if image fails to load */}
                        <div
                          className={`absolute inset-0 w-full h-full bg-gradient-to-b from-gray-700/50 to-gray-900/50 flex items-center justify-center ${book.coverImage ? 'hidden fallback' : ''}`}
                        >
                          <IconBook
                            size={48}
                            className="text-yellow-400/80 group-hover:text-yellow-400 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-white/90 font-medium group-hover:text-white transition-colors">
                          {book.title}
                        </h3>
                        {book.author && (
                          <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors">
                            {book.author}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col bg-[#1a1b1e]">
              <div className="flex justify-between p-4">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-white/80 hover:text-white"
                >
                  ← Back to Books
                </button>
              </div>
              <div className="flex-1">
                <Worker workerUrl={pdfWorkerUrl}>
                  <ThemeContext.Provider
                    value={{
                      background: '#1a1b1e',
                      text: '#ffffff',
                      controlLabel: {
                        backgroundColor: '#2b2c2f',
                        color: '#ffffff',
                      },
                      toolbar: {
                        backgroundColor: '#2b2c2f',
                        color: '#ffffff',
                      },
                      tooltip: {
                        backgroundColor: '#3f3f3f',
                        color: '#ffffff',
                      },
                    }}
                  >
                    <div style={{ height: 'calc(100vh - 160px)' }}>
                      <Viewer
                        fileUrl={selectedBook}
                        plugins={[defaultLayoutPluginInstance]}
                        defaultScale={SpecialZoomLevel.PageFit}
                        theme="dark"
                        className="dark-pdf-viewer"
                      />
                    </div>
                  </ThemeContext.Provider>
                </Worker>
              </div>
            </div>
          )}
        </div>
      </div>
    </WindowWrapper>
  );
}
