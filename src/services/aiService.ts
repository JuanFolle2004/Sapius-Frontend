import axios from 'axios';
import { Game } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const generateGames = async (
  token: string,
  prompt: string,
  folderId: string,
  count: number = 3
): Promise<Game[]> => {
  const res = await axios.post(
    `${API_BASE}/ai/generate-games`,
    { prompt, folderId, count },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.games;
};
