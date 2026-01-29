import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { AdminPanelSettings } from '@mui/icons-material';

const AdminDashboard = () => {
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
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AdminPanelSettings
          sx={{ fontSize: 80, color: 'primary.main', mb: 3 }}
        />
      </motion.div>

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
        ADMIN DASHBOARD
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: 'text.secondary',
          marginBottom: 4,
        }}
      >
        Welcome, Admin {user?.name}!
      </Typography>

      <Box
        sx={{
          padding: 3,
          border: '1px solid',
          borderColor: 'success.main',
          borderRadius: 2,
          backgroundColor: 'background.paper',
          minWidth: 300,
          mb: 3,
        }}
      >
        <Typography variant="body1" sx={{ color: 'success.main', mb: 2 }}>
          ✅ Admin Access Granted
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Admin features will be added in Step 8-10:
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          • Add Movie
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          • Edit Movie
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          • Delete Movie
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

export default AdminDashboard;