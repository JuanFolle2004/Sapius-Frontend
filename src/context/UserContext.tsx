// src/context/UserContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { setAuthToken } from '../services/api'; // ✅ import this

interface UserContextType {
  token: string;
  setToken: (token: string) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // ✅ Apply token to Axios whenever it changes
  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
