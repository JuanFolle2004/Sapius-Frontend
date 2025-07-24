// src/App.tsx
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import CourseGeneration from './pages/CourseGeneration';
import QuizGame from './components/Game/QuizGame';
import FolderPage from './pages/FolderPage';
import Login from './pages/Login';
import Register from './pages/Register';
import GamePage from './pages/GamePage';
import { setAuthToken } from './services/api'; // ✅ NEW: import this

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setAuthToken(''); // ✅ Clear from axios too
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setAuthToken(token); // ✅ Apply token globally to axios
    }
  }, []);

  const handleNavigate = (page: string, data?: any) => {
    if (page === 'generate') setActiveTab('generate');
    if (page === 'folder') navigate(`/folders/${data?.id}`);
    else navigate(`/${page}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'dashboard') navigate('/');
    else navigate(`/${tab}`);
  };

  // 🔐 Route protection
  if (!isLoggedIn && location.pathname !== '/register') {
    return (
      <Login
        onLogin={(goTo?: string) => {
          if (goTo === 'register') navigate('/register');
          else {
            const token = localStorage.getItem('token');
            if (token) setAuthToken(token); // ✅ apply after login
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
            <Route
              path="/quiz-demo"
              element={
                <div className="p-6">
                  <QuizGame
                    game={{
                      id: 'mock',
                      folderId: 'mock_folder',
                      createdBy: 'mock_user',
                      createdAt: new Date().toISOString(),
                      order: 1,
                      title: 'Geography question',
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
              }
            />
            <Route path="/folders/:folderId" element={<FolderPageWrapper />} />
            <Route path="/games/:gameId" element={<GamePage />} />
            <Route
              path="/login"
              element={
                <Login
                  onLogin={(goTo?: string) => {
                    if (goTo === 'register') navigate('/register');
                    else {
                      const token = localStorage.getItem('token');
                      if (token) setAuthToken(token); // ✅ re-apply
                      setIsLoggedIn(true);
                      navigate('/');
                    }
                  }}
                />
              }
            />
            <Route path="/register" element={<Register onRegisterSuccess={() => navigate('/login')} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Wrapper to extract folderId param
function FolderPageWrapper() {
  const { folderId } = useParams();
  return <FolderPage folderId={folderId!} />;
}

export default App;



