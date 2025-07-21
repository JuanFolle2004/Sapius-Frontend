// src/pages/FolderPage.tsx
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { fetchFolderDetails } from '../services/folderService';
import { Game, Folder } from '../types';
import GameCard from '../components/Game/GameCard';

interface FolderPageProps {
  folderId: string;
}

export default function FolderPage({ folderId }: FolderPageProps) {
  const { token } = useUser()!;
  const [folder, setFolder] = useState<Folder | null>(null);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const loadFolder = async () => {
      try {
        const data = await fetchFolderDetails(folderId, token);
        setFolder(data.folder);
        setGames(data.games);
      } catch (err) {
        console.error('Error fetching folder:', err);
      }
    };
    loadFolder();
  }, [folderId, token]);

  if (!folder) return <p className="p-6">Loading folder...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{folder.title}</h1>
      <p className="text-gray-700 mb-8">{folder.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
