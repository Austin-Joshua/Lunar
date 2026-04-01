import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ADMIN_TOKEN_KEY, ADMIN_USER_KEY } from '@/admin/utils/constants';
import type { AdminUser } from '@/admin/types';

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AdminUser, token: string) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem(ADMIN_USER_KEY);
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);

    if (storedAdmin && token) {
      try {
        const parsed = JSON.parse(storedAdmin);
        // Verify it's an admin user
        if (parsed.role === 'admin' || parsed.role === 'superadmin') {
          setAdmin(parsed);
        } else {
          // Clear invalid admin data
          localStorage.removeItem(ADMIN_USER_KEY);
          localStorage.removeItem(ADMIN_TOKEN_KEY);
        }
      } catch {
        localStorage.removeItem(ADMIN_USER_KEY);
        localStorage.removeItem(ADMIN_TOKEN_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((userData: AdminUser, token: string) => {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(userData));
    setAdmin(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    setAdmin(null);
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
