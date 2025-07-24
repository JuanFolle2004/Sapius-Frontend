import React from 'react';
import { Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  user?: {
    email?: string;
    name?: string;
    lastName?: string;
    sub?: string;
  };
  onLogout: () => void;
}


export default function Header({ user, onLogout }: HeaderProps) {
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

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search folders or topics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
                {(user?.name || user?.lastName) && (
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name} {user?.lastName}
                  </span>
                )}
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="ml-4 text-sm text-teal-600 hover:text-teal-800 font-semibold"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
