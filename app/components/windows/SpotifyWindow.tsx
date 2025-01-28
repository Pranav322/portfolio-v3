import { useState } from 'react';
import { WindowWrapper } from '../ui/WindowWrapper';
import { NowPlaying } from '../spotify/NowPlaying';
import { TopTracks } from '../spotify/TopTracks';
import { IconBrandSpotify, IconX, IconMinus, IconSquare } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface SpotifyWindowProps {
  onClose: () => void;
}

export function SpotifyWindow({ onClose }: SpotifyWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => setIsMinimized(true);
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
      initialWidth={800}
      initialHeight={600}
    >
      <div className="h-full flex flex-col bg-[#1a1b1e] backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden">
        {/* Header */}
        <motion.div className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10">
          <div className="flex items-center gap-3">
            <IconBrandSpotify size={20} className="text-[#1DB954]" />
            <span className="text-white/90 text-sm font-medium">Spotify Stats</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleMinimize}
              className="text-white/50 hover:text-white transition-colors"
            >
              <IconMinus size={18} />
            </button>
            <button
              onClick={toggleMaximize}
              className="text-white/50 hover:text-white transition-colors"
            >
              <IconSquare size={16} />
            </button>
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
              <IconX size={20} />
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Now Playing Section */}
            <div className="space-y-4">
              <h2 className="text-white/90 text-lg font-medium flex items-center gap-2">
                <IconBrandSpotify size={20} className="text-[#1DB954]" />
                Currently Playing
              </h2>
              <NowPlaying />
            </div>

            {/* Top Tracks Section */}
            <div className="space-y-4">
              <h2 className="text-white/90 text-lg font-medium flex items-center gap-2">
                <IconBrandSpotify size={20} className="text-[#1DB954]" />
                Your Top Tracks
              </h2>
              <TopTracks />
            </div>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
