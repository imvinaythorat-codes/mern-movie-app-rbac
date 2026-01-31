import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '@/styles/theme';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import AdminRoute from '@/components/common/AdminRoute';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminDashboard from '@/pages/AdminDashboard';
import AddMoviePage from '@/pages/AddMoviePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes (require authentication) */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes (require authentication + admin role) */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            
            {/* Add Movie Route */}
            <Route
              path="/admin/add-movie"
              element={
                <AdminRoute>
                  <AddMoviePage />
                </AdminRoute>
              }
            />

            {/* Fallback - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
