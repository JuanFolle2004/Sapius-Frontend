import React, { useState } from 'react'
import { Sparkles, BookOpen, Clock, Zap, ArrowRight, Brain, Target, Users } from 'lucide-react';

interface CourseGenerationProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function CourseGeneration({ onNavigate }: CourseGenerationProps) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');
  const [duration, setDuration] = useState('15');
  const [focusArea, setFocusArea] = useState('general');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const suggestedTopics = [
    'Machine Learning Basics',
    'Ancient History',
    'Photography Fundamentals',
    'Cooking Techniques',
    'Financial Literacy',
    'Web Development',
    'Psychology Principles',
    'Climate Science'
  ];
  
  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      // Navigate to generated course preview
      onNavigate('course-preview', {
        topic,
        difficulty,
        duration,
        focusArea
      });
    }, 3000);
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Custom Course</h1>
        <p className="text-gray-600 text-lg">Create personalized learning experiences with AI</p>
      </div>
      
      {/* Generation Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="space-y-6">
          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to learn?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter any topic you're curious about..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            
            {/* Suggested Topics */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-2">Popular topics:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics.map((suggestedTopic) => (
                  <button
                    key={suggestedTopic}
                    onClick={() => setTopic(suggestedTopic)}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-teal-100 text-gray-700 hover:text-teal-700 rounded-full transition-colors"
                  >
                    {suggestedTopic}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Configuration Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            
            {/* Focus Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Area
              </label>
              <select
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="general">General Overview</option>
                <option value="practical">Practical Skills</option>
                <option value="theoretical">Theory & Concepts</option>
                <option value="historical">Historical Context</option>
              </select>
            </div>
          </div>
          
          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating your course...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Generate Course</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Content</h3>
          <p className="text-sm text-gray-600">
            Advanced AI creates personalized lessons tailored to your learning style and goals
          </p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Adaptive Learning</h3>
          <p className="text-sm text-gray-600">
            Courses adjust difficulty and pacing based on your progress and understanding
          </p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Expert Verified</h3>
          <p className="text-sm text-gray-600">
            All generated content is verified by subject matter experts for accuracy
          </p>
        </div>
      </div>
      
      {/* Loading State */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Creating Your Course</h3>
            <p className="text-gray-600 mb-4">Our AI is crafting personalized lessons just for you...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-teal-500 h-2 rounded-full transition-all duration-1000 animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}