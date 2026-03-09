import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { fetchFolderDetails } from '../services/folderService';
import { Game, Folder } from '../types';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../services/api';
import api from '../services/api';

interface FolderPageProps {
  folderId: string;
}

export default function FolderPage({ folderId }: FolderPageProps) {
  const { token } = useUser()!;
  const [folder, setFolder] = useState<Folder | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !folderId) return;

    const fetchData = async () => {
      try {
        setAuthToken(token);
        const { folder, games } = await fetchFolderDetails(folderId);
        setFolder(folder);
        setGames(games);
      } catch (err) {
        console.error('Error fetching folder:', err);
        setError('Failed to load folder.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [folderId, token]);

  const handleGenerateGames = async () => {
    if (!folderId) return;
    try {
      setGenerating(true);
      await api.post(`/ai/generate-from-folder/${folderId}`, {});
      const { folder, games } = await fetchFolderDetails(folderId);
      setFolder(folder);
      setGames(games);
    } catch (err) {
      console.error("Error generating games:", err);
      setError("Failed to generate games.");
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteFolder = async () => {
    if (!folderId) return;
    try {
      await api.delete(`/folders/delete/${folderId}`);
      navigate('/');
    } catch (err) {
      console.error("Error deleting folder:", err);
      setError("Failed to delete folder.");
    }
  };

  if (loading) return <p className="p-6">Loading folder...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!folder) return null;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{folder.title}</h1>
          <p className="text-gray-700">{folder.description}</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleGenerateGames}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
            disabled={generating}
          >
            {generating ? "Generating..." : "Generate 3 Games"}
          </button>
          <button
            onClick={handleDeleteFolder}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete Folder
          </button>
        </div>
      </div>

      {games.length === 0 ? (
        <p className="text-gray-500">No games in this folder.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => navigate(`/games/${game.id}`)}
              className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-teal-50 transition duration-200 cursor-pointer"
            >
              <h3 className="text-md font-semibold text-gray-800">
                {game.question}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
