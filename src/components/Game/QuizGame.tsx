import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb, ArrowRight, Trophy } from 'lucide-react';
import { Game } from '../../types';

interface QuizGameProps {
  game: Game;
  onComplete: (correct: boolean) => void;
  showHints?: boolean;
}

export default function QuizGame({ game, onComplete, showHints = true }: QuizGameProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const isCorrect = selectedAnswer === game.correctAnswer;
  
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResult]);
  
  const handleAnswerSelect = (answer: string) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };
  
  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowResult(true);
      setTimeout(() => {
        onComplete(isCorrect);
      }, 2000);
    }
  };
  
  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option
        ? 'border-purple-500 bg-purple-50 text-purple-700'
        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50';
    }
    
    if (option === game.correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-700';
    }
    
    if (option === selectedAnswer && option !== game.correctAnswer) {
      return 'border-red-500 bg-red-50 text-red-700';
    }
    
    return 'border-gray-200 text-gray-400';
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Question {game.order}</h2>
            <p className="text-sm text-gray-500">{game.xpReward} XP available</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {showHints && game.hints && game.hints.length > 0 && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <Lightbulb className="h-4 w-4" />
              <span>Hint</span>
            </button>
          )}
          
          <div className={`text-sm font-mono px-3 py-2 rounded-lg ${
            timeLeft <= 10 ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'
          }`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>
      
      {/* Hint */}
      {showHint && game.hints && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">{game.hints[0]}</p>
        </div>
      )}
      
      {/* Question */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 leading-relaxed">
          {game.question}
        </h3>
      </div>
      
      {/* Options */}
      <div className="grid gap-4 mb-8">
        {game.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={showResult}
            className={`p-4 text-left border-2 rounded-xl transition-all duration-200 ${getOptionStyle(option)}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === option ? 'border-current' : 'border-gray-300'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  selectedAnswer === option ? 'bg-current' : ''
                }`}></div>
              </div>
              <span className="font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Result */}
      {showResult && (
        <div className={`p-6 rounded-xl mb-6 ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start space-x-3">
            {isCorrect ? (
              <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500 mt-0.5" />
            )}
            <div>
              <h4 className={`font-semibold mb-2 ${
                isCorrect ? 'text-green-900' : 'text-red-900'
              }`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h4>
              <p className={`text-sm ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                {game.explanation}
              </p>
              {isCorrect && (
                <div className="flex items-center space-x-2 mt-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-700">
                    +{game.xpReward} XP earned!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Submit Button */}
      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          <span>Submit Answer</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}