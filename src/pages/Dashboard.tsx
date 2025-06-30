import React from 'react';
import { Zap, BookOpen, Trophy, TrendingUp, Plus, Clock } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import FolderCard from '../components/Course/FolderCard';
import CourseCard from '../components/Course/CourseCard';
import { mockFolders, mockCourses, mockUser } from '../data/mockData';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const recentCourses = mockCourses.slice(0, 3);
  
  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name}!</h1>
            <p className="text-teal-100 text-lg">Ready to continue your learning journey?</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>{mockUser.streak} day streak</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>{mockUser.totalXP} XP</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total XP"
          value={mockUser.totalXP}
          icon={Zap}
          color="from-orange-500 to-red-500"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Courses Completed"
          value={5}
          icon={BookOpen}
          color="from-teal-500 to-cyan-500"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Current Streak"
          value={`${mockUser.streak} days`}
          icon={Trophy}
          color="from-amber-500 to-yellow-500"
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="This Week"
          value="4.2h"
          icon={Clock}
          color="from-blue-500 to-cyan-500"
          trend={{ value: 8, isPositive: true }}
        />
      </div>
      
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => onNavigate('generate')}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Generate New Course</span>
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors">
          <TrendingUp className="h-5 w-5" />
          <span>View Progress</span>
        </button>
      </div>
      
      {/* Course Folders */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Learning Paths</h2>
          <button className="text-teal-600 hover:text-teal-700 font-medium">
            View all
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFolders.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              courseCount={folder.courseIds.length}
              progress={0.65}
              onClick={() => onNavigate('folder', folder)}
            />
          ))}
        </div>
      </div>
      
      {/* Recent Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
          <button
            onClick={() => onNavigate('courses')}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            View all courses
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={mockUser.progress[course.id]}
              onClick={() => onNavigate('course', course)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}