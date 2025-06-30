import React from 'react';
import { ChevronRight, Book, Clock } from 'lucide-react';
import { Folder } from '../../types';

interface FolderCardProps {
  folder: Folder;
  courseCount: number;
  progress: number;
  onClick: () => void;
}

export default function FolderCard({ folder, courseCount, progress, onClick }: FolderCardProps) {
  const progressPercentage = Math.round(progress * 100);
  
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-teal-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className={`h-2 bg-gradient-to-r ${folder.color}`}></div>
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${folder.color} flex items-center justify-center`}>
                <Book className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                  {folder.title}
                </h3>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {folder.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Book className="h-4 w-4" />
                  <span>{courseCount} courses</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>~{courseCount * 15}min</span>
                </div>
              </div>
            </div>
          </div>
          
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-teal-500 transition-colors" />
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${folder.color} transition-all duration-500`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}