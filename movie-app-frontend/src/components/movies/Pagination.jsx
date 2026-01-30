import React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: 1.5, sm: 3 },
        mt: { xs: 4, sm: 6 },
        mb: { xs: 2, sm: 4 },
        flexWrap: 'wrap',
      }}
    >
      {/* Previous Button - Desktop */}
      <Button
        variant="outlined"
        startIcon={<ChevronLeft />}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          paddingX: 3,
          paddingY: 1,
          fontWeight: 600,
        }}
      >
        Previous
      </Button>

      {/* Previous Button - Mobile (Icon only) */}
      <IconButton
        onClick={handlePrevious}
        disabled={currentPage === 1}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          border: '1px solid',
          borderColor: currentPage === 1 ? 'action.disabled' : 'primary.main',
        }}
      >
        <ChevronLeft />
      </IconButton>

      {/* Page Info */}
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.primary', 
          fontWeight: 600,
          fontSize: { xs: '0.875rem', sm: '1rem' },
          minWidth: { xs: 'auto', sm: '120px' },
          textAlign: 'center',
        }}
      >
        Page {currentPage} of {totalPages}
      </Typography>

      {/* Next Button - Desktop */}
      <Button
        variant="outlined"
        endIcon={<ChevronRight />}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          paddingX: 3,
          paddingY: 1,
          fontWeight: 600,
        }}
      >
        Next
      </Button>

      {/* Next Button - Mobile (Icon only) */}
      <IconButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          border: '1px solid',
          borderColor: currentPage === totalPages ? 'action.disabled' : 'primary.main',
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default Pagination;