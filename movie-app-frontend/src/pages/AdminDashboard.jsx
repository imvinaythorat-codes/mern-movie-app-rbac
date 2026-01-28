import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    duration: "",
    releaseDate: ""
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setMovies(response.data);
    } catch (error) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (movie = null) => {
    if (movie) {
      setEditingMovie(movie);
      setFormData({
        title: movie.title,
        description: movie.description || "",
        rating: movie.rating || "",
        duration: movie.duration || "",
        releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : ""
      });
    } else {
      setEditingMovie(null);
      setFormData({
        title: "",
        description: "",
        rating: "",
        duration: "",
        releaseDate: ""
      });
    }
    setOpenDialog(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMovie(null);
    setFormData({
      title: "",
      description: "",
      rating: "",
      duration: "",
      releaseDate: ""
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };

      if (editingMovie) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/movies/${editingMovie._id}`,
          formData,
          config
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/movies`,
          formData,
          config
        );
      }

      fetchMovies();
      handleCloseDialog();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save movie");
    }
  };

  const handleDelete = async (movieId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${import.meta.env.VITE_API_URL}/movies/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchMovies();
      } catch (error) {
        setError("Failed to delete movie");
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", pt: 8 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 12, pb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#e50914" }}>
            Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{
              bgcolor: "#e50914",
              "&:hover": { bgcolor: "#f40612" },
              px: 3,
              py: 1.5
            }}
          >
            Add Movie
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper
          elevation={8}
          sx={{
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            overflow: "hidden"
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "rgba(229, 9, 20, 0.1)" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rating</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Duration</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Release Date</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie, index) => (
                  <motion.tr
                    key={movie._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    component={TableRow}
                    sx={{
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.05)"
                      }
                    }}
                  >
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {movie.title}
                    </TableCell>
                    <TableCell sx={{ color: "rgba(255,255,255,0.8)" }}>
                      {movie.description ? 
                        `${movie.description.substring(0, 100)}${movie.description.length > 100 ? "..." : ""}` : 
                        "No description"
                      }
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {movie.rating ? (
                        <Chip 
                          label={`⭐ ${movie.rating}`} 
                          sx={{ 
                            bgcolor: "rgba(255, 215, 0, 0.2)", 
                            color: "#ffd700",
                            fontWeight: "bold"
                          }} 
                        />
                      ) : (
                        <Chip label="Not Rated" sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }} />
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {movie.duration ? `${movie.duration} min` : "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {movie.releaseDate ? 
                        new Date(movie.releaseDate).toLocaleDateString() : 
                        "N/A"
                      }
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          onClick={() => handleOpenDialog(movie)}
                          sx={{
                            color: "#4caf50",
                            "&:hover": { bgcolor: "rgba(76, 175, 80, 0.1)" }
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(movie._id)}
                          sx={{
                            color: "#f44336",
                            "&:hover": { bgcolor: "rgba(244, 67, 54, 0.1)" }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {movies.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.7)" }}>
                No movies found. Add your first movie!
              </Typography>
            </Box>
          )}
        </Paper>
      </motion.div>

      {/* Add/Edit Movie Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#141414",
            color: "white",
            border: "1px solid rgba(255,255,255,0.1)"
          }
        }}
      >
        <DialogTitle sx={{ color: "#e50914", fontWeight: "bold" }}>
          {editingMovie ? "Edit Movie" : "Add New Movie"}
        </DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e50914",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiInputLabel-focused": {
                  color: "#e50914",
                },
              }}
            />

            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={4}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e50914",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiInputLabel-focused": {
                  color: "#e50914",
                },
              }}
            />

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <TextField
                label="Rating (0-10)"
                type="number"
                inputProps={{ min: 0, max: 10, step: 0.1 }}
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#e50914",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiInputLabel-focused": {
                    color: "#e50914",
                  },
                }}
              />

              <TextField
                label="Duration (minutes)"
                type="number"
                inputProps={{ min: 1 }}
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#e50914",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiInputLabel-focused": {
                    color: "#e50914",
                  },
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="Release Date"
              type="date"
              value={formData.releaseDate}
              onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e50914",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiInputLabel-focused": {
                  color: "#e50914",
                },
              }}
            />
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseDialog} sx={{ color: "rgba(255,255,255,0.7)" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#e50914",
                "&:hover": { bgcolor: "#f40612" }
              }}
            >
              {editingMovie ? "Update" : "Add"} Movie
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
