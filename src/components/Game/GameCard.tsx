// src/components/Game/GameCard.tsx
import React from 'react';
import { Game } from '../../types';

export default function GameCard({ game }: { game: Game }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-2">Q{game.order}: {game.question}</h2>
      <ul className="list-disc pl-6 mb-2">
        {game.options.map((option, i) => (
          <li key={i}>{option}</li>
        ))}
      </ul>
      <p className="text-green-600">Answer: {game.correctAnswer}</p>
      <p className="text-gray-500 text-sm mt-2">{game.explanation}</p>
    </div>
  );
}
