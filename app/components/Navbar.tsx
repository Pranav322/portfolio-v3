import React, { useState } from 'react';
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
  const [windowKeys, setWindowKeys] = useState<Record<string, number>>({});

  const incrementKey = (key: string) => {
    setWindowKeys(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  };

  const links = [
    {
      title: 'Home',
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
    },
    {
      title: 'Settings',
      icon: <IconSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
      action: () => {
        incrementKey('Settings');
        setShowSettings(true);
      },
    },
    // {
    //   title: 'Components',
    //   icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    //   href: '#',
    // },
    {
      title: 'Games',
      icon: (
        <IconDeviceGamepad2
          size={24}
          className="h-full w-full text-neutral-500 dark:text-neutral-300"
        />
      ),
      href: '#',
      action: () => {
        incrementKey('Games');
        setShowGames(true);
      },
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
  ];

  return (
    <>
      <FloatingDock
        items={links}
        desktopClassName={desktopClassName}
        mobileClassName={mobileClassName}
      />

      {showSettings && (
        <SettingsWindow
          key={`settings-${windowKeys['Settings'] || 0}`}
          onClose={() => setShowSettings(false)}
          onWallpaperChange={onWallpaperChange}
        />
      )}
      {showGames && (
        <GamesWindow
          key={`games-${windowKeys['Games'] || 0}`}
          onClose={() => setShowGames(false)}
        />
      )}
    </>
  );
}

export default FloatingDockDemo;
