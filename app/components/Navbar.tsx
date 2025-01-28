import React, { useState } from 'react';
import { FloatingDock } from './ui/flaoting-dock';
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

function FloatingDockDemo({ desktopClassName, mobileClassName }) {
  const [githubUrl, setGithubUrl] = useState<string | null>(null);

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
    },
    // {
    //   title: 'Components',
    //   icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    //   href: '#',
    // },

    {
      title: 'Games',
      icon: <IconDeviceGamepad2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
    },
    {
      title: 'Twitter',
      icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: 'https://x.com/_pranav69',
    },
    {
      title: 'GitHub',
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: 'https://github.com/Pranav322',
      // action: () => setGithubUrl('https://github.com/Pranav322')
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
    </>
  );
}

export default FloatingDockDemo;
