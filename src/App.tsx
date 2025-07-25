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
import { setAuthToken } from './services/api';
import { decodeToken } from './utils/jwt';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 🆕
  const [userInfo, setUserInfo] = useState<{
    email?: string;
    name?: string;
    lastName?: string;
    sub?: string;
  } | undefined>(undefined);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserInfo(undefined);
    setAuthToken('');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      const decoded = decodeToken(token);
      if (decoded) {
        setUserInfo({
          email: decoded.email,
          name: decoded.name,
          lastName: decoded.lastName,
          sub: decoded.sub,
        });
        setIsLoggedIn(true);
      }
    }
    setIsLoading(false); // 🆕 done loading token
  }, []);

  const handleNavigate = (page: string, data?: any) => {
    if (page === 'generate') {
      setActiveTab('generate');
      navigate('/generate');
    } else if (page === 'folder') {
      if (!data?.folder?.id && !data?.id) {
        console.error("❌ No folder ID provided in navigation data:", data);
        alert("Something went wrong. No folder ID to navigate.");
        return;
      }
      const folderId = data?.folder?.id || data?.id;
      navigate(`/folders/${folderId}`);
    } else {
      navigate(`/${page}`);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'dashboard') navigate('/');
    else navigate(`/${tab}`);
  };

  // 🔐 Protected Route Guard
  if (isLoading) return <div>Loading...</div>;

  if (!isLoggedIn && location.pathname !== '/register') {
    return (
      <Login
        onLogin={(goTo?: string) => {
          if (goTo === 'register') navigate('/register');
          else {
            const token = localStorage.getItem('token');
            if (token) {
              setAuthToken(token);
              const decoded = decodeToken(token);
              if (decoded) {
                setUserInfo({
                  email: decoded.email,
                  name: decoded.name,
                  lastName: decoded.lastName,
                  sub: decoded.sub,
                });
              }
            }
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
      <Header onLogout={handleLogout} user={userInfo} />
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
            } />
            <Route path="/folders/:folderId" element={<FolderPageWrapper />} />
            <Route path="/games/:gameId" element={<GamePage />} />
            <Route path="/login" element={
              <Login
                onLogin={(goTo?: string) => {
                  if (goTo === 'register') navigate('/register');
                  else {
                    const token = localStorage.getItem('token');
                    if (token) {
                      setAuthToken(token);
                      const decoded = decodeToken(token);
                      if (decoded) {
                        setUserInfo({
                          email: decoded.email,
                          name: decoded.name,
                          lastName: decoded.lastName,
                          sub: decoded.sub,
                        });
                      }
                    }
                    setIsLoggedIn(true);
                    navigate('/');
                  }
                }}
              />
            } />
            <Route path="/register" element={<Register onRegisterSuccess={() => navigate('/login')} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function FolderPageWrapper() {
  const { folderId } = useParams();
  return <FolderPage folderId={folderId!} />;
}

export default App;
