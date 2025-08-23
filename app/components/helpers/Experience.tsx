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
    id: 'gradguide-2025',
    company: 'GradGuide',
    role: 'LLM Developer Intern (Backend)',
    duration: 'May 2025 - Aug 2025',
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    location: 'Remote',
    type: 'Internship',
    description: 'Backend developer specializing in FastAPI and large language model (LLM) integration, with experience building scalable APIs, deploying AI systems, and delivering production-ready applications.',
    responsibilities: [
      'Developed a RAG-based chatbot API using FastAPI, enabling context-aware conversational responses',
      'Built a recommendation engine that generated personalized outputs based on user profile details',
      'Handled deployment and storage on Google Cloud Platform (GCP) for scalable hosting and data management',
      'Designed and implemented backend services for the company\'s internal CRM system',
      'Integrated LLM capabilities into existing backend infrastructure'
    ],
    technologies: [
      'Python', 'FastAPI', 'LLM Integration', 'RAG Systems', 'Google Cloud Platform (GCP)', 
      'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'Postman'
    ],
    achievements: [
      'Successfully deployed RAG-based chatbot API with context-aware responses',
      'Built and optimized recommendation engine for personalized user experiences',
      'Implemented scalable backend services on GCP with proper data management',
      'Contributed to internal CRM system architecture and development'
    ]
  }
];

// Experience summary for quick access
export const experienceSummary = {
  totalYears: '3 months',
  primaryTechnologies: ['Python', 'FastAPI', 'LLM Integration', 'RAG Systems', 'GCP'],
  currentRole: 'LLM Developer Intern',
  companiesWorked: experiences.length,
  projectsCompleted: '10+',
  languages: ['Python', 'JavaScript'],
  frameworks: ['FastAPI', 'Flask', 'Next.js'],
  databases: ['PostgreSQL', 'MongoDB'],
  tools: ['Git', 'Docker', 'GCP', 'Postman', 'VS Code']
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
