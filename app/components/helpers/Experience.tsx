export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Freelance';
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: 'the-souled-store-2026',
    company: 'The Souled Store',
    role: 'Associate SDE',
    duration: 'Feb 2026 - Present',
    startDate: '2026-02-01',
    endDate: 'Present',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Recently joined as an Associate Software Development Engineer. Currently focusing on testing systems and understanding the core architecture.',
    responsibilities: ['Testing software components and contributing to the QA process'],
    technologies: ['Testing', 'Software Development'],
    achievements: ['Onboarded as an Associate SDE to help maintain and test core applications'],
  },
  {
    id: 'unusual-consultants-2025',
    company: 'Unusual Consultants',
    role: 'Fullstack Developer Intern',
    duration: 'Dec 2025 - Jan 2026',
    startDate: '2025-12-01',
    endDate: '2026-01-31',
    location: 'Remote',
    type: 'Internship',
    description:
      'Early engineer building a platform to connect mentors and mentees. Handled full-stack development using modern web technologies.',
    responsibilities: [
      'Built responsive frontend interfaces using Next.js',
      'Developed backend services and APIs using FastAPI',
      'Designed and managed the database schema with PostgreSQL',
      'Deployed and managed infrastructure on Google Cloud Platform (GCP)',
    ],
    technologies: [
      'Next.js',
      'FastAPI',
      'PostgreSQL',
      'Google Cloud Platform (GCP)',
      'TypeScript',
      'Python',
    ],
    achievements: ['Contributed as an early engineer to build the core platform from scratch'],
  },
  {
    id: 'gradguide-2025',
    company: 'GradGuide',
    role: 'LLM Developer Intern (Backend)',
    duration: 'May 2025 - Aug 2025',
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    location: 'Remote',
    type: 'Internship',
    description:
      'Backend developer specializing in FastAPI and large language model (LLM) integration, with experience building scalable APIs, deploying AI systems, and delivering production-ready applications.',
    responsibilities: [
      'Developed a RAG-based chatbot API using FastAPI, enabling context-aware conversational responses',
      'Built a recommendation engine that generated personalized outputs based on user profile details',
      'Handled deployment and storage on Google Cloud Platform (GCP) for scalable hosting and data management',
      "Designed and implemented backend services for the company's internal CRM system",
      'Integrated LLM capabilities into existing backend infrastructure',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'LLM Integration',
      'RAG Systems',
      'Google Cloud Platform (GCP)',
      'PostgreSQL',
      'MongoDB',
      'Docker',
      'Git',
      'Postman',
    ],
    achievements: [
      'Successfully deployed RAG-based chatbot API with context-aware responses',
      'Built and optimized recommendation engine for personalized user experiences',
      'Implemented scalable backend services on GCP with proper data management',
      'Contributed to internal CRM system architecture and development',
    ],
  },
];

// Experience summary for quick access
export const experienceSummary = {
  totalYears: '1 year',
  primaryTechnologies: ['Next.js', 'FastAPI', 'Python', 'TypeScript', 'PostgreSQL', 'GCP'],
  currentRole: 'Associate SDE',
  companiesWorked: experiences.length,
  projectsCompleted: '10+',
  languages: ['Python', 'JavaScript', 'TypeScript'],
  frameworks: ['Next.js', 'FastAPI', 'Flask'],
  databases: ['PostgreSQL', 'MongoDB'],
  tools: ['Git', 'Docker', 'GCP', 'Postman', 'VS Code'],
};

// Get experience by company or role
export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(exp => exp.id === id);
};

// Get current job
export const getCurrentExperience = (): Experience | undefined => {
  return experiences.find(exp => exp.endDate === 'Present');
};

// Get experiences by type
export const getExperiencesByType = (type: Experience['type']): Experience[] => {
  return experiences.filter(exp => exp.type === type);
};
