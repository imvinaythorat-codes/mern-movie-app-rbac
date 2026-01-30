import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import Layout from '@/components/common/Layout';
import MovieGrid from '@/components/movies/MovieGrid';
import Pagination from '@/components/movies/Pagination';
import { getAllMovies } from '@/services/movieService';

const HomePage = () => {
  // State
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  const moviesPerPage = 12;

  // Fetch movies when component mounts or page changes
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page) => {
    setLoading(true);
    setError('');

    try {
      const response = await getAllMovies(page, moviesPerPage);

      console.log('Movies response:', response); // Debug log

      // Handle different response structures from backend
      if (response.movies) {
        // Backend returns { movies: [...], total, page, totalPages }
        setMovies(response.movies);
        setTotalMovies(response.total || response.movies.length);
        setTotalPages(response.totalPages || Math.ceil((response.total || response.movies.length) / moviesPerPage));
      } else if (Array.isArray(response)) {
        // Backend returns just an array of movies
        setMovies(response);
        setTotalMovies(response.length);
        // Calculate pagination manually
        const calculatedTotalPages = Math.ceil(response.length / moviesPerPage);
        setTotalPages(calculatedTotalPages);
        
        // Slice array for current page
        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        setMovies(response.slice(startIndex, endIndex));
      } else {
        setError('Unexpected response format from server');
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError(err.message || 'Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 3, sm: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: 'text.primary',
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              All Movies
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              {loading ? 'Loading...' : `${totalMovies} movies in collection`}
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {/* Movie Grid */}
          <MovieGrid movies={movies} loading={loading} />

          {/* Empty State */}
          {!loading && movies.length === 0 && !error && (
            <Box
              sx={{
                textAlign: 'center',
                py: { xs: 6, sm: 8 },
                border: '2px dashed',
                borderColor: 'text.secondary',
                borderRadius: 2,
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'text.secondary', 
                  mb: 2,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                No movies found
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                The movie collection is empty. Admins can add movies from the Admin Dashboard.
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          {!loading && movies.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </motion.div>
      </Container>
    </Layout>
  );
};

export default HomePage;