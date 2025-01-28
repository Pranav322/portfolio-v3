interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description:
      'A modern portfolio website with CLI and GUI interfaces built with Next.js and TailwindCSS.',
    image: '/projects/portfolio.png',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    githubUrl: 'https://github.com/pranav322/portfolio-v3',
    liveUrl: 'https://dualportfolio.vercel.app',
  },
  {
    title: 'ElecTrade',
    description:
      'Energy trading platform with blockchain integration allowing users to trade electricity',
    techStack: ['React', 'Node.js', 'MongoDB', 'Blockchain', 'Web3'],
    githubUrl: 'https://github.com/Pranav322/ElecTrade',
    liveUrl: 'https://notfoundproject.vercel.app',
    image: '/projects/electrade.png',
  },
  {
    title: 'TeamFinder',
    description: 'Platform for finding team members and projects with AI-powered matching',
    techStack: ['Next.js', 'Auth0', 'Prisma', 'PostgreSQL', 'Node.js'],
    githubUrl: 'https://github.com/Pranav322/TeamFinder',
    liveUrl: 'https://',
    image: '/projects/teamfinder.png',
  },
  {
    title: 'Redact - Privacy App',
    description: 'Cross-platform mobile app for hiding sensitive information in photos',
    techStack: ['Flutter', 'Dart', 'Firebase', 'Android SDK', 'iOS SDK'],
    githubUrl: 'https://github.com/Pranav322/redact',
    liveUrl: 'https://redact.demo',
    image: '/projects/redact.png',
  },
  {
    title: 'Tech Quiz App',
    description:
      'Mobile application for testing technical knowledge in various programming domains',
    techStack: ['Flutter', 'Dart', 'Firebase', 'Node.js'],
    githubUrl: 'https://github.com/Pranav322/Quizapp',
    liveUrl: 'https://quizapp.demo',
    image: '/projects/quizapp.png',
  },
  {
    title: 'Real Time Chat App',
    description: 'Secure messaging platform with real-time notifications and E2E encryption',
    techStack: ['Flutter', 'Node.js', 'Firebase', 'WebSocket', 'Dart'],
    githubUrl: 'https://github.com/Pranav322/ChatApp',
    liveUrl: 'https://chat.demo',
    image: '/projects/chat.png',
  },
];
