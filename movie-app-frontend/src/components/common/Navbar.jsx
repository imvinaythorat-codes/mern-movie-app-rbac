import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Movie as MovieIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  // User menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Handle user menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle user menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name[0].toUpperCase();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'background.default',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'none',
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between', 
          py: { xs: 0.75, sm: 1 }, 
          px: { xs: 1.5, sm: 2, md: 3 },
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            <MovieIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 }, color: 'primary.main' }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: 'primary.main',
                letterSpacing: '0.1em',
                textShadow: '0px 2px 8px rgba(229, 9, 20, 0.5)',
                fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.5rem' },
                display: { xs: 'none', xxs: 'block' },
              }}
            >
              CINEVAULT
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: 'primary.main',
                letterSpacing: '0.1em',
                textShadow: '0px 2px 8px rgba(229, 9, 20, 0.5)',
                fontSize: '1rem',
                display: { xs: 'block', xxs: 'none' },
              }}
            >
              CV
            </Typography>
          </Box>
        </motion.div>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5, md: 2 } }}>
          {/* Home Button - Desktop with text */}
          <Button
            component={Link}
            to="/"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              fontSize: { sm: '0.875rem', md: '1rem' },
              px: { sm: 1.5, md: 2 },
              display: { xs: 'none', sm: 'inline-flex' },
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'transparent',
              },
            }}
          >
            Home
          </Button>

          {/* Home Button - Mobile icon only */}
          <IconButton
            component={Link}
            to="/"
            sx={{
              display: { xs: 'inline-flex', sm: 'none' },
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'transparent',
              },
            }}
          >
            <HomeIcon sx={{ fontSize: 24 }} />
          </IconButton>

          {/* Admin Dashboard Link (Only for admins) */}
          {isAdmin() && (
            <>
              {/* Desktop */}
              <Button
                component={Link}
                to="/admin"
                startIcon={<AdminIcon />}
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  fontSize: { sm: '0.8rem', md: '0.875rem' },
                  px: { sm: 1.5, md: 2 },
                  display: { xs: 'none', sm: 'inline-flex' },
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Admin
              </Button>

              {/* Mobile icon only */}
              <IconButton
                component={Link}
                to="/admin"
                sx={{
                  display: { xs: 'inline-flex', sm: 'none' },
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <AdminIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </>
          )}

          {/* User Menu */}
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              ml: { xs: 0.5, sm: 1 },
              '&:hover': {
                transform: 'scale(1.1)',
              },
              transition: 'transform 0.2s',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 700,
              }}
            >
              {getUserInitials()}
            </Avatar>
          </IconButton>

          {/* User Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: { xs: 200, sm: 240 },
                backgroundColor: 'background.paper',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {/* User Info */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'text.primary',
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                }}
              >
                {user?.name}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  wordBreak: 'break-word',
                }}
              >
                {user?.email}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: isAdmin() ? 'primary.main' : 'success.main',
                  fontWeight: 600,
                  mt: 0.5,
                  display: 'block',
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                }}
              >
                {isAdmin() ? '👑 Admin' : '✓ User'}
              </Typography>
            </Box>

            <Divider />

            {/* Logout Button */}
            <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
              </ListItemIcon>
              <ListItemText>
                <Typography sx={{ color: 'error.main', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Logout
                </Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
