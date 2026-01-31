import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
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
    } finally {
      setLoading(false);
    }
  };

  // Handle delete click
  const handleDeleteClick = (movie) => {
    console.log("Movie to delete:", movie); // Debug log
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
              sx={{ fontSize: 64, color: "primary.main", mb: 2 }}
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
              Welcome, Admin {user?.name}
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

          {/* Movies Table */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Duration</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Loading movies...
                      </TableCell>
                    </TableRow>
                  ) : movies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No movies found. Add your first movie!
                      </TableCell>
                    </TableRow>
                  ) : (
                    movies.map((movie) => (
                      <TableRow key={movie._id} hover>
                        <TableCell>{movie.title}</TableCell>
                        <TableCell>
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
                            {movie.rating?.toFixed(1) || "N/A"}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {movie.releaseDate
                            ? new Date(movie.releaseDate).getFullYear()
                            : "N/A"}
                        </TableCell>
                        <TableCell>{movie.duration} min</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() =>
                              navigate(`/admin/edit-movie/${movie._id}`)
                            }
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteClick(movie)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
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
              {movieToDelete?.title || movieToDelete?.name || "this movie"}
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
