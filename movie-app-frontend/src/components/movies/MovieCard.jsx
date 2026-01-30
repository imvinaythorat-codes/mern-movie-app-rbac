import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import { Star } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(229, 9, 20, 0.4)',
          },
        }}
      >
        {/* Movie Poster - Responsive height */}
        <CardMedia
          component="img"
          sx={{
            height: {
              xs: 300,  // Mobile: 300px
              sm: 350,  // Small tablet: 350px
              md: 400,  // Medium tablet: 400px
              lg: 450,  // Desktop: 450px
            },
            objectFit: 'cover',
            backgroundColor: 'background.default',
          }}
          image={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.name}
        />

        {/* Movie Details */}
        <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 1,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: { xs: '2.5rem', sm: '3rem' },
            }}
          >
            {movie.name}
          </Typography>

          {/* Rating & Year */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: { xs: 16, sm: 18 }, color: 'warning.main' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              •
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
            </Typography>
          </Box>

          {/* Duration */}
          {movie.duration && (
            <Chip
              label={`${movie.duration} min`}
              size="small"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                height: { xs: 20, sm: 24 },
              }}
            />
          )}

          {/* Description (hidden on mobile) */}
          {movie.description && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: { xs: 'none', sm: '-webkit-box' }, // Hide on mobile
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}
            >
              {movie.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MovieCard;