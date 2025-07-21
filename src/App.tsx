import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import CourseGeneration from './pages/CourseGeneration';
import QuizGame from './components/Game/QuizGame';
import Login from './pages/Login';
import FolderPage from './pages/FolderPage'; // ✅ renders games from backend

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageData, setPageData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

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
              game={{
                id: 'mock',
                folderId: 'mock_folder',
                createdBy: 'mock_user',
                createdAt: new Date().toISOString(),
                order: 1,
                question: 'What is the capital of France?',
                options: ['Paris', 'London', 'Rome', 'Berlin'],
                correctAnswer: 'Paris',
                explanation: 'Paris is the capital of France.',
              }}
              onComplete={(correct) => {
                console.log('Quiz completed:', correct);
                setTimeout(() => {
                  handleNavigation('dashboard');
                }, 1000);
              }}
            />
          </div>
        );
      case 'folder':
        return <FolderPage folderId={pageData?.id} />;
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

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="flex-1 min-h-screen">{renderCurrentPage()}</main>
      </div>
    </div>
  );
}

export default App;
