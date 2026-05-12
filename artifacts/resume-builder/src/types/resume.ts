export interface ResumeData {
  personal: {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
    portfolio: string;
    photoUrl: string;
    objective: string;
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    grade: string;
    description: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    location: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: number;
    category: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    startDate: string;
    endDate: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialUrl: string;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    proficiency: string;
  }>;
  interests: string[];
  references: Array<{
    id: string;
    name: string;
    role: string;
    company: string;
    email: string;
    phone: string;
  }>;
  settings: {
    template: 'modern' | 'minimal' | 'corporate' | 'creative' | 'ats' | 'dark';
    primaryColor: string;
    fontFamily: string;
    fontSize: number;
    accentColor: string;
    sectionOrder: string[];
  };
}

export const defaultResumeData: ResumeData = {
  personal: {
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    portfolio: '',
    photoUrl: '',
    objective: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  interests: [],
  references: [],
  settings: {
    template: 'modern',
    primaryColor: '#6366f1',
    fontFamily: 'Inter',
    fontSize: 14,
    accentColor: '#4f46e5',
    sectionOrder: [
      'experience',
      'education',
      'skills',
      'projects',
      'certifications',
      'achievements',
      'languages',
      'interests',
      'references'
    ],
  },
};
