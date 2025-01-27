import { useState, useRef } from 'react';
import {
  IconFolder,
  IconUser,
  IconTools,
  IconBriefcase,
  IconFileCode,
  IconBrandGithub,
  IconMail,
  IconBook,
} from '@tabler/icons-react';
// import { AboutWindow } from '../windows/AboutWindow';
import AboutWindow from '../windows/AboutWindow';
import { BooksWindow } from '../windows/BooksWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';

export function DesktopIcons() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIconClick = (iconName: string) => {
    if (selectedIcon === iconName) {
      // Double click detected
      if (iconName === 'About Me') {
        setShowAbout(true);
      } else if (iconName === 'Books') {
        setShowBooks(true);
      } else if (iconName === 'Projects') {
        setShowProjects(true);
      }
      setSelectedIcon(null);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    } else {
      // First click
      setSelectedIcon(iconName);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = setTimeout(() => {
        setSelectedIcon(null);
      }, 500); // Reset after 500ms if no second click
    }
  };

  const icons = [
    {
      name: 'About Me',
      icon: <IconUser size={32} />,
      color: 'text-blue-400',
    },

    {
      name: 'Projects',
      icon: <IconFolder size={32} />,
      color: 'text-yellow-400',
    },
    {
      name: 'Skills',
      icon: <IconTools size={32} />,
      color: 'text-green-400',
    },
    {
      name: 'Books',
      icon: <IconBook size={32} />,
      color: 'text-yellow-400',
    },
    // {
    //   name: 'Experience',
    //   icon: <IconBriefcase size={32} />,
    //   color: 'text-purple-400',
    // },
    {
      name: 'GitHub',
      icon: <IconBrandGithub size={32} />,
      color: 'text-gray-400',
    },
    {
      name: 'Contact',
      icon: <IconMail size={32} />,
      color: 'text-pink-400',
    },
  ];

  return (
    <>
      <div className="fixed left-4 top-4 grid grid-cols-1 gap-6">
        {icons.map((icon, index) => (
          <div
            key={icon.name}
            className={`group flex flex-col items-center gap-1 cursor-pointer w-24 ${
              selectedIcon === icon.name ? 'bg-white/20 rounded-lg' : ''
            }`}
            onClick={() => handleIconClick(icon.name)}
          >
            <div
              className={`p-3 rounded-lg backdrop-blur-md bg-black/20 group-hover:bg-black/30 transition-all ${icon.color}`}
            >
              {icon.icon}
            </div>
            <span className="text-xs text-white/80 text-center px-2 py-1 rounded backdrop-blur-sm bg-black/20 w-full">
              {icon.name}
            </span>
          </div>
        ))}
      </div>

      {showAbout && <AboutWindow onClose={() => setShowAbout(false)} />}
      {showBooks && <BooksWindow onClose={() => setShowBooks(false)} />}
      {showProjects && <ProjectsWindow onClose={() => setShowProjects(false)} />}
    </>
  );
}
