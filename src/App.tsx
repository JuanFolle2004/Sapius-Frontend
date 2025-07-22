import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import CourseGeneration from './pages/CourseGeneration';
import QuizGame from './components/Game/QuizGame';
import FolderPage from './pages/FolderPage';
import Login from './pages/Login';
import Register from './pages/Register';
import GamePage from './pages/GamePage';


function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Navigation callbacks
  const handleNavigate = (page: string, data?: any) => {
    if (page === 'generate') setActiveTab('generate');
    if (page === 'folder') navigate(`/folders/${data?.id}`);
    else navigate(`/${page}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  // Route protection
  if (!isLoggedIn && location.pathname !== '/register') {
    return (
      <Login
        onLogin={(goTo?: string) => {
          if (goTo === 'register') {
            navigate('/register');
          } else {
            setIsLoggedIn(true);
            navigate('/');
          }
        }}
      />
    );
  }

  if (!isLoggedIn && location.pathname === '/register') {
    return <Register onRegisterSuccess={() => navigate('/login')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="flex-1 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard onNavigate={handleNavigate} />} />
            <Route path="/generate" element={<CourseGeneration onNavigate={handleNavigate} />} />
            <Route path="/quiz-demo" element={
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
                    setTimeout(() => navigate('/'), 1000);
                  }}
                />
              </div>
            } />
            <Route path="/folders/:folderId" element={<FolderPageWrapper />} />
            <Route path="/games/:gameId" element={<GamePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Wrapper to pass folderId from route params to FolderPage
import { useParams } from 'react-router-dom';
function FolderPageWrapper() {
  const { folderId } = useParams();
  return <FolderPage folderId={folderId!} />;
}

export default App;
