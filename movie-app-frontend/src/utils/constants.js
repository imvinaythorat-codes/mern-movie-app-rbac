// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Netflix Color Palette
export const COLORS = {
  netflixRed: '#E50914',
  netflixBlack: '#141414',
  netflixDarkGray: '#181818',
  netflixGray: '#2F2F2F',
  netflixLightGray: '#808080',
  netflixWhite: '#FFFFFF',
  
  // Additional colors for states
  success: '#46D369',
  warning: '#F9A825',
  error: '#E50914',
  info: '#00A8E1',
};

// Sort Options
export const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'rating', label: 'Rating' },
  { value: 'releaseDate', label: 'Release Date' },
  { value: 'duration', label: 'Duration' },
];

// Sort Order
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

// Pagination
export const MOVIES_PER_PAGE = 12;

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'authToken',
  USER: 'userData',
};

// Animation Variants (for Framer Motion)
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  },
};