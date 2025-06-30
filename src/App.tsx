import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import CourseGeneration from './pages/CourseGeneration';
import QuizGame from './components/Game/QuizGame';
import { mockUser, mockCourses } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageData, setPageData] = useState<any>(null);
  
  const handleNavigation = (page: string, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
    if (page === 'generate') {
      setActiveTab('generate');
    }
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(tab);
    setPageData(null);
  };
  
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'generate':
        return <CourseGeneration onNavigate={handleNavigation} />;
      case 'quiz-demo':
        return (
          <div className="p-6">
            <QuizGame
              game={mockCourses[0].games[0]}
              onComplete={(correct) => {
                console.log('Quiz completed:', correct);
                setTimeout(() => {
                  handleNavigation('dashboard');
                }, 1000);
              }}
            />
          </div>
        );
      case 'courses':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">All Courses</h1>
            <div className="text-center py-12">
              <p className="text-gray-600">Courses page coming soon...</p>
              <button
                onClick={() => handleNavigation('dashboard')}
                className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      case 'course-preview':
        return (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Course Preview: {pageData?.topic}
                </h1>
                <div className="space-y-4">
                  <p><strong>Difficulty:</strong> {pageData?.difficulty}</p>
                  <p><strong>Duration:</strong> {pageData?.duration} minutes</p>
                  <p><strong>Focus Area:</strong> {pageData?.focusArea}</p>
                </div>
                <div className="mt-6 space-x-4">
                  <button
                    onClick={() => handleNavigation('quiz-demo')}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    Try Sample Quiz
                  </button>
                  <button
                    onClick={() => handleNavigation('dashboard')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="text-gray-600">This page is under construction</p>
              <button
                onClick={() => handleNavigation('dashboard')}
                className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={mockUser} />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main className="flex-1 min-h-screen">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}

export default App;