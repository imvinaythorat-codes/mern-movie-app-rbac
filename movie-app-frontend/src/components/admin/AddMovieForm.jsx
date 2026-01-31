import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import { addMovie } from "@/services/movieService";

const AddMovieForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    poster: "",
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  // Validate form
  const validateForm = () => {
    if (!formData.title.trim()) return "Movie title is required"; // ← Changed 'name' to 'title'
    if (!formData.description.trim()) return "Description is required";
    if (!formData.rating || formData.rating < 0 || formData.rating > 10) {
      return "Rating must be between 0 and 10";
    }
    if (!formData.releaseDate) return "Release date is required";
    if (!formData.duration || formData.duration < 1) {
      return "Duration must be at least 1 minute";
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Prepare data - match backend schema exactly
      const movieData = {
        title: formData.title.trim(), // ← Changed from 'name' to 'title'
        description: formData.description.trim(),
        rating: parseFloat(formData.rating),
        duration: parseInt(formData.duration),
        releaseDate: formData.releaseDate,
        ...(formData.poster.trim() && { poster: formData.poster.trim() }),
      };

      console.log("Sending movie data:", movieData); // Debug log

      // Call API
      const response = await addMovie(movieData);

      console.log("Add movie response:", response); // Debug log

      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (err) {
      console.error("Error adding movie:", err);
      console.error("Error response:", err.response?.data); // Show backend error

      // Display backend error message if available
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to add movie. Please try again.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        sx={{
          padding: { xs: 3, sm: 4 },
          maxWidth: 800,
          margin: "0 auto",
          backgroundColor: "background.paper",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Add New Movie
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
          Fill in the details below to add a movie to the collection
        </Typography>

        {/* Success Alert */}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Movie added successfully! Redirecting...
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Movie Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Movie Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={loading || success}
                placeholder="e.g., The Shawshank Redemption"
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={loading || success}
                placeholder="Brief synopsis of the movie..."
              />
            </Grid>

            {/* Rating */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                disabled={loading || success}
                inputProps={{ min: 0, max: 10, step: 0.1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">/10</InputAdornment>
                  ),
                }}
                placeholder="e.g., 8.5"
              />
            </Grid>

            {/* Duration */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                disabled={loading || success}
                inputProps={{ min: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">min</InputAdornment>
                  ),
                }}
                placeholder="e.g., 142"
              />
            </Grid>

            {/* Release Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Release Date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                disabled={loading || success}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Poster URL */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Poster URL (Optional)"
                name="poster"
                value={formData.poster}
                onChange={handleChange}
                disabled={loading || success}
                placeholder="https://example.com/poster.jpg"
              />
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={loading || success}
                  sx={{ px: 3 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={loading || success}
                  sx={{ px: 3 }}
                >
                  {loading ? "Adding..." : "Add Movie"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default AddMovieForm;
