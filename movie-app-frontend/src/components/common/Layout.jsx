import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';

/**
 * Layout Component
 * Wraps pages with Navbar and provides consistent spacing
 */
const Layout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;