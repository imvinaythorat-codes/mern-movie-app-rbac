import React from 'react';
import { Box } from '@mui/material';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
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
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;