
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContext } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContext.Provider value={{ token: 'your-jwt-token' }}>
      <App />
    </UserContext.Provider>
  </React.StrictMode>
);
