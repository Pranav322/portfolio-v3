import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { useDragControls } from 'framer-motion';
import {
  IconSettings,
  IconUpload,
  IconWallpaper,
  IconPalette,
  IconVolume,
  IconBrush,
  IconCheck,
} from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';
import { WindowControls } from '../ui/WindowControls';
import Image from 'next/image';
import { useTheme } from '../../contexts/ThemeContext';

interface SettingsWindowProps {
  onClose: () => void;
  onWallpaperChange: (wallpaper: string) => void;
}

type SettingsTab = 'wallpaper' | 'appearance' | 'sound' | 'theme';

const settingsTabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { id: 'wallpaper', label: 'Wallpaper', icon: <IconWallpaper size={20} /> },
  { id: 'appearance', label: 'Appearance', icon: <IconPalette size={20} /> },
  { id: 'sound', label: 'Sound', icon: <IconVolume size={20} /> },
  { id: 'theme', label: 'Theme', icon: <IconBrush size={20} /> },
];

export type PresetWallpaper = {
  id: number;
  name: string;
  url: string;
  thumbnail: string;
};

const presetWallpapers: PresetWallpaper[] = [
  {
    id: 1,
    name: 'Iced MOuntains',
    url: '/wallpapers/matrix2.jpg',
    thumbnail: '/wallpapers/matrix2.jpg',
  },
  {
    id: 2,
    name: 'Nature',
    url: '/wallpapers/matrix.jpg',
    thumbnail: '/wallpapers/matrix.jpg',
  },
  {
    id: 3,
    name: 'Spring',
    url: '/wallpapers/matrix4.jpg',
    thumbnail: '/wallpapers/matrix4.jpg',
  },
  {
    id: 4,
    name: 'Mountains',
    url: '/wallpapers/matrix3.jpg',
    thumbnail: '/wallpapers/matrix3.jpg',
  },
  {
    id: 5,
    name: 'anime',
    url: '/wallpapers/matrix5.png',
    thumbnail: '/wallpapers/matrix5.png',
  },
  // Add more preset wallpapers here
];

const WallpaperCard = memo(function WallpaperCard({
  wp,
  selected,
  onSelect,
}: {
  wp: PresetWallpaper;
  selected: boolean;
  onSelect: (wp: PresetWallpaper) => void;
}) {
  return (
    <div
      onClick={() => onSelect(wp)}
      className={`relative rounded-lg overflow-hidden cursor-pointer border-2 hover:opacity-90 ${
        selected ? 'border-blue-500' : 'border-transparent hover:border-white/30'
      }`}
    >
      <Image
        src={wp.thumbnail}
        alt={wp.name}
        width={320}
        height={128}
        className="w-full h-32 object-cover"
        sizes="(max-width: 768px) 50vw, 320px"
        priority={false}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
        <p className="text-white/90 text-sm text-center">{wp.name}</p>
      </div>
    </div>
  );
});

export function SettingsWindow({ onClose, onWallpaperChange }: SettingsWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>('wallpaper');
  const dragControls = useDragControls();
  const [selectedWallpaper, setSelectedWallpaper] = useState<string | null>(null);
  const { currentTheme, setTheme, themes } = useTheme();

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setSelectedWallpaper(result);
          onWallpaperChange?.(result);
        };
        reader.readAsDataURL(file);
      }
    },
    [onWallpaperChange]
  );

  const handlePresetSelect = useCallback(
    (wallpaper: (typeof presetWallpapers)[0]) => {
      setSelectedWallpaper(wallpaper.url);
      onWallpaperChange?.(wallpaper.url);
    },
    [onWallpaperChange]
  );

  const handleMinimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const handleThemeSelect = useCallback(
    (themeId: string) => {
      setTheme(themeId);
    },
    [setTheme]
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'wallpaper':
        return (
          <div className="p-6">
            {/* Wallpaper content - no animations for instant feel */}
            <h2 className="text-xl font-semibold mb-6 text-blue-400">Wallpaper Settings</h2>

            {/* Custom Upload Section */}
            <div className="mb-8">
              <h3 className="text-white/90 font-medium mb-4">Upload Custom Wallpaper</h3>
              <label className="flex items-center gap-3 p-4 border border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                <IconUpload className="text-white/60" />
                <span className="text-white/60">Choose a file or drag it here</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preset Wallpapers */}
            <div>
              <h3 className="text-white/90 font-medium mb-4">Preset Wallpapers</h3>
              <div className="grid grid-cols-2 gap-4">
                {presetWallpapers.map(wp => (
                  <WallpaperCard
                    key={wp.id}
                    wp={wp}
                    selected={selectedWallpaper === wp.url}
                    onSelect={handlePresetSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'theme':
        return (
          <div className="p-6">
            {/* Theme content - no animations for instant feel */}
            <h2 className="text-xl font-semibold mb-6 text-blue-400">Theme Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {themes.map(theme => (
                <div
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer ${
                    currentTheme.id === theme.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  {/* Theme Preview */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-1">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.iconGreen }}
                      />
                    </div>

                    {currentTheme.id === theme.id && (
                      <div className="ml-auto">
                        <IconCheck size={20} className="text-blue-400" />
                      </div>
                    )}
                  </div>

                  {/* Theme Info */}
                  <div>
                    <h3 className="text-white/90 font-medium mb-1">{theme.name}</h3>
                    <p className="text-white/60 text-sm">{theme.description}</p>
                  </div>

                  {/* Mini Icon Preview */}
                  <div className="flex gap-2 mt-3">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: theme.colors.glass,
                        color: theme.colors.iconBlue,
                      }}
                    >
                      <div className="w-3 h-3 bg-current rounded-sm opacity-70" />
                    </div>
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: theme.colors.glass,
                        color: theme.colors.iconYellow,
                      }}
                    >
                      <div className="w-3 h-3 bg-current rounded-sm opacity-70" />
                    </div>
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: theme.colors.glass,
                        color: theme.colors.iconGreen,
                      }}
                    >
                      <div className="w-3 h-3 bg-current rounded-sm opacity-70" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-white/90 font-medium mb-2">Current Theme: {currentTheme.name}</h3>
              <p className="text-white/60 text-sm">{currentTheme.description}</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-white/60">
            Coming soon...
          </div>
        );
    }
  };

  if (isMinimized) {
    return null;
  }

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
      initialWidth={900}
      initialHeight={600}
    >
      <div className="h-full flex flex-col">
        {/* Window Header */}
        <motion.div
          className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={e => !isMaximized && dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-1.5 rounded-full">
              <IconSettings size={16} className="text-blue-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Settings</span>
          </div>
          <WindowControls
            onMinimize={handleMinimize}
            onMaximize={() => setIsMaximized(!isMaximized)}
            onClose={onClose}
            isMaximized={isMaximized}
          />
        </motion.div>

        {/* Content with Sidebar */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Mobile Tab Navigation */}
          <div className="md:hidden border-b border-white/10 bg-black/20">
            <div className="flex overflow-x-auto mobile-hide-scrollbar">
              {settingsTabs.map(tab => (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-400'
                      : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 border-r border-white/10 bg-black/20">
            <nav className="p-4">
              {settingsTabs.map(tab => (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm mb-2 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto custom-scrollbar mobile-hide-scrollbar p-4 md:p-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
