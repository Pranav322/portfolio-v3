import React from 'react';
import { Terminal as TerminalIcon, Monitor } from 'lucide-react';

interface ToggleButtonProps {
  isCLI: boolean;
  onToggle: () => void;
}

export function ToggleButton({ isCLI, onToggle }: ToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-20 sm:bottom-24 right-4 sm:right-8 p-3 sm:p-4 rounded-full bg-white/50 backdrop-blur-sm text-black shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label="Toggle GUI/CLI mode"
    >
      {isCLI ? (
        <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />
      ) : (
        <TerminalIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      )}
    </button>
  );
}
