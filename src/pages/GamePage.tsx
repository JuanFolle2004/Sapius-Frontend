// src/pages/GamePage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Game } from "../types";
import { getGameById } from "../services/gameService";

export default function GamePage() {
  const { gameId } = useParams();
  const { token } = useUser()!;
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const loadGame = async () => {
      if (!gameId || !token) return;
      try {
        const gameData = await getGameById(gameId, token);
        setGame(gameData);
      } catch (err) {
        console.error("Failed to load game", err);
      }
    };
    loadGame();
  }, [gameId, token]);

  if (!game) return <p className="p-6">Loading game...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Game</h2>
      <p className="text-lg font-medium mb-2">{game.question}</p>
      <ul className="space-y-2">
        {game.options.map((opt, idx) => (
          <li key={idx} className="bg-gray-100 rounded p-2">{opt}</li>
        ))}
      </ul>
      <p className="text-sm text-gray-500 mt-4">Explanation: {game.explanation}</p>
    </div>
  );
}
