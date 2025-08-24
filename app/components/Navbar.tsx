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
import { BrowserWindow } from './windows/BrowserWindow';
import { SettingsWindow } from './windows/SettingsWindow';
import { GamesWindow } from './windows/GamesWindow';

interface FloatingDockDemoProps {
  desktopClassName: string;
  mobileClassName: string;
  onItemClick?: (href: string) => void;
  onWallpaperChange: (wallpaper: string) => void;
}

function FloatingDockDemo({
  desktopClassName,
  mobileClassName,
  onItemClick,
  onWallpaperChange,
}: FloatingDockDemoProps) {
  const [githubUrl, setGithubUrl] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showGames, setShowGames] = useState(false);

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
      action: () => setShowSettings(true),
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
      label: 'Games',
      action: () => setShowGames(true),
    },
    {
      title: 'Twitter',
      icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: 'https://x.com/_pranav69',
    },
    {
      title: 'GitHub',
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: 'github',
      action: () => onItemClick?.('github'),
    },
  ];

  return (
    <>
      <FloatingDock
        items={links}
        desktopClassName={desktopClassName}
        mobileClassName={mobileClassName}
      />
      {githubUrl && <BrowserWindow initialUrl={githubUrl} onClose={() => setGithubUrl(null)} />}
      {showSettings && (
        <SettingsWindow
          onClose={() => setShowSettings(false)}
          onWallpaperChange={onWallpaperChange}
        />
      )}
      {showGames && <GamesWindow onClose={() => setShowGames(false)} />}
    </>
  );
}

export default FloatingDockDemo;
