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

// Search movies by name or description
export const searchMovies = async (query) => {
  try {
    const response = await api.get('/movies/search', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Search failed.';
    throw new Error(message);
  }
};

// Get sorted movies
export const getSortedMovies = async (sortBy = 'name', order = 'asc') => {
  try {
    const response = await api.get('/movies/sorted', {
      params: { by: sortBy, order },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to sort movies.';
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