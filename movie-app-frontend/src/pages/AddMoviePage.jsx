import React from 'react';
import { Container, Box } from '@mui/material';
import Layout from '@/components/common/Layout';
import AddMovieForm from '@/components/admin/AddMovieForm';

const AddMoviePage = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <AddMovieForm />
      </Container>
    </Layout>
  );
};

export default AddMoviePage;