export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectDetail {
  subtitle: string;
  heroImage?: string;
  highlights: { title: string; description: string }[];
  mainParagraph: string;
  features: ProjectFeature[];
  conclusion?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  year: string;
  status: string;
  logo?: string;
  details?: ProjectDetail;
}


export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  link: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}