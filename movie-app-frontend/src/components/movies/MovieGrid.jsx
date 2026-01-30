import React from 'react';
import { Grid, Box, Skeleton } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading }) => {
  // Show loading skeletons
  if (loading) {
    return (
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {[...Array(12)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box>
              <Skeleton
                variant="rectangular"
                sx={{ 
                  height: { xs: 300, sm: 350, md: 400, lg: 450 },
                  borderRadius: 1, 
                  mb: 1 
                }}
              />
              <Skeleton variant="text" height={32} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" height={24} width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  // Show movie cards
  return (
    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;