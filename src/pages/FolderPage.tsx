// src/pages/FolderPage.tsx
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { fetchFolderDetails } from '../services/folderService';
import { Game, Folder } from '../types';
import { useNavigate } from 'react-router-dom';

interface FolderPageProps {
  folderId: string;
}

export default function FolderPage({ folderId }: FolderPageProps) {
  const { token } = useUser()!;
  const [folder, setFolder] = useState<Folder | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFolder = async () => {
      try {
        const { folder, games } = await fetchFolderDetails(folderId, token);
        setFolder(folder);
        setGames(games);
      } catch (err) {
        console.error('Error fetching folder:', err);
        setError("Failed to load folder.");
      }
    };

    if (token) loadFolder();
  }, [folderId, token]);

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!folder) return <p className="p-6">Loading folder...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{folder.title}</h1>
      <p className="text-gray-700 mb-6">{folder.description}</p>

      {games.length === 0 ? (
        <p className="text-gray-500">No games in this folder.</p>
      ) : (
        <ul className="space-y-2">
          {games.map((game) => (
            <li
              key={game.id}
              onClick={() => {
              console.log("Navigating to game:", game);
              navigate(`/games/${game.id}`);
              }}
              className="cursor-pointer text-teal-600 hover:underline"
            >
              {game.question}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
