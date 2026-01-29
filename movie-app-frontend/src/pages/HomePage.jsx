import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Layout from '@/components/common/Layout';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: 'primary.main',
                mb: 2,
                textShadow: '0px 4px 12px rgba(229, 9, 20, 0.5)',
              }}
            >
              Welcome to CineVault
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', mb: 1 }}>
              Hello, {user?.name}!
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Your personal movie collection awaits
            </Typography>
          </Box>

          {/* Placeholder for movie list (Step 9) */}
          <Box
            sx={{
              padding: 4,
              border: '2px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
              backgroundColor: 'background.paper',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
              🎬 Movie List Coming Soon
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              In Step 9, we'll display all movies here with pagination, search, and sort features.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Layout>
  );
};

export default HomePage;