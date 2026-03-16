import React, { useState, useMemo, useCallback } from 'react';
import { FloatingDock } from './ui/floating-dock';
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconSettings,
  IconDeviceGamepad2,
} from '@tabler/icons-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const SettingsWindow = dynamic(
  () => import('./windows/SettingsWindow').then(mod => mod.SettingsWindow),
  { ssr: false }
);

const GamesWindow = dynamic(() => import('./windows/GamesWindow').then(mod => mod.GamesWindow), {
  ssr: false,
});

interface FloatingDockDemoProps {
  desktopClassName: string;
  mobileClassName: string;
  onWallpaperChange: (wallpaper: string) => void;
}

function FloatingDockDemo({
  desktopClassName,
  mobileClassName,
  onWallpaperChange,
}: FloatingDockDemoProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showGames, setShowGames] = useState(false);

  // Memoize actions to prevent recreating functions on every render
  const openSettings = useCallback(() => setShowSettings(true), []);
  const openGames = useCallback(() => setShowGames(true), []);
  const closeSettings = useCallback(() => setShowSettings(false), []);
  const closeGames = useCallback(() => setShowGames(false), []);

  // Memoize links array so FloatingDock doesn't re-render its expensive children
  const links = useMemo(() => [
    {
      title: 'Home',
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
    },
    {
      title: 'Settings',
      icon: <IconSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
      action: openSettings,
    },
    {
      title: 'Games',
      icon: (
        <IconDeviceGamepad2
          size={24}
          className="h-full w-full text-neutral-500 dark:text-neutral-300"
        />
      ),
      href: '#',
      action: openGames,
    },
    {
      title: 'Twitter',
      icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: 'https://x.com/_pranav69',
    },
    {
      title: 'GitHub',
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: 'https://github.com/pranav322',
    },
  ], [openSettings, openGames]);

  return (
    <>
      <FloatingDock
        items={links}
        desktopClassName={desktopClassName}
        mobileClassName={mobileClassName}
      />

      {showSettings && (
        <SettingsWindow
          onClose={closeSettings}
          onWallpaperChange={onWallpaperChange}
        />
      )}
      {showGames && <GamesWindow onClose={closeGames} />}
    </>
  );
}

export default FloatingDockDemo;
