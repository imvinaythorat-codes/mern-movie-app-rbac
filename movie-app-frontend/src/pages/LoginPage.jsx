import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #141414 0%, #2F2F2F 100%)',
        padding: 3,
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
