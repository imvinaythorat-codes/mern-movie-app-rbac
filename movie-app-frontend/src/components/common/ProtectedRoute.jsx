import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child component
  return children;
};

export default ProtectedRoute;