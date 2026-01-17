/**
 * Protected Route Component
 * Ensures only authenticated users can access protected routes
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageLoader } from './Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

/**
 * ProtectedRoute Component
 * 
 * Features:
 * - Redirects unauthenticated users to /login
 * - Optionally restricts to admin users only
 * - Preserves intended location for redirect after login
 * - Shows loading state while auth status is being determined
 * 
 * Usage:
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 * 
 * Admin-only route:
 * <ProtectedRoute adminOnly>
 *   <AdminPanel />
 * </ProtectedRoute>
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return <PageLoader />;
  }

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Redirect to shop home if admin-only route and user is not admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/shop" replace />;
  }

  return <>{children}</>;
};
