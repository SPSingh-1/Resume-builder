import { ResumeData } from '../types/resume';

export const sampleData: ResumeData = {
  personal: {
    name: "John Doe",
    jobTitle: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    portfolio: "johndoe.dev",
    photoUrl: "",
    objective: "Passionate software engineer with 8+ years of experience building scalable web applications and leading cross-functional teams. Specialized in React, Node.js, and cloud architecture.",
  },
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2010-09-01",
      endDate: "2014-05-01",
      grade: "3.8 GPA",
      description: "Minor in Mathematics. Lead developer of the university robotics team.",
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "TechNova Solutions",
      role: "Senior Software Engineer",
      startDate: "2019-06-01",
      endDate: "",
      current: true,
      description: "Led the migration of a monolith architecture to microservices, improving system performance by 40%. Mentored junior engineers and established CI/CD best practices.",
      location: "San Francisco, CA",
    },
    {
      id: "exp-2",
      company: "InnovateApp Inc",
      role: "Software Engineer",
      startDate: "2015-03-01",
      endDate: "2019-05-01",
      current: false,
      description: "Developed and maintained highly responsive React applications. Collaborated with product and design teams to deliver features on time.",
      location: "San Jose, CA",
    }
  ],
  skills: [
    { id: "sk-1", name: "JavaScript/TypeScript", level: 95, category: "Languages" },
    { id: "sk-2", name: "React", level: 90, category: "Frameworks" },
    { id: "sk-3", name: "Node.js", level: 85, category: "Backend" },
    { id: "sk-4", name: "AWS", level: 75, category: "Cloud" },
    { id: "sk-5", name: "System Design", level: 80, category: "Concepts" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "E-Commerce Platform",
      description: "Built a fully functional e-commerce platform handling 10k+ daily active users.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "github.com/johndoe/ecommerce",
      liveUrl: "shop-demo.com",
      startDate: "2021-01-01",
      endDate: "2021-06-01"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022-08-15",
      credentialUrl: "aws.amazon.com/verify/123"
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Hackathon Winner",
      description: "First place out of 50 teams at the Global Tech Hackathon.",
      date: "2020-11-20"
    }
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Intermediate" }
  ],
  interests: ["Photography", "Hiking", "Open Source", "Machine Learning"],
  references: [
    {
      id: "ref-1",
      name: "Jane Smith",
      role: "Engineering Manager",
      company: "TechNova Solutions",
      email: "jane.smith@technova.com",
      phone: "+1 (555) 987-6543"
    }
  ],
  settings: {
    template: 'modern',
    primaryColor: '#4f46e5',
    fontFamily: 'Inter',
    fontSize: 14,
    accentColor: '#818cf8',
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
  }
};
