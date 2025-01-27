'use client'
import { ToggleButton } from './components/ui/ButtonToggle';
import { useState } from 'react';
import FloatingDockDemo from './components/Navbar';
import Terminalcomp from './components/Terminal';
import { DesktopIcons } from './components/ui/DesktopIcons';

export default function Home() {
const [isCLI, setIsCLI] = useState(false);

  
  return (
    <div className="relative h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* Main content area */}
      <div className="relative h-full flex flex-col">
        {!isCLI && <DesktopIcons />}
        
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
          />
        )}
      </div>
    </div>
  );
}