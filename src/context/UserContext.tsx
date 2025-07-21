// context/UserContext.tsx
import { createContext, useContext } from 'react';

export const UserContext = createContext<{ token: string } | null>(null);

export const useUser = () => useContext(UserContext);
