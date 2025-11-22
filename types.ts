export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  timestamp: number;
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface HobbyItem {
  id: string;
  title: string;
  category: 'Gaming' | 'LEGO' | 'Sports' | 'DIY';
  description: string;
  imageUrl: string;
  stats?: { label: string; value: string }[];
}
