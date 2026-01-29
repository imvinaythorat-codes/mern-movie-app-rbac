import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Lock } from '@mui/icons-material';

/**
 * AdminRoute Component
 * Wraps routes that require admin role
 * First checks authentication, then checks admin role
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but not admin, show access denied page
  if (!isAdmin()) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #141414 0%, #2F2F2F 100%)',
          padding: 3,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Lock sx={{ fontSize: 80, color: 'error.main', mb: 3 }} />
        </motion.div>

        <Typography
          variant="h3"
          sx={{
            color: 'error.main',
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
          }}
        >
          Access Denied
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            mb: 4,
            textAlign: 'center',
            maxWidth: 500,
          }}
        >
          You don't have permission to access this page. This area is restricted to administrators only.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => (window.location.href = '/')}
          sx={{
            paddingX: 4,
            paddingY: 1.5,
          }}
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  // If authenticated and admin, render the child component
  return children;
};

export default AdminRoute;