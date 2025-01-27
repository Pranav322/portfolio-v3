import { useState, useRef } from 'react';
import { IconX, IconMinus, IconSquare, IconBook } from '@tabler/icons-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface BooksWindowProps {
  onClose: () => void;
}

interface Book {
  title: string;
  path: string;
}

export function BooksWindow({ onClose }: BooksWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: window.innerWidth / 4, y: window.innerHeight / 8 });
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // PDF viewer plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Make sure to use the same version as your installed @react-pdf-viewer/core
  const pdfWorkerUrl = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

  const books: Book[] = [
    { title: 'Woamn By Charles Buskowski', path: '/Women-CharlesBukowski.pdf' },
    // Add more books here
  ];

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isMaximized ? 0 : position.x,
          y: isMaximized ? 0 : position.y,
          width: isMaximized ? '100%' : '800px',
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
            <IconBook size={16} className="text-yellow-400" />
            <span className="text-white/80 text-sm">Books</span>
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
      </motion.div>
    </div>
  );
}
