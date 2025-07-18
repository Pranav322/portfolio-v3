'use client';
import { ToggleButton } from './components/ui/ButtonToggle';
import { useState } from 'react';
import FloatingDockDemo from './components/Navbar';
import Terminalcomp from './components/Terminal/Terminal';
import { DesktopIcons } from './components/ui/DesktopIcons';
import { BrowserWindow } from './components/windows/BrowserWindow';
import { Quote } from './components/ui/Quote';

export default function Home() {
  const [isCLI, setIsCLI] = useState(false);
  const [browserUrl, setBrowserUrl] = useState<string | null>(null);
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  const handleDockItemClick = (href: string) => {
    if (href === 'github') {
      setBrowserUrl('https://github.com/Pranav322');
    }
  };

  const handleWallpaperChange = (newWallpaper: string) => {
    console.log('New wallpaper:', newWallpaper); // Debug log
    setWallpaper(newWallpaper);
  };

  // Add this style to your main container
  const backgroundStyle = wallpaper
    ? {
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  return (
    <div
      className="relative h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]"
      style={backgroundStyle}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Add Quote component here */}
      {!isCLI && <Quote />}

      {/* Main content area */}
      <div className="relative h-full flex flex-col">
        {!isCLI && <DesktopIcons onWallpaperChange={handleWallpaperChange} />}

        {/* Toggle button section */}
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            {/* <p className="text-2xl sm:text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 sm:py-8">
              {isCLI ? 'Terminal Mode' : 'Desktop Mode'}
            </p>
            <p className="text-sm sm:text-base text-neutral-400 mb-4 sm:mb-8">
              {isCLI ? 'Type commands to interact' : 'Click icons to explore'}
            </p> */}
            <ToggleButton isCLI={isCLI} onToggle={() => setIsCLI(!isCLI)} />
          </div>
        </div>

        {/* CLI Mode */}
        {isCLI && (
          <div className="flex-grow flex items-center justify-center px-2 sm:px-4 mb-16 sm:mb-20">
            <Terminalcomp />
          </div>
        )}

        {/* Floating dock */}
        {!isCLI && (
          <FloatingDockDemo
            desktopClassName="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-40"
            mobileClassName="fixed bottom-4 right-4 z-40"
            onItemClick={handleDockItemClick}
            onWallpaperChange={handleWallpaperChange}
          />
        )}

        {browserUrl && (
          <BrowserWindow initialUrl={browserUrl} onClose={() => setBrowserUrl(null)} />
        )}
      </div>
    </div>
  );
}
