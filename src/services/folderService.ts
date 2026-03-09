import api from './api';
import { Folder, Game } from '../types';
import axios from '../utils/axios';

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

export const createFolder = async (
  title: string,
  description: string,
  prompt: string
): Promise<Folder> => {
  const folderRes = await api.post('/folders', {
    title,
    description,
    prompt,
  });

  return folderRes.data; // ✅ only folder, no games here
};


// Delete folder and all its games @router.delete("/delete/{folder_id}")
export const deleteFolder = async (folderId: string): Promise<void> => {
  await api.delete(`/folders/delete/${folderId}`);
}