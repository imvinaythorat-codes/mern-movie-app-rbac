import { createTheme } from '@mui/material/styles';

// Netflix-inspired dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E50914', // Netflix Red
      light: '#F40612',
      dark: '#B20710',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#564D4D', // Muted gray for secondary actions
      light: '#808080',
      dark: '#2F2F2F',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#141414', // Netflix Black
      paper: '#181818',   // Slightly lighter for cards/modals
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3', // Muted white for less important text
      disabled: '#808080',
    },
    error: {
      main: '#E50914',
    },
    warning: {
      main: '#F9A825',
    },
    info: {
      main: '#00A8E1',
    },
    success: {
      main: '#46D369',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    
    // Netflix uses bold, impactful headings
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    
    // Body text
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    },
    
    // Buttons
    button: {
      textTransform: 'none', // Netflix doesn't use all-caps buttons
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
  
  shape: {
    borderRadius: 4, // Subtle rounded corners (Netflix style)
  },
  
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.5)',
    '0px 4px 8px rgba(0, 0, 0, 0.5)',
    '0px 8px 16px rgba(0, 0, 0, 0.5)',
    '0px 12px 24px rgba(0, 0, 0, 0.5)',
    '0px 16px 32px rgba(0, 0, 0, 0.5)',
    '0px 20px 40px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    // ... (MUI needs 25 shadow levels, simplified for clarity)
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
  ],
  
  components: {
    // Button styles
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 4px 12px rgba(229, 9, 20, 0.4)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(229, 9, 20, 0.4)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #E50914 0%, #B20710 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #F40612 0%, #E50914 100%)',
          },
        },
      },
    },
    
    // Card styles (for movie cards)
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#181818',
          borderRadius: 8,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.7)',
          },
        },
      },
    },
    
    // TextField styles (forms)
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#2F2F2F',
            '& fieldset': {
              borderColor: '#808080',
            },
            '&:hover fieldset': {
              borderColor: '#B3B3B3',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#E50914',
            },
          },
        },
      },
    },
    
    // AppBar (Navbar)
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#141414',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    
    // Paper (modals, dialogs)
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#181818',
        },
      },
    },
  },
});

export default theme;