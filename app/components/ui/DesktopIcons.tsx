import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Hook to detect device types
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });

      if (width < 640) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return { deviceType, windowSize };
};

import {
  IconFolder,
  IconUser,
  IconTools,
  IconBrandGithub,
  IconMail,
  IconBook,
  IconBrowser,
  IconSettings,
  IconBrandSpotify,
  IconInfoCircle,
  IconFileText,
} from '@tabler/icons-react';
import AboutWindow from '../windows/AboutWindow';
import dynamic from 'next/dynamic';
const BooksWindow = dynamic(() => import('../windows/BooksWindow').then(mod => mod.BooksWindow), {
  ssr: false,
});
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { BrowserWindow } from '../windows/BrowserWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { motion } from 'framer-motion';
import { SettingsWindow } from '../windows/SettingsWindow';
import { SpotifyWindow } from '../windows/SpotifyWindow';
import { PdfWindow } from '../windows/PdfWindow';

export function DesktopIcons({
  onWallpaperChange,
}: {
  onWallpaperChange?: (wallpaper: string) => void;
}) {
  const { deviceType, windowSize } = useDeviceType();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showGitHub, setShowGitHub] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const [clickHelpIcon, setClickHelpIcon] = useState<string | null>(null);
  const clickHelpRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIconClick = (iconName: string, action?: () => void) => {
    // On mobile/tablet, single tap opens the window
    if (deviceType === 'mobile' || deviceType === 'tablet') {
      if (action) {
        action();
      } else {
        if (iconName === 'About Me') {
          setShowAbout(true);
        } else if (iconName === 'Books') {
          setShowBooks(true);
        } else if (iconName === 'Projects') {
          setShowProjects(true);
        } else if (iconName === 'Skills') {
          setShowSkills(true);
        } else if (iconName === 'Settings') {
          setShowSettings(true);
        } else if (iconName === 'Spotify') {
          setShowSpotify(true);
        }
      }
      return;
    }

    // Desktop behavior - double click required
    if (selectedIcon === iconName) {
      // Double click detected
      if (action) {
        action();
      } else {
        if (iconName === 'About Me') {
          setShowAbout(true);
        } else if (iconName === 'Books') {
          setShowBooks(true);
        } else if (iconName === 'Projects') {
          setShowProjects(true);
        } else if (iconName === 'Skills') {
          setShowSkills(true);
        } else if (iconName === 'Settings') {
          setShowSettings(true);
        } else if (iconName === 'Spotify') {
          setShowSpotify(true);
        }
      }
      setSelectedIcon(null);
      setClickHelpIcon(null);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    } else {
      // First click
      setSelectedIcon(iconName);
      setClickHelpIcon(iconName);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = setTimeout(() => {
        setSelectedIcon(null);
        setClickHelpIcon(null);
      }, 500);
    }
  };

  const icons = [
    {
      name: 'About Me',
      icon: <IconUser size={32} />,
      color: 'text-blue-400',
    },
    {
      name: 'Projects',
      icon: <IconFolder size={32} />,
      color: 'text-yellow-400',
    },
    {
      name: 'Skills',
      icon: <IconTools size={32} />,
      color: 'text-green-400',
    },
    {
      name: 'Books',
      icon: <IconBook size={32} />,
      color: 'text-yellow-400',
    },
    {
      name: 'Browser',
      icon: <IconBrowser size={32} />,
      color: 'text-blue-400',
      action: () => setShowBrowser(true),
    },
    {
      name: 'Resume',
      icon: <IconFileText size={32} />,
      color: 'text-red-400',
      action: () => {
        setShowPdf(true);
      },
    },
    {
      name: 'Settings',
      icon: <IconSettings size={32} />,
      color: 'text-purple-400',
    },
    {
      name: 'My Spotify',
      icon: <IconBrandSpotify size={28} />,
      color: 'text-[#1DB954]',
      action: () => setShowSpotify(true),
    },
  ];

  // Calculate optimal grid layout for desktop to avoid scrollbars
  const getDesktopLayoutClasses = () => {
    const availableHeight = windowSize.height - 120; // Account for margins and padding
    const iconHeight = 90; // Approximate height per icon including gap
    const maxIconsPerColumn = Math.floor(availableHeight / iconHeight);
    const totalIcons = icons.length;

    // If we can fit all icons in one column, use single column
    if (totalIcons <= maxIconsPerColumn) {
      return 'grid grid-cols-1 gap-3';
    }

    // Calculate how many columns we need
    const neededColumns = Math.ceil(totalIcons / maxIconsPerColumn);
    const columnsToUse = Math.min(neededColumns, 4); // Max 4 columns

    // Use appropriate grid classes
    if (columnsToUse === 2) {
      return 'grid grid-cols-2 gap-3';
    } else if (columnsToUse === 3) {
      return 'grid grid-cols-3 gap-3';
    } else if (columnsToUse >= 4) {
      return 'grid grid-cols-4 gap-3';
    }

    return 'grid grid-cols-1 gap-3';
  };

  // Get layout classes based on device type
  const getLayoutClasses = () => {
    switch (deviceType) {
      case 'mobile':
        return 'flex flex-wrap gap-3 max-w-[calc(100vw-1rem)]';
      case 'tablet':
        return 'flex flex-wrap gap-4 max-w-[calc(100vw-2rem)]';
      case 'desktop':
      default:
        return getDesktopLayoutClasses();
    }
  };

  // Get icon container classes based on device type
  const getIconContainerClasses = () => {
    switch (deviceType) {
      case 'mobile':
        return 'w-16 flex-shrink-0';
      case 'tablet':
        return 'w-20 flex-shrink-0';
      case 'desktop':
      default:
        return 'w-20';
    }
  };

  // Get icon size classes based on device type
  const getIconSizeClasses = () => {
    switch (deviceType) {
      case 'mobile':
        return 'text-2xl';
      case 'tablet':
        return 'text-3xl';
      case 'desktop':
      default:
        return 'text-4xl';
    }
  };

  // Get text size classes based on device type
  const getTextSizeClasses = () => {
    switch (deviceType) {
      case 'mobile':
        return 'text-xs';
      case 'tablet':
        return 'text-sm';
      case 'desktop':
      default:
        return 'text-sm';
    }
  };

  return (
    <>
      <div
        className={`fixed z-30 ${
          deviceType === 'desktop'
            ? 'left-4 top-4'
            : deviceType === 'tablet'
              ? 'left-3 top-4'
              : 'left-2 top-4'
        }`}
      >
        <div className={getLayoutClasses()}>
          {icons.map(icon => (
            <div
              key={icon.name}
              className={`group flex flex-col items-center gap-1 cursor-pointer touch-target tap-feedback ${getIconContainerClasses()} ${selectedIcon === icon.name ? 'bg-white/20 rounded-lg p-2' : 'p-2'}`}
              onClick={() => handleIconClick(icon.name, icon.action)}
              ref={clickHelpRef}
            >
              <div
                className={`p-2 sm:p-3 rounded-lg backdrop-blur-md bg-black/20 group-hover:bg-black/30 transition-all ${icon.color}`}
              >
                {icon.name === 'GitHub' && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setShowGitHub(true);
                    }}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <IconBrandGithub
                      className={`${
                        deviceType === 'mobile'
                          ? 'w-8 h-8'
                          : deviceType === 'tablet'
                            ? 'w-10 h-10'
                            : 'w-12 h-12'
                      } text-white group-hover:text-purple-400 transition-colors`}
                    />
                    {deviceType === 'desktop' && (
                      <span className="text-white text-sm mt-1 group-hover:text-purple-400 transition-colors">
                        GitHub
                      </span>
                    )}
                  </button>
                )}
                {icon.name !== 'GitHub' && (
                  <div className="flex flex-col items-center">
                    <div className={getIconSizeClasses()}>{icon.icon}</div>
                  </div>
                )}
              </div>
              <span
                className={`${getTextSizeClasses()} text-white/80 text-center px-1 sm:px-2 py-1 rounded backdrop-blur-sm bg-black/20 w-full`}
              >
                {icon.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {clickHelpIcon && deviceType === 'desktop' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg text-white/90 text-base rounded-lg border border-white/20 shadow-lg"
            style={{
              left: `clamp(1rem, ${(clickHelpRef.current?.getBoundingClientRect().left || 0) + 120}px, calc(100vw - 300px))`,
              top: Math.max(20, (clickHelpRef.current?.getBoundingClientRect().top || 0) - 50),
            }}
          >
            <IconInfoCircle className="animate-pulse" size={20} />
            <span>Double-click to open</span>
            <div
              className="absolute -bottom-2 left-6 w-4 h-4 bg-white/20 backdrop-blur-lg"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: 'rotate(180deg)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showAbout && <AboutWindow onClose={() => setShowAbout(false)} />}
      {showBooks && <BooksWindow onClose={() => setShowBooks(false)} />}
      {showProjects && <ProjectsWindow onClose={() => setShowProjects(false)} />}
      {showSkills && <SkillsWindow onClose={() => setShowSkills(false)} />}
      {showSettings && (
        <SettingsWindow
          onClose={() => setShowSettings(false)}
          onWallpaperChange={onWallpaperChange!}
        />
      )}
      {showBrowser && (
        <BrowserWindow
          initialUrl="https://iframee.vercel.app"
          onClose={() => setShowBrowser(false)}
        />
      )}
      {showMusic && (
        <BrowserWindow
          initialUrl="https://soulifyy.vercel.app"
          onClose={() => setShowMusic(false)}
        />
      )}
      {showSpotify && <SpotifyWindow onClose={() => setShowSpotify(false)} />}
      {showPdf && <PdfWindow filePath="/backend_dev.pdf" onClose={() => setShowPdf(false)} />}
    </>
  );
}
