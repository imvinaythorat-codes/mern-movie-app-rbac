import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { user, logout } = useAuth();

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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'primary.main',
            fontWeight: 900,
            letterSpacing: '0.1em',
            marginBottom: 2,
            textShadow: '0px 4px 12px rgba(229, 9, 20, 0.5)',
          }}
        >
          CINEVAULT
        </Typography>
      </motion.div>

      <Typography
        variant="h5"
        sx={{
          color: 'text.secondary',
          fontWeight: 300,
          marginBottom: 4,
        }}
      >
        Welcome, {user?.name || 'Guest'}!
      </Typography>

      <Box
        sx={{
          padding: 3,
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: 2,
          backgroundColor: 'background.paper',
          minWidth: 300,
          mb: 3,
        }}
      >
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
          📧 Email: {user?.email}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
          👤 Role: {user?.role}
        </Typography>
        <Typography variant="body1" sx={{ color: 'success.main' }}>
          ✅ Status: Logged In
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={logout}
        sx={{ paddingX: 4, paddingY: 1.5 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default HomePage;