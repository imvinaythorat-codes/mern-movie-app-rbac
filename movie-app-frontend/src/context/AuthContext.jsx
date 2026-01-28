import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getToken, logout as logoutService } from '@/services/authService';

// Create Context
const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Wraps the app and provides authentication state to all children
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = getToken();
        const currentUser = getCurrentUser();

        // If both token and user exist, user is authenticated
        if (token && currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        logoutService();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login function - updates user state after successful login
   * Called from Login component after authService.login() succeeds
   */
  const login = (userData) => {
    setUser(userData);
  };

  /**
   * Logout function - clears user state and calls logout service
   */
  const logout = () => {
    setUser(null);
    logoutService(); // Clears localStorage and redirects
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    return !!user;
  };

  /**
   * Check if user has admin role
   */
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Context value - all data/functions available to consumers
  const value = {
    user,           // Current logged-in user object
    loading,        // Loading state during initial auth check
    login,          // Function to set user after login
    logout,         // Function to logout user
    isAuthenticated, // Check if user is logged in
    isAdmin,        // Check if user is admin
  };

  // Show loading spinner while checking authentication on mount
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#141414',
          color: '#E50914',
          fontSize: '1.5rem',
        }}
      >
        Loading...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom Hook: useAuth
 * Provides easy access to auth context in any component
 * 
 * Usage:
 * const { user, login, logout, isAdmin } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Throw error if useAuth is used outside AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthContext;
