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
  IconBriefcase,
  IconMessageCircle,
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
import ExperienceWindow from '../windows/ExperienceWindow';
import { PranavChatWindow } from '../windows/PranavChatWindow';
import { useTheme } from '../../contexts/ThemeContext';

export function DesktopIcons({
  onWallpaperChange,
}: {
  onWallpaperChange?: (wallpaper: string) => void;
}) {
  const { deviceType, windowSize } = useDeviceType();
  const { currentTheme } = useTheme();
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
  const [showExperience, setShowExperience] = useState(false);
  const [showPranavChat, setShowPranavChat] = useState(false);
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
        } else if (iconName === 'Experience') {
          setShowExperience(true);
        } else if (iconName === 'Pranav AI') {
          setShowPranavChat(true);
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
        } else if (iconName === 'Experience') {
          setShowExperience(true);
        } else if (iconName === 'Pranav AI') {
          setShowPranavChat(true);
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
      color: currentTheme.colors.iconBlue,
    },
    {
      name: 'Projects',
      icon: <IconFolder size={32} />,
      color: currentTheme.colors.iconYellow,
    },
    {
      name: 'Skills',
      icon: <IconTools size={32} />,
      color: currentTheme.colors.iconGreen,
    },
    {
      name: 'Books',
      icon: <IconBook size={32} />,
      color: currentTheme.colors.iconYellow,
    },
    {
      name: 'Browser',
      icon: <IconBrowser size={32} />,
      color: currentTheme.colors.iconBlue,
      action: () => setShowBrowser(true),
    },
    {
      name: 'Resume',
      icon: <IconFileText size={32} />,
      color: currentTheme.colors.iconRed,
      action: () => {
        setShowPdf(true);
      },
    },
    {
      name: 'Settings',
      icon: <IconSettings size={32} />,
      color: currentTheme.colors.iconPurple,
    },
    {
      name: 'My Spotify',
      icon: <IconBrandSpotify size={28} />,
      color: currentTheme.colors.iconSpotify,
      action: () => setShowSpotify(true),
    },
    {
      name: 'Experience',
      icon: <IconBriefcase size={32} />,
      color: currentTheme.colors.iconGreen,
    },
    {
      name: 'Pranav AI',
      icon: <IconMessageCircle size={32} />,
      color: currentTheme.colors.iconBlue,
    },
  ];

  // Calculate optimal layout for desktop with natural column flow
  const getDesktopLayoutInfo = () => {
    const availableHeight = windowSize.height - 180; // Account for margins, padding, and bottom dock
    const availableWidth = windowSize.width - 100; // Account for left margin and some right padding
    const iconHeight = 100; // More accurate height per icon including gap and text
    const iconWidth = 88; // Width per icon including gap
    const totalIcons = icons.length;

    // Calculate maximum icons per column that can fit vertically
    const maxIconsPerColumn = Math.max(1, Math.floor(availableHeight / iconHeight));
    
    // Calculate minimum columns needed to fit all icons
    const minColumnsNeeded = Math.ceil(totalIcons / maxIconsPerColumn);
    
    // Calculate maximum columns that can fit horizontally
    const maxColumnsByWidth = Math.floor(availableWidth / iconWidth);
    
    // Use the minimum of what we need and what fits horizontally
    const optimalColumns = Math.max(1, Math.min(minColumnsNeeded, maxColumnsByWidth, 4)); // Max 4 columns for readability
    
    return {
      maxIconsPerColumn,
      optimalColumns,
      needsScroll: totalIcons > maxIconsPerColumn * optimalColumns
    };
  };

  // Organize icons into columns for desktop
  const organizeIconsIntoColumns = () => {
    if (deviceType !== 'desktop') return [icons]; // For mobile/tablet, return as single array
    
    const layoutInfo = getDesktopLayoutInfo();
    const { maxIconsPerColumn, optimalColumns } = layoutInfo;
    
    const columns: typeof icons[][] = [];
    
    for (let i = 0; i < optimalColumns; i++) {
      columns.push([]);
    }
    
    // Fill columns naturally - fill first column completely, then move to next
    let currentColumn = 0;
    for (let i = 0; i < icons.length; i++) {
      if (columns[currentColumn].length >= maxIconsPerColumn && currentColumn < optimalColumns - 1) {
        currentColumn++;
      }
      columns[currentColumn].push(icons[i]);
    }
    
    return columns.filter(column => column.length > 0); // Remove empty columns
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
        return 'flex gap-4 max-h-[calc(100vh-200px)]';
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
        {deviceType === 'desktop' ? (
          <div className={getLayoutClasses()}>
            {organizeIconsIntoColumns().map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-3">
                {column.map(icon => (
                  <div
                    key={icon.name}
                    className={`group flex flex-col items-center gap-1 cursor-pointer touch-target tap-feedback ${getIconContainerClasses()} ${selectedIcon === icon.name ? 'bg-white/20 rounded-lg p-2' : 'p-2'}`}
                    onClick={() => handleIconClick(icon.name, icon.action)}
                    ref={clickHelpRef}
                  >
                    <div
                      className={`p-2 sm:p-3 rounded-lg backdrop-blur-md transition-all`}
                      style={{ 
                        backgroundColor: currentTheme.colors.glass
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = currentTheme.colors.hover;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = currentTheme.colors.glass;
                      }}
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
                            className="w-12 h-12 text-white group-hover:text-purple-400 transition-colors"
                          />
                          <span className="text-white text-sm mt-1 group-hover:text-purple-400 transition-colors">
                            GitHub
                          </span>
                        </button>
                      )}
                      {icon.name !== 'GitHub' && (
                        <div className="flex flex-col items-center">
                          <div 
                            className={getIconSizeClasses()}
                            style={{ color: icon.color }}
                          >
                            {icon.icon}
                          </div>
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
            ))}
          </div>
        ) : (
          <div className={getLayoutClasses()}>
            {icons.map(icon => (
              <div
                key={icon.name}
                className={`group flex flex-col items-center gap-1 cursor-pointer touch-target tap-feedback ${getIconContainerClasses()} ${selectedIcon === icon.name ? 'bg-white/20 rounded-lg p-2' : 'p-2'}`}
                onClick={() => handleIconClick(icon.name, icon.action)}
                ref={clickHelpRef}
              >
                <div
                  className={`p-2 sm:p-3 rounded-lg backdrop-blur-md transition-all`}
                  style={{ 
                    backgroundColor: currentTheme.colors.glass
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = currentTheme.colors.hover;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = currentTheme.colors.glass;
                  }}
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
                      <div 
                        className={getIconSizeClasses()}
                        style={{ color: icon.color }}
                      >
                        {icon.icon}
                      </div>
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
        )}
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
      {showExperience && <ExperienceWindow onClose={() => setShowExperience(false)} />}
      {showPranavChat && <PranavChatWindow onClose={() => setShowPranavChat(false)} />}
    </>
  );
}
