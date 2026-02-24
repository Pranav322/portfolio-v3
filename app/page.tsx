'use client';
import { ToggleButton } from './components/ui/ButtonToggle';
import { useState, useCallback } from 'react';
import FloatingDockDemo from './components/Navbar';
import { DesktopIcons } from './components/ui/DesktopIcons';
import { Quote } from './components/ui/Quote';
import dynamic from 'next/dynamic';

const Terminalcomp = dynamic(() => import('./components/Terminal/Terminal'), {
  ssr: false,
  loading: () => <div className="text-white text-center">Loading Terminal...</div>,
});

const BrowserWindow = dynamic(
  () => import('./components/windows/BrowserWindow').then(mod => mod.BrowserWindow),
  { ssr: false }
);

export default function Home() {
  const [isCLI, setIsCLI] = useState(false);
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  const handleWallpaperChange = useCallback((newWallpaper: string) => {
    // Memoized to prevent re-renders of child components like DesktopIcons and FloatingDock
    console.log('New wallpaper:', newWallpaper); // Debug log
    setWallpaper(newWallpaper);
  }, []);

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
          <div className="fixed bottom-4 sm:bottom-8 left-0 right-0 flex justify-center z-40">
            <FloatingDockDemo
              desktopClassName=""
              mobileClassName="fixed bottom-4 right-4 z-40"
              onWallpaperChange={handleWallpaperChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
