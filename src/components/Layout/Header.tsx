import React from 'react';
import { Search, Bell, User, Zap, Trophy, GraduationCap } from 'lucide-react';

interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
    xp: number;
    streak: number;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/Logo.png" 
                alt="Sapius" 
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                Sapius
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses or topics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1 bg-orange-50 px-3 py-1 rounded-full">
                    <Zap className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold text-orange-700">{user.xp}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-red-50 px-3 py-1 rounded-full">
                    <Trophy className="h-4 w-4 text-red-500" />
                    <span className="font-semibold text-red-700">{user.streak}</span>
                  </div>
                </div>
              </>
            )}
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
              </div>
              {user && (
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}