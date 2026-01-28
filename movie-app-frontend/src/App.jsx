import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography, Button } from '@mui/material';
import theme from '@/styles/theme';
import { AuthProvider, useAuth } from '@/context/AuthContext';

// Test component to verify AuthContext works
function TestAuth() {
  const { user, isAuthenticated, isAdmin } = useAuth();

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

      {/* Display auth status */}
      <Box
        sx={{
          padding: 3,
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: 2,
          backgroundColor: 'background.paper',
          minWidth: 300,
        }}
      >
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
          Auth Status:
        </Typography>
        
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
          Authenticated: {isAuthenticated() ? '✅ Yes' : '❌ No'}
        </Typography>
        
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
          User: {user ? user.name : 'Not logged in'}
        </Typography>
        
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
          Role: {user ? user.role : 'N/A'}
        </Typography>
        
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
          Is Admin: {isAdmin() ? '✅ Yes' : '❌ No'}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: 'success.main', display: 'block', mt: 2 }}
        >
          ✅ AuthContext Working!
        </Typography>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <TestAuth />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
