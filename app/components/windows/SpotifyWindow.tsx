import { useState } from 'react';
import { WindowWrapper } from '../ui/WindowWrapper';
import { WindowControls } from '../ui/WindowControls';
import { NowPlaying } from '../spotify/NowPlaying';
import { TopTracks } from '../spotify/TopTracks';
import { IconBrandSpotify, IconClock } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { TopArtists } from '../spotify/TopArtists';
import { TopGenres } from '../spotify/TopGenres';
import { Playlists } from '../spotify/Playlists';
// import { RecentlyPlayed, AudioFeatures, Recommendations, MoodAnalyzer } from '../spotify';
import { RecentlyPlayed } from '../spotify/RecentlyPlayed';

import { ErrorBoundary } from 'react-error-boundary';

interface SpotifyWindowProps {
  onClose: () => void;
}

export function SpotifyWindow({ onClose }: SpotifyWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => setIsMinimized(true);
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  if (isMinimized) return null;

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
      initialWidth={800}
      initialHeight={600}
    >
      <div className="h-full flex flex-col bg-[#1a1b1e] text-white/90 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden">
        {/* Header */}
        <motion.div className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10">
          <div className="flex items-center gap-3">
            <IconBrandSpotify size={20} className="text-[#1DB954]" />
            <span className="text-white/90 text-sm font-medium">Spotify Stats</span>
          </div>
          <WindowControls
            onMinimize={handleMinimize}
            onMaximize={toggleMaximize}
            onClose={onClose}
            isMaximized={isMaximized}
          />
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
              <ErrorBoundary fallback={<div>Error loading player</div>}>
                <NowPlaying />
              </ErrorBoundary>
            </div>

            {/* Top Tracks Section */}
            <div className="space-y-4">
              <h2 className="text-white/90 text-lg font-medium flex items-center gap-2">
                <IconBrandSpotify size={20} className="text-[#1DB954]" />
                Pranav&apos;s Tracks
              </h2>
              <TopTracks />
            </div>

            {/* Top Artists Section */}
            <div className="space-y-4">
              <h2 className="text-white/90 text-lg font-medium flex items-center gap-2">
                <IconBrandSpotify size={20} className="text-[#1DB954]" />
                Top Artists
              </h2>
              <TopArtists />
            </div>

            {/* Top Genres Section */}
            <div className="space-y-4">
              <h2 className="text-white/90 text-lg font-medium flex items-center gap-2">
                <IconBrandSpotify size={20} className="text-[#1DB954]" />
                Favorite Genres
              </h2>
              <TopGenres />
            </div>

            {/* Playlists Section */}
            <div className="space-y-4">
              <h2 className="text-white/90 text-lg font-medium flex items-center gap-2">
                <IconBrandSpotify size={20} className="text-[#1DB954]" />
                Playlists
              </h2>
              <Playlists />
            </div>

            {/* New Sections */}
            <div className="space-y-4">
              <h2 className="text-white/90 text-lg font-medium flex items-center gap-2">
                <IconClock size={20} className="text-[#1DB954]" />
                Recently Played
              </h2>
              <RecentlyPlayed />
            </div>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
