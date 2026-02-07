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
    liveUrl: 'https://pranavbuilds.tech',
  },
  {
    title: 'TheApix - Streaming platform',
    description: 'Rent on demand streaming platform',
    techStack: ['Flutter', 'Dart', 'Firebase', 'Node.js', 'MongoDB', 'FFmpeg', 'Razorpay'],
    githubUrl: 'https://github.com/Pranav322/TheApix-backend',
    liveUrl:
      'https://play.google.com/store/apps/details?id=com.nomo.thea_pix_application&pcampaignid=web_share',
    image: '/projects/TheApix.png',
  },
  {
    title: 'TeamFinder',
    description: 'Platform for finding team members and projects with AI-powered matching',
    techStack: ['Next.js', 'Auth0', 'Prisma', 'PostgreSQL', 'Node.js'],
    githubUrl: 'https://github.com/Pranav322/TeamFinder',
    liveUrl: 'https://teaamfinderr.vercel.app/',
    image: '/projects/TeamzFinder.png',
  },
  {
    title: 'YouTube Technical Note-Taker',
    description:
      'An AI-powered tool that converts YouTube videos into structured Markdown notes, preserving technical content like code blocks and formulas through Map-Reduce processing.',
    techStack: [
      'FastAPI',
      'Next.js',
      'Azure OpenAI (GPT-4)',
      'PostgreSQL',
      'Python',
      'TypeScript',
      'Docker Compose',
    ],
    githubUrl: 'https://github.com/Pranav322/youtube-notes',
    liveUrl: 'https://notes.pranavbuilds.tech',
    image: '/projects/youtube-notes.png',
  },
  {
    title: 'ElecTrade',
    description:
      'Energy trading platform with blockchain integration allowing users to trade electricity',
    techStack: ['React', 'Node.js', 'MongoDB', 'Blockchain', 'Web3'],
    githubUrl: 'https://github.com/Pranav322/ElecTrade',
    liveUrl: 'https://github.com/Pranav322/ElecTrade',
    image: '/projects/ElecTrade.jpg',
  },
  {
    title: 'Redact - Privacy App',
    description: 'Cross-platform mobile app for hiding sensitive information in photos',
    techStack: ['Flutter', 'Dart', 'Firebase', 'Android SDK', 'iOS SDK'],
    githubUrl: 'https://github.com/Pranav322/redact',
    liveUrl: 'https://github.com/Pranav322/redact',
    image: '/projects/redact.jpg',
  },
  {
    title: 'Tech Quiz App',
    description:
      'Mobile application for testing technical knowledge in various programming domains',
    techStack: ['Flutter', 'Dart', 'Firebase', 'Node.js'],
    githubUrl: 'https://github.com/Pranav322/Quizapp',
    liveUrl: 'https://github.com/Pranav322/Quizapp',
    image: '/projects/quizapp.png',
  },
  {
    title: 'Real Time Chat App',
    description: 'Secure messaging platform with real-time notifications and E2E encryption',
    techStack: ['Flutter', 'Node.js', 'Firebase', 'WebSocket', 'Dart'],
    githubUrl: 'https://github.com/Pranav322/ChatApp',
    liveUrl: 'https://chat.demo',
    image: '/projects/chaatapp.png',
  },
];
