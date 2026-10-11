export type ThemeAccent = 'cobalt' | 'emerald' | 'amber' | 'rose' | 'slate';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'web' | 'systems' | 'design' | 'fullstack';
  tags: string[];
  metrics: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  impact: string;
  techStack: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  timeline: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: string;
    experience: string;
  }[];
}

export interface SiteConfig {
  developerName: string;
  roleTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  bioSummary: string;
  email: string;
  location: string;
  availability: 'Available for high-impact projects' | 'Consulting & full-time roles' | 'Booking Q2/Q3';
  themeAccent: ThemeAccent;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  projects: ProjectItem[];
  services: ServiceItem[];
  skills: SkillCategory[];
}
