'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    // Main UI colors
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;

    // Icon colors
    iconBlue: string;
    iconYellow: string;
    iconGreen: string;
    iconRed: string;
    iconPurple: string;
    iconSpotify: string;

    // Text colors
    textPrimary: string;
    textSecondary: string;
    textMuted: string;

    // Border and hover colors
    border: string;
    hover: string;
    glass: string;
  };
}

const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Classic dark theme with blue accents',
    colors: {
      primary: 'rgb(59, 130, 246)', // blue-500
      secondary: 'rgb(30, 41, 59)', // slate-800
      accent: 'rgb(96, 165, 250)', // blue-400
      background: 'rgba(0, 0, 0, 0.95)',
      surface: 'rgba(255, 255, 255, 0.05)',

      iconBlue: 'rgb(96, 165, 250)', // blue-400
      iconYellow: 'rgb(251, 191, 36)', // yellow-400
      iconGreen: 'rgb(74, 222, 128)', // green-400
      iconRed: 'rgb(248, 113, 113)', // red-400
      iconPurple: 'rgb(34, 211, 238)', // cyan-400
      iconSpotify: '#1DB954',

      textPrimary: 'rgba(255, 255, 255, 0.9)',
      textSecondary: 'rgba(255, 255, 255, 0.8)',
      textMuted: 'rgba(255, 255, 255, 0.6)',

      border: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(255, 255, 255, 0.1)',
      glass: 'rgba(0, 0, 0, 0.2)',
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon-inspired theme with electric colors',
    colors: {
      primary: 'rgb(236, 72, 153)', // pink-500
      secondary: 'rgb(15, 23, 42)', // slate-900
      accent: 'rgb(244, 114, 182)', // pink-400
      background: 'rgba(15, 23, 42, 0.95)',
      surface: 'rgba(236, 72, 153, 0.1)',

      iconBlue: 'rgb(14, 165, 233)', // sky-500
      iconYellow: 'rgb(245, 158, 11)', // amber-500
      iconGreen: 'rgb(34, 197, 94)', // green-500
      iconRed: 'rgb(239, 68, 68)', // red-500
      iconPurple: 'rgb(6, 182, 212)', // cyan-500
      iconSpotify: '#1ED760',

      textPrimary: 'rgba(255, 255, 255, 0.95)',
      textSecondary: 'rgba(244, 114, 182, 0.9)',
      textMuted: 'rgba(255, 255, 255, 0.7)',

      border: 'rgba(236, 72, 153, 0.2)',
      hover: 'rgba(236, 72, 153, 0.15)',
      glass: 'rgba(15, 23, 42, 0.3)',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    description: 'Cool blue and teal theme inspired by the ocean',
    colors: {
      primary: 'rgb(6, 182, 212)', // cyan-500
      secondary: 'rgb(3, 7, 18)', // slate-950
      accent: 'rgb(34, 211, 238)', // cyan-400
      background: 'rgba(3, 7, 18, 0.95)',
      surface: 'rgba(6, 182, 212, 0.1)',

      iconBlue: 'rgb(34, 211, 238)', // cyan-400
      iconYellow: 'rgb(251, 191, 36)', // yellow-400
      iconGreen: 'rgb(52, 211, 153)', // emerald-400
      iconRed: 'rgb(248, 113, 113)', // red-400
      iconPurple: 'rgb(20, 184, 166)', // teal-500
      iconSpotify: '#1DB954',

      textPrimary: 'rgba(255, 255, 255, 0.95)',
      textSecondary: 'rgba(34, 211, 238, 0.9)',
      textMuted: 'rgba(255, 255, 255, 0.65)',

      border: 'rgba(6, 182, 212, 0.15)',
      hover: 'rgba(6, 182, 212, 0.1)',
      glass: 'rgba(3, 7, 18, 0.4)',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Earthy green theme inspired by nature',
    colors: {
      primary: 'rgb(34, 197, 94)', // green-500
      secondary: 'rgb(20, 83, 45)', // green-900
      accent: 'rgb(74, 222, 128)', // green-400
      background: 'rgba(20, 83, 45, 0.95)',
      surface: 'rgba(34, 197, 94, 0.1)',

      iconBlue: 'rgb(96, 165, 250)', // blue-400
      iconYellow: 'rgb(251, 191, 36)', // yellow-400
      iconGreen: 'rgb(74, 222, 128)', // green-400
      iconRed: 'rgb(248, 113, 113)', // red-400
      iconPurple: 'rgb(34, 211, 238)', // cyan-400
      iconSpotify: '#1DB954',

      textPrimary: 'rgba(255, 255, 255, 0.95)',
      textSecondary: 'rgba(74, 222, 128, 0.9)',
      textMuted: 'rgba(255, 255, 255, 0.65)',

      border: 'rgba(34, 197, 94, 0.2)',
      hover: 'rgba(34, 197, 94, 0.15)',
      glass: 'rgba(20, 83, 45, 0.3)',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange and red theme like a beautiful sunset',
    colors: {
      primary: 'rgb(249, 115, 22)', // orange-500
      secondary: 'rgb(124, 45, 18)', // orange-900
      accent: 'rgb(251, 146, 60)', // orange-400
      background: 'rgba(124, 45, 18, 0.95)',
      surface: 'rgba(249, 115, 22, 0.1)',

      iconBlue: 'rgb(96, 165, 250)', // blue-400
      iconYellow: 'rgb(251, 191, 36)', // yellow-400
      iconGreen: 'rgb(74, 222, 128)', // green-400
      iconRed: 'rgb(248, 113, 113)', // red-400
      iconPurple: 'rgb(34, 211, 238)', // cyan-400
      iconSpotify: '#1DB954',

      textPrimary: 'rgba(255, 255, 255, 0.95)',
      textSecondary: 'rgba(251, 146, 60, 0.9)',
      textMuted: 'rgba(255, 255, 255, 0.7)',

      border: 'rgba(249, 115, 22, 0.2)',
      hover: 'rgba(249, 115, 22, 0.15)',
      glass: 'rgba(124, 45, 18, 0.3)',
    },
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('portfolio-theme');
    if (savedThemeId) {
      const savedTheme = themes.find(theme => theme.id === savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  // Apply CSS custom properties when theme changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const root = document.documentElement;
      const { colors } = currentTheme;

      // Batch DOM updates
      requestAnimationFrame(() => {
        Object.entries(colors).forEach(([key, value]) => {
          root.style.setProperty(`--theme-${key}`, value);
        });
      });
    }, 16); // 16ms debounce (1 frame)

    return () => clearTimeout(timeoutId);
  }, [currentTheme]);

  const setTheme = useCallback(
    (themeId: string) => {
      const theme = themes.find(t => t.id === themeId);
      if (theme && theme.id !== currentTheme.id) {
        setCurrentTheme(theme);
        localStorage.setItem('portfolio-theme', themeId);
      }
    },
    [currentTheme.id]
  );

  const contextValue = useMemo(
    () => ({
      currentTheme,
      setTheme,
      themes,
    }),
    [currentTheme, setTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
