export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  recentTopics: string[];
  progress: Record<string, CourseProgress>;
  totalXP: number;
  streak: number;
  level: number;
}

export interface CourseProgress {
  completedGames: number[];
  lastAccessed: string;
  xpEarned: number;
  accuracy: number;
}

export interface Folder {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  courseIds: string[];
  color: string;
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  folderId?: string;
  games: Game[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  totalXP: number;
}

export interface Game {
  id: string;
  order: number;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  xpReward: number;
  hints?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpRequired: number;
  unlocked: boolean;
}