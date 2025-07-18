import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDragControls } from 'framer-motion';
import {
  IconX,
  IconMinus,
  IconSquare,
  IconSettings,
  IconUpload,
  IconWallpaper,
  IconPalette,
  IconVolume,
  IconBrush,
} from '@tabler/icons-react';
import { WindowWrapper } from '../ui/WindowWrapper';

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

const presetWallpapers = [
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
  // Add more preset wallpapers here
];

export function SettingsWindow({ onClose, onWallpaperChange }: SettingsWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>('wallpaper');
  const dragControls = useDragControls();
  const [selectedWallpaper, setSelectedWallpaper] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        console.log('Uploaded wallpaper:', result.slice(0, 50) + '...'); // Debug log
        setSelectedWallpaper(result);
        onWallpaperChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (wallpaper: (typeof presetWallpapers)[0]) => {
    console.log('Selected wallpaper:', wallpaper.url); // Debug log
    setSelectedWallpaper(wallpaper.url);
    onWallpaperChange?.(wallpaper.url);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'wallpaper':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6"
          >
            <h2 className="text-xl font-semibold mb-6 text-blue-400">Wallpaper Settings</h2>

            {/* Custom Upload Section */}
            <div className="mb-8">
              <h3 className="text-white/90 font-medium mb-4">Upload Custom Wallpaper</h3>
              <motion.label
                className="flex items-center gap-3 p-4 border border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <IconUpload className="text-white/60" />
                <span className="text-white/60">Choose a file or drag it here</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </motion.label>
            </div>

            {/* Preset Wallpapers */}
            <div>
              <h3 className="text-white/90 font-medium mb-4">Preset Wallpapers</h3>
              <div className="grid grid-cols-2 gap-4">
                {presetWallpapers.map(wallpaper => (
                  <motion.div
                    key={wallpaper.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePresetSelect(wallpaper)}
                    className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                      selectedWallpaper === wallpaper.url ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={wallpaper.thumbnail}
                      alt={wallpaper.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
                      <p className="text-white/90 text-sm text-center">{wallpaper.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
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
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              onClick={handleMinimize}
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
