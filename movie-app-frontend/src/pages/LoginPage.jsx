import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
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
          LOGIN
        </Typography>
      </motion.div>

      <Typography
        variant="h6"
        sx={{
          color: 'text.secondary',
          mb: 4,
        }}
      >
        Login form will be here (Step 7)
      </Typography>

      <Button
        variant="outlined"
        onClick={() => navigate('/register')}
        sx={{ paddingX: 4, paddingY: 1.5 }}
      >
        Go to Register
      </Button>
    </Box>
  );
};

export default LoginPage;
