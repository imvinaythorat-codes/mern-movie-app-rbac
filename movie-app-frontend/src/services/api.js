import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '@/utils/constants';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor: Add JWT token to every request
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    // If token exists, add to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => {
    // If response is successful, just return data
    return response;
  },
  (error) => {
    // Handle different error scenarios
    
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          // Clear storage and redirect to login
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          
          // Only redirect if not already on login page
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // Forbidden - user doesn't have permission
          console.error('Access denied. You do not have permission.');
          break;
          
        case 404:
          // Not found
          console.error('Resource not found.');
          break;
          
        case 500:
          // Server error
          console.error('Server error. Please try again later.');
          break;
          
        default:
          console.error('An error occurred:', data.message || 'Unknown error');
      }
      
      return Promise.reject(error);
    } else if (error.request) {
      // Request was made but no response received (network error)
      console.error('Network error. Please check your connection.');
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export default api;