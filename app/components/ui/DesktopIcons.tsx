import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  IconFolder,
  IconUser,
  IconTools,
  IconBrandGithub,
  IconMail,
  IconBook,
  IconBrowser,
  IconMusic,
  IconSettings,
  IconBrandSpotify,
  IconInfoCircle,
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

export function DesktopIcons({
  onWallpaperChange,
}: {
  onWallpaperChange?: (wallpaper: string) => void;
}) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showGitHub, setShowGitHub] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const [clickHelpIcon, setClickHelpIcon] = useState<string | null>(null);
  const clickHelpRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIconClick = (iconName: string, action?: () => void) => {
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

  return (
    <>
      <div className="fixed left-4 top-4 w-auto">
        <div
          className="flex flex-wrap gap-6 w-full max-w-[90vw]"
          style={{
            flexDirection: 'row',
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <div className="flex flex-col gap-6">
            {icons.slice(0, 6).map(icon => (
              <div
                key={icon.name}
                className={`group flex flex-col items-center gap-1 cursor-pointer w-24 ${
                  selectedIcon === icon.name ? 'bg-white/20 rounded-lg' : ''
                }`}
                onClick={() => handleIconClick(icon.name, icon.action)}
                ref={clickHelpRef}
              >
                <div
                  className={`p-3 rounded-lg backdrop-blur-md bg-black/20 group-hover:bg-black/30 transition-all ${icon.color}`}
                >
                  {icon.name === 'GitHub' && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setShowGitHub(true);
                      }}
                      className="flex flex-col items-center group focus:outline-none"
                    >
                      <IconBrandGithub className="w-12 h-12 text-white group-hover:text-purple-400 transition-colors" />
                      <span className="text-white text-sm mt-1 group-hover:text-purple-400 transition-colors">
                        GitHub
                      </span>
                    </button>
                  )}
                  {icon.name !== 'GitHub' && icon.icon}
                </div>
                <span className="text-xs text-white/80 text-center px-2 py-1 rounded backdrop-blur-sm bg-black/20 w-full">
                  {icon.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {icons.slice(6).map(icon => (
              <div
                key={icon.name}
                className={`group flex flex-col items-center gap-1 cursor-pointer w-24 ${
                  selectedIcon === icon.name ? 'bg-white/20 rounded-lg' : ''
                }`}
                onClick={() => handleIconClick(icon.name, icon.action)}
                ref={clickHelpRef}
              >
                <div
                  className={`p-3 rounded-lg backdrop-blur-md bg-black/20 group-hover:bg-black/30 transition-all ${icon.color}`}
                >
                  {icon.name === 'GitHub' && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setShowGitHub(true);
                      }}
                      className="flex flex-col items-center group focus:outline-none"
                    >
                      <IconBrandGithub className="w-12 h-12 text-white group-hover:text-purple-400 transition-colors" />
                      <span className="text-white text-sm mt-1 group-hover:text-purple-400 transition-colors">
                        GitHub
                      </span>
                    </button>
                  )}
                  {icon.name !== 'GitHub' && icon.icon}
                </div>
                <span className="text-xs text-white/80 text-center px-2 py-1 rounded backdrop-blur-sm bg-black/20 w-full">
                  {icon.name}
                </span>
              </div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMusic(true)}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300">
                <IconMusic size={24} className="text-purple-400" />
              </div>
              <span className="text-xs text-white/70 group-hover:text-white/90">Music</span>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {clickHelpIcon && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg text-white/90 text-base rounded-lg border border-white/20 shadow-lg"
            style={{
              left: `clamp(1rem, ${clickHelpRef.current?.getBoundingClientRect().left + 420}px, calc(100vw - 300px))`,
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
    </>
  );
}
