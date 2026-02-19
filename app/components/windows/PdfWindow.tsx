import { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { IconFileText } from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';
import { WindowControls } from '../ui/WindowControls';

interface PdfWindowProps {
  onClose: () => void;
  filePath: string; // e.g., '/backend_dev.pdf'
}

export function PdfWindow({ onClose, filePath }: PdfWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  if (isMinimized) return null;

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
      initialWidth={1000}
      initialHeight={700}
    >
      <div className="h-full flex flex-col">
        <motion.div
          className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={e => !isMaximized && dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 p-1.5 rounded-full">
              <IconFileText size={16} className="text-red-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Resume.pdf</span>
          </div>
          <WindowControls
            onMinimize={handleMinimize}
            onMaximize={() => setIsMaximized(!isMaximized)}
            onClose={onClose}
            isMaximized={isMaximized}
          />
        </motion.div>

        <div className="flex-1 bg-white">
          {/* Use object tag to let browser render the PDF natively and show fallback if not supported */}
          <object data={filePath} type="application/pdf" className="w-full h-full">
            <iframe src={filePath} className="w-full h-full border-none" />
            <div className="p-4 text-sm text-gray-800">
              Your browser cannot display PDFs inline. You can
              <a
                href={filePath}
                className="text-blue-600 underline ml-1"
                target="_blank"
                rel="noreferrer"
              >
                download the file
              </a>
              instead.
            </div>
          </object>
        </div>
      </div>
    </WindowWrapper>
  );
}
