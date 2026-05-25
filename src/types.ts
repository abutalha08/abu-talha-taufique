export interface Skill {
  name: string;
  icon: any; // React component or emoji or icon node
  level: number; // percentage or rating (1-5)
  category: "frontend" | "backend" | "tools" | "soft";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  githubClientUrl?: string;
  githubServerUrl?: string;
  liveUrl?: string;
  image: string; // Background style/gradient or illustration
  featured: boolean;
  category: "fullstack" | "frontend" | "uiux";
  stats?: { label: string; value: string }[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  grade?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
