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
    <div className="relative h-screen w-full overflow-hidden" style={backgroundStyle}>
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Add Quote component here */}
      {!isCLI && <Quote />}

      {/* Main content area */}
      <div className="relative h-full flex flex-col">
        {!isCLI && <DesktopIcons onWallpaperChange={handleWallpaperChange} />}

        {/* Toggle button section */}
        <div className="flex-grow flex items-center justify-center">
          <p className="text-4xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            <ToggleButton isCLI={isCLI} onToggle={() => setIsCLI(!isCLI)} />
          </p>
        </div>

        {/* CLI Mode text */}
        {isCLI && (
          <div className="flex-grow flex items-center justify-center px-4 mb-20">
            <Terminalcomp />
          </div>
        )}

        {/* Floating dock */}
        {!isCLI && (
          <FloatingDockDemo
            desktopClassName="fixed bottom-8 left-1/2 -translate-x-1/2"
            mobileClassName="fixed bottom-8 right-8"
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
