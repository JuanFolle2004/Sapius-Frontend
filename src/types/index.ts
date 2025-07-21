export interface Folder {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  gameIds: string[];
  parentId?: string;
}

export interface Game {
  id: string;
  order: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  folderId: string;
  createdAt: string;
  createdBy: string;
  title?: string;
}
