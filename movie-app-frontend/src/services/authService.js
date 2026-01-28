import api from './api';
import { STORAGE_KEYS } from '@/utils/constants';

/**
 * Authentication Service
 * Handles login, register, logout, and token management
 */

// Login user
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    // Extract token and user from response
    const { token, user } = response.data;
    
    // Store in localStorage for persistence
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    
    return response.data;
  } catch (error) {
    // Extract error message from backend response
    const message = error.response?.data?.message || 'Login failed. Please try again.';
    throw new Error(message);
  }
};

// Register new user
export const register = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    
    // Backend returns token and user on successful registration
    const { token, user } = response.data;
    
    // Store in localStorage
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed. Please try again.';
    throw new Error(message);
  }
};

// Logout user
export const logout = () => {
  // Clear localStorage
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  
  // Redirect to login page
  window.location.href = '/login';
};

// Get current user from localStorage
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Get current token
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  const user = getCurrentUser();
  return !!(token && user);
};

// Check if user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};