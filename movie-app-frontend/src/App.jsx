import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography } from '@mui/material';
import theme from '@/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        <Typography
          variant="h1"
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
        
        <Typography
          variant="h5"
          sx={{
            color: 'text.secondary',
            fontWeight: 300,
            marginBottom: 4,
          }}
        >
          Your Personal Movie Collection
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            color: 'success.main',
            fontWeight: 500,
            padding: 2,
            border: '1px solid',
            borderColor: 'success.main',
            borderRadius: 1,
          }}
        >
          ✅ Netflix Theme Configured Successfully
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
