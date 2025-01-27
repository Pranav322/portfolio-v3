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
      className="fixed bottom-16 right-8 p-4 rounded-full bg-white/50 backdrop-blur-sm text-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      aria-label="Toggle GUI/CLI mode"
    >
      {isCLI ? <Monitor className="w-6 h-6" /> : <TerminalIcon className="w-6 h-6" />}
    </button>
  );
}
