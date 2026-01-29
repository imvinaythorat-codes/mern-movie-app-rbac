import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  console.log('ProtectedRoute: Checking auth', { isAuthenticated: isAuthenticated(), loading }); // Debug log

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated()) {
    console.log('ProtectedRoute: Not authenticated, redirecting to login'); // Debug log
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute: Authenticated, rendering children'); // Debug log
  // If authenticated, render the child component
  return children;
};

export default ProtectedRoute;