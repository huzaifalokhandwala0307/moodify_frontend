import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/types';
import { login as apiLogin, register as apiRegister } from '@/api/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('moodify_auth_token');
    const storedUser = localStorage.getItem('moodify_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const data = await apiLogin(email, pass);
    const loggedUser = { id: data.user_id, email };
    
    setToken(data.access_token);
    setUser(loggedUser);
    
    localStorage.setItem('moodify_auth_token', data.access_token);
    localStorage.setItem('moodify_user', JSON.stringify(loggedUser));
  };

  const register = async (email: string, pass: string, name?: string) => {
    await apiRegister(email, pass, name);
    // After register, automatically log in
    await login(email, pass);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('moodify_auth_token');
    localStorage.removeItem('moodify_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
