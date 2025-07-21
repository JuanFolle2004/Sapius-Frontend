import React, { useEffect, useState } from 'react';
import { getUserFolders } from '../services/folderService';
import FolderCard from '../components/Folder/FolderCard';
import { Folder } from '../types';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      getUserFolders(token)
        .then(setFolders)
        .catch((err) => console.error('Error fetching folders:', err));
    }
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Folders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            courseCount={folder.gameIds?.length || 0}
            progress={0.4} // Placeholder until you compute progress dynamically
            onClick={() => onNavigate('folder', folder)}
          />
        ))}
      </div>
    </div>
  );
}
