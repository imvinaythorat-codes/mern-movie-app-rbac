import api from './api';

/**
 * Movie Service
 * Handles all movie-related API calls
 */

// Get all movies (with optional pagination)
export const getAllMovies = async (page = 1, limit = 12) => {
  try {
    const response = await api.get('/movies', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch movies.';
    throw new Error(message);
  }
};

// Search movies by name or description - CLIENT-SIDE
export const searchMovies = async (query) => {
  try {
    // Get all movies first
    const response = await api.get('/movies');
    let movies = response.data;
    
    // Handle different response formats
    if (movies.movies && Array.isArray(movies.movies)) {
      movies = movies.movies;
    }
    
    // If no query, return all
    if (!query || query.trim() === '') {
      return movies;
    }
    
    // Search on frontend
    const searchTerm = query.toLowerCase();
    const filtered = movies.filter(movie => {
      const nameMatch = movie.name?.toLowerCase().includes(searchTerm);
      const descMatch = movie.description?.toLowerCase().includes(searchTerm);
      return nameMatch || descMatch;
    });
    
    return filtered;
  } catch (error) {
    const message = error.response?.data?.message || 'Search failed.';
    throw new Error(message);
  }
};

// Get sorted movies - CLIENT-SIDE
export const getSortedMovies = async (sortBy = 'name', order = 'asc') => {
  try {
    // Get all movies first
    const response = await api.get('/movies');
    let movies = response.data;
    
    // Handle different response formats
    if (movies.movies && Array.isArray(movies.movies)) {
      movies = movies.movies;
    }
    
    // Sort on frontend
    const sorted = [...movies].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      // Handle null/undefined values
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      // Handle different data types
      if (sortBy === 'releaseDate') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal ? bVal.toLowerCase() : '';
      }
      
      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    return sorted;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch movies.';
    throw new Error(message);
  }
};

// Get single movie by ID
export const getMovieById = async (id) => {
  try {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Movie not found.';
    throw new Error(message);
  }
};

// Add new movie (Admin only)
export const addMovie = async (movieData) => {
  try {
    const response = await api.post('/movies', movieData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to add movie.';
    throw new Error(message);
  }
};

// Update movie (Admin only)
export const updateMovie = async (id, movieData) => {
  try {
    const response = await api.put(`/movies/${id}`, movieData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update movie.';
    throw new Error(message);
  }
};

// Delete movie (Admin only)
export const deleteMovie = async (id) => {
  try {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to delete movie.';
    throw new Error(message);
  }
};