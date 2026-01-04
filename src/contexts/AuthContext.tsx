import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // payload may contain more fields; map to User
        const u: User = {
          id: payload.id || payload._id || '',
          username: payload.username || payload.name || '',
          email: payload.email || '',
          position: payload.position || '',
        };
        setUser(u);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
