import { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import {
  IconDeviceGamepad2,
  IconX,
  IconMinus,
  IconSquare,
  IconPlayerPlay,
  IconArrowLeft,
} from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';

interface GamesWindowProps {
  onClose: () => void;
}

export function GamesWindow({ onClose }: GamesWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const dragControls = useDragControls();

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  if (isMinimized) return null;

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
            <div className="bg-cyan-500/20 p-1.5 rounded-full">
              <IconDeviceGamepad2 size={16} className="text-cyan-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Games</span>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              className="p-2 rounded-full"
              onClick={handleMinimize}
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

        <div className="flex-1 overflow-hidden">
          {!selectedGame ? (
            <div className="p-6 overflow-auto custom-scrollbar mobile-hide-scrollbar h-full">
              <h2 className="text-xl font-medium text-white/90 mb-6">
                Available Games{' '}
                <span className="text-white/60">(open games in full screen mode)</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Speed Racer Game */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedGame('racing');
                    setIsMaximized(true);
                  }}
                  className="bg-white/5 rounded-lg p-6 cursor-pointer border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <div className="text-center space-y-4">
                    <div className="bg-cyan-500/20 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                      <IconDeviceGamepad2 size={32} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-white/90 font-medium text-lg mb-2">Speed Racer</h3>
                      <p className="text-white/60 text-sm mb-4">
                        High-speed racing action! Avoid cars, collect coins, and set new records.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">
                          HTML5
                        </span>
                        <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">
                          Canvas
                        </span>
                        <span className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">
                          Racing
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 mx-auto px-4 py-2 bg-cyan-500/20 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                    >
                      <IconPlayerPlay size={16} />
                      Play Game
                    </motion.button>
                  </div>
                </motion.div>

                {/* Pac-Man Game
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedGame('pacman')}
                  className="bg-white/5 rounded-lg p-6 cursor-pointer border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group"
                >
                  <div className="text-center space-y-4">
                    <div className="bg-yellow-500/20 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                      <div className="text-yellow-400 text-2xl">🟡</div>
                    </div>
                    <div>
                      <h3 className="text-white/90 font-medium text-lg mb-2">Pac-Man Classic</h3>
                      <p className="text-white/60 text-sm mb-4">
                        Classic arcade maze game! Collect dots, avoid ghosts, and use power pellets.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="px-2 py-1 bg-yellow-500/20 rounded text-xs text-yellow-300">Arcade</span>
                        <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">Classic</span>
                        <span className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">Maze</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 mx-auto px-4 py-2 bg-yellow-500/20 rounded-lg text-yellow-300 hover:bg-yellow-500/30 transition-colors"
                    >
                      <IconPlayerPlay size={16} />
                      Play Game
                    </motion.button>
                  </div>
                </motion.div> */}

                {/* Placeholder for future games */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10 opacity-50">
                  <div className="text-center space-y-4">
                    <div className="bg-gray-500/20 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <IconDeviceGamepad2 size={32} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-white/60 font-medium text-lg mb-2">More Games</h3>
                      <p className="text-white/40 text-sm">Coming soon...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <IconArrowLeft size={16} />
                  Back to Games
                </motion.button>
                <h3 className="text-white/90 font-medium">
                  {selectedGame === 'racing'
                    ? 'Speed Racer'
                    : selectedGame === 'pacman'
                      ? 'Pac-Man Classic'
                      : 'Game'}
                </h3>
                <div></div>
              </div>

              <div className="flex-1">
                {selectedGame === 'racing' && (
                  <iframe
                    src="/games/racing/index.html"
                    className="w-full h-full border-none"
                    title="Speed Racer Game"
                  />
                )}
                {selectedGame === 'pacman' && (
                  <iframe
                    src="/games/pacman/index.html"
                    className="w-full h-full border-none"
                    title="Pac-Man Classic Game"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </WindowWrapper>
  );
}
