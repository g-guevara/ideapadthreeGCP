'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '@/lib/types';
import { getCurrentUser, getCurrentUserId, setCurrentUserId, getUserByEmail, saveUser, getUsers } from '@/lib/store';
import { generateId } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user from local storage
    const initAuth = async () => {
      const currentUser = getCurrentUser();
      setUser(currentUser || null);
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = getUserByEmail(email);
    
    if (foundUser && foundUser.password === password) {
      setCurrentUserId(foundUser.id);
      setUser(foundUser);
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if user already exists
    const existingUser = getUserByEmail(email);
    
    if (existingUser) {
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password
    };
    
    saveUser(newUser);
    setCurrentUserId(newUser.id);
    setUser(newUser);
    
    return true;
  };

  const logout = () => {
    setCurrentUserId(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}