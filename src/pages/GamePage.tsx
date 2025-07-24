import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Game } from "../types";
import { getGameById } from "../services/gameService";

export default function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { token } = useUser()!;
  const [game, setGame] = useState<Game | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

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

  const isCorrect = selectedAnswer === game.correctAnswer;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Game</h2>
      <p className="text-lg font-medium mb-4">{game.question}</p>
      <ul className="space-y-2">
        {game.options.map((opt, idx) => {
          let bg = "bg-gray-100";
          if (selectedAnswer) {
            if (opt === game.correctAnswer) bg = "bg-green-200";
            else if (opt === selectedAnswer) bg = "bg-red-200";
          }

          return (
            <li
              key={idx}
              onClick={() => {
                if (!selectedAnswer) setSelectedAnswer(opt);
              }}
              className={`rounded p-2 cursor-pointer transition ${bg}`}
            >
              {opt}
            </li>
          );
        })}
      </ul>

      {selectedAnswer && (
        <p className="text-sm text-gray-700 mt-4 italic">
          Explanation: {game.explanation}
        </p>
      )}

      <button
        onClick={() => navigate(`/folders/${game.folderId}`)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Folder
      </button>
    </div>
  );
}
