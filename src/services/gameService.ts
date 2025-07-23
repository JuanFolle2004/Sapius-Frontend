// ✅ Updated gameService.ts
// src/services/gameService.ts
import axios from 'axios';
import { Game } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const getGamesByFolder = async (folderId: string, token: string): Promise<Game[]> => {
  const res = await axios.get(`${API_BASE}/games/folder/${folderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.games ?? res.data; // Support both { games: [...] } and [...] formats
};

export const getGameById = async (gameId: string, token: string): Promise<Game> => {
  const res = await axios.get(`${API_BASE}/games/games/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
