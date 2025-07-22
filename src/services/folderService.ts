import axios from 'axios';
import { Folder, Game } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const getUserFolders = async (token: string): Promise<Folder[]> => {
  const response = await axios.get(`${API_BASE}/folders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchFolderDetails = async (
  folderId: string,
  token: string
): Promise<{ folder: Folder; games: Game[] }> => {
  const response = await axios.get(`${API_BASE}/folders/${folderId}/with-games`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("📦 Folder response from API:", response.data);

  return {
    folder: response.data.folder,
    games: response.data.games,
  };
};


