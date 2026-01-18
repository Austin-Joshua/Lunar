/**
 * Authentication Context
 * Manages user authentication state, token storage, and login/logout
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  AUTH_TOKEN_KEY, 
  USER_DATA_KEY, 
  REMEMBER_ME_KEY, 
  REMEMBER_ME_EMAIL_KEY,
  SESSION_TIMEOUT_KEY,
  SESSION_TIMEOUT_MS 
} from '@/utils/constants';
import type { User } from '@/types';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  rememberMe: boolean;
  login: (user: User, token: string, rememberMe?: boolean) => void;
  logout: () => void;
  setRememberMe: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  // Check if session has expired
  const isSessionValid = useCallback(() => {
    const sessionTimeout = localStorage.getItem(SESSION_TIMEOUT_KEY);
    if (!sessionTimeout) return false;
    
    const expiryTime = parseInt(sessionTimeout, 10);
    return Date.now() < expiryTime;
  }, []);

  useEffect(() => {
    // Check for existing auth on mount
    const storedUser = localStorage.getItem(USER_DATA_KEY);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const isRemembered = localStorage.getItem(REMEMBER_ME_KEY) === 'true';

    // Check session validity
    const sessionValid = isSessionValid();

    if (storedUser && token && sessionValid) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setRememberMe(isRemembered);
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem(USER_DATA_KEY);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(REMEMBER_ME_KEY);
        localStorage.removeItem(SESSION_TIMEOUT_KEY);
      }
    } else if (!sessionValid) {
      // Session expired, clear all auth data
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(SESSION_TIMEOUT_KEY);
    }
    setIsLoading(false);
  }, [isSessionValid]);

  const login = useCallback((userData: User, token: string, rememberMeOption = false) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    
    // Set remember me
    localStorage.setItem(REMEMBER_ME_KEY, rememberMeOption ? 'true' : 'false');
    if (rememberMeOption) {
      localStorage.setItem(REMEMBER_ME_EMAIL_KEY, userData.email);
    }
    
    // Set session timeout (30 days from now if remember me, else until browser closes)
    if (rememberMeOption) {
      const expiryTime = Date.now() + SESSION_TIMEOUT_MS;
      localStorage.setItem(SESSION_TIMEOUT_KEY, expiryTime.toString());
    } else {
      // Session expires when browser closes (we'll just set a 24-hour timeout)
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
      localStorage.setItem(SESSION_TIMEOUT_KEY, expiryTime.toString());
    }
    
    setUser(userData);
    setRememberMe(rememberMeOption);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(REMEMBER_ME_KEY);
    localStorage.removeItem(REMEMBER_ME_EMAIL_KEY);
    localStorage.removeItem(SESSION_TIMEOUT_KEY);
    setUser(null);
    setRememberMe(false);
  }, []);

  const isAdmin = user?.role === 'admin' ?? false;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAdmin,
        rememberMe,
        login,
        logout,
        setRememberMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
