import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AdminPanelSettings,
  AddCircle,
  Edit,
  Delete,
  Star,
} from "@mui/icons-material";
import Layout from "@/components/common/Layout";
import { getAllMovies, deleteMovie } from "@/services/movieService";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await getAllMovies();
      let moviesData = response;

      if (response.movies && Array.isArray(response.movies)) {
        moviesData = response.movies;
      }

      setMovies(moviesData);
    } catch (err) {
      setError("Failed to load movies");
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete click
  const handleDeleteClick = (movie) => {
    setMovieToDelete(movie);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!movieToDelete) return;

    setDeleteLoading(true);
    try {
      await deleteMovie(movieToDelete._id);
      setMovies(movies.filter((m) => m._id !== movieToDelete._id));
      setDeleteDialogOpen(false);
      setMovieToDelete(null);
    } catch (err) {
      setError(err.message || "Failed to delete movie");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Close delete dialog
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setMovieToDelete(null);
  };

  // Mobile Card View
  const MobileMovieCard = ({ movie }) => (
    <Card sx={{ mb: 2, backgroundColor: 'background.paper' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1, pr: 2 }}>
            {movie.title || "Untitled"}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              color="primary"
              size="small"
              onClick={() => navigate(`/admin/edit-movie/${movie._id}`)}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDeleteClick(movie)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Rating:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 16, color: 'warning.main' }} />
              <Typography variant="body2" fontWeight={600}>
                {movie.rating?.toFixed(1) || "N/A"}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Year:
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Duration:
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {movie.duration ? `${movie.duration} min` : "N/A"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <AdminPanelSettings
              sx={{ fontSize: { xs: 48, md: 64 }, color: "primary.main", mb: 2 }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: "primary.main",
                mb: 2,
                textShadow: "0px 4px 12px rgba(229, 9, 20, 0.5)",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Welcome, Admin {user?.title}
            </Typography>
          </Box>

          {/* Add Movie Button */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddCircle />}
              onClick={() => navigate("/admin/add-movie")}
              sx={{ px: 4, py: 1.5 }}
            >
              Add New Movie
            </Button>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 4 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Loading movies...
              </Typography>
            </Box>
          ) : movies.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No movies found. Add your first movie!
              </Typography>
            </Box>
          ) : isMobile ? (
            /* Mobile Card View */
            <Box>
              {movies.map((movie) => (
                <MobileMovieCard key={movie._id} movie={movie} />
              ))}
            </Box>
          ) : (
            /* Desktop Table View */
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700,
                          width: '35%',
                          minWidth: 200
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700,
                          width: '15%',
                          minWidth: 100
                        }}
                      >
                        Rating
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700,
                          width: '15%',
                          minWidth: 80
                        }}
                      >
                        Year
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700,
                          width: '15%',
                          minWidth: 100
                        }}
                      >
                        Duration
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700,
                          width: '20%',
                          minWidth: 120
                        }} 
                        align="center"
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {movies.map((movie) => (
                      <TableRow key={movie._id} hover>
                        <TableCell
                          sx={{
                            width: '35%',
                            minWidth: 200,
                            maxWidth: 400,
                            overflow: 'visible',
                            whiteSpace: 'normal',
                            wordBreak: 'break-word'
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {movie.title || "Untitled"}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ width: '15%' }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Star
                              sx={{ fontSize: 16, color: "warning.main" }}
                            />
                            <Typography variant="body2">
                              {movie.rating?.toFixed(1) || "N/A"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ width: '15%' }}>
                          <Typography variant="body2">
                            {movie.releaseDate
                              ? new Date(movie.releaseDate).getFullYear()
                              : "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ width: '15%' }}>
                          <Typography variant="body2">
                            {movie.duration ? `${movie.duration} min` : "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ width: '20%' }}>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() =>
                                navigate(`/admin/edit-movie/${movie._id}`)
                              }
                              title="Edit movie"
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteClick(movie)}
                              title="Delete movie"
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </motion.div>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            backgroundColor: "background.paper",
            padding: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: "text.primary", fontWeight: 700 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            Are you sure you want to delete{" "}
            <Box component="span" sx={{ color: "error.main", fontWeight: 700 }}>
              {movieToDelete?.title || "this movie"}
            </Box>
            ?
            <br />
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                mt: 1,
                display: "block",
              }}
            >
              This action cannot be undone.
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            disabled={deleteLoading}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleteLoading}
            startIcon={deleteLoading ? null : <Delete />}
          >
            {deleteLoading ? "Deleting..." : "Delete Movie"}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default AdminDashboard;
