import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import {
  AdminPanelSettings,
  AddCircle,
  Edit,
  Delete,
} from '@mui/icons-material';
import Layout from '@/components/common/Layout';

const AdminDashboard = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <AddCircle sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Add Movies',
      description: 'Add new movies to the database',
      status: 'Coming in Step 11',
    },
    {
      icon: <Edit sx={{ fontSize: 48, color: 'info.main' }} />,
      title: 'Edit Movies',
      description: 'Update existing movie details',
      status: 'Coming in Step 11',
    },
    {
      icon: <Delete sx={{ fontSize: 48, color: 'error.main' }} />,
      title: 'Delete Movies',
      description: 'Remove movies from the database',
      status: 'Coming in Step 11',
    },
  ];

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <AdminPanelSettings sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: 'primary.main',
                mb: 2,
                textShadow: '0px 4px 12px rgba(229, 9, 20, 0.5)',
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Welcome, Admin {user?.name}
            </Typography>
          </Box>

          {/* Feature Cards */}
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    sx={{
                      padding: 4,
                      textAlign: 'center',
                      backgroundColor: 'background.paper',
                      height: '100%',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      {feature.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 600 }}>
                      {feature.status}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;