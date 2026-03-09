import axios from 'axios';
import { Game } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export type UiDifficulty = 'same' | 'easier' | 'harder';
export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type Language = 'en' | 'es';

export const generateGamesFromFolder = async (
  token: string,
  folderId: string,
  duration: number,
  language?: Language,
  difficulty?: UiDifficulty,
  courseDifficulty?: CourseDifficulty,
  avoidKeys?: string[]
): Promise<Game[]> => {
  const body = {
    duration,
    language,
    difficulty,
    courseDifficulty,
    avoidKeys,
  };

  const res = await axios.post(
    `${API_BASE}/ai/generate-from-folder/${folderId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};