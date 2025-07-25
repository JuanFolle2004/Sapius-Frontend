import api from './api';
import { Folder, Game } from '../types';

export const getUserFolders = async (): Promise<Folder[]> => {
  const response = await api.get('/folders');
  return response.data;
};

export const fetchFolderDetails = async (
  folderId: string
): Promise<{ folder: Folder; games: Game[] }> => {
  try {
    const response = await api.get(`/folders/${folderId}/with-games`);
    console.log("📦 Folder response from API:", response.data);
    return {
      folder: response.data.folder,
      games: response.data.games,
    };
  } catch (error: any) {
    console.error("🚨 Failed to fetch folder:", error.response?.data || error.message);
    throw error;
  }
};

export const createFolderWithGames = async (
  title: string,
  description: string,
  prompt: string
): Promise<{ folder: Folder; games: Game[] }> => {
  const folderRes = await api.post('/folders', {
    title,
    description,
    prompt,
  });

  const folderId = folderRes.data.id;
  const gamesRes = await api.post(`/ai/generate-from-folder/${folderId}`);

  return {
    folder: folderRes.data,
    games: gamesRes.data,
  };
};
