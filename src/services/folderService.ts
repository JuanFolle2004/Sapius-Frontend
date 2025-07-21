import axios from 'axios';
import { Folder } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const getUserFolders = async (token: string): Promise<Folder[]> => {
  const response = await axios.get(`${API_BASE}/folders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.folders; // Make sure your backend sends `{ folders: [...] }`
};
