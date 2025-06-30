import React from 'react';
import { Play, Star, Clock, Zap, CheckCircle } from 'lucide-react';
import { Course, CourseProgress } from '../../types';

interface CourseCardProps {
  course: Course;
  progress?: CourseProgress;
  onClick: () => void;
}

export default function CourseCard({ course, progress, onClick }: CourseCardProps) {
  const completedGames = progress?.completedGames.length || 0;
  const totalGames = course.games.length;
  const progressPercentage = totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0;
  const isCompleted = completedGames === totalGames;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };
  
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-teal-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                {course.title}
              </h3>
              {isCompleted && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {course.description}
            </p>
            
            <div className="flex items-center space-x-4 text-xs">
              <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </span>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{course.estimatedTime}min</span>
              </div>
              <div className="flex items-center space-x-1 text-orange-600">
                <Zap className="h-3 w-3" />
                <span>{course.totalXP} XP</span>
              </div>
            </div>
          </div>
          
          <button className="ml-4 w-12 h-12 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center text-white transition-colors group-hover:scale-110 transform duration-200">
            <Play className="h-5 w-5 ml-0.5" />
          </button>
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{completedGames} of {totalGames} lessons completed</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Stars Rating */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.0)</span>
          </div>
          
          <div className="text-xs text-gray-500">
            {totalGames} lessons
          </div>
        </div>
      </div>
    </div>
  );
}