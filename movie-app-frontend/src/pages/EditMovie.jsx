import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, ArrowBack, Save } from "@mui/icons-material";
import Layout from "@/components/common/Layout";
import { getMovieById, updateMovie } from "@/services/movieService";

const EditMovie = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch movie data on mount
  useEffect(() => {
    if (id) {
      fetchMovie();
    }
  }, [id]);

  const fetchMovie = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Fetching movie with ID:", id);
      const movie = await getMovieById(id);
      console.log("Fetched movie data:", movie);
      
      // Format date for input field (YYYY-MM-DD)
      const formattedDate = movie.releaseDate
        ? new Date(movie.releaseDate).toISOString().split("T")[0]
        : "";

      setFormData({
        title: movie.title || "",
        description: movie.description || "",
        rating: movie.rating !== undefined ? movie.rating : "",
        releaseDate: formattedDate,
        duration: movie.duration !== undefined ? movie.duration : "",
        poster: movie.poster || "",
      });
    } catch (err) {
      console.error("Error fetching movie:", err);
      setError(err.message || "Failed to load movie details");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  // Validate form
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Movie title is required");
      return false;
    }

    if (formData.rating !== "" && (formData.rating < 0 || formData.rating > 10)) {
      setError("Rating must be between 0 and 10");
      return false;
    }

    if (formData.duration !== "" && formData.duration < 0) {
      setError("Duration must be a positive number");
      return false;
    }

    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // Prepare data for submission
      const movieData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        rating: formData.rating !== "" ? parseFloat(formData.rating) : undefined,
        releaseDate: formData.releaseDate || undefined,
        duration: formData.duration !== "" ? parseInt(formData.duration) : undefined,
        poster: formData.poster.trim() || undefined,
      };

      // Remove undefined values
      Object.keys(movieData).forEach(
        (key) => movieData[key] === undefined && delete movieData[key]
      );

      console.log("Updating movie with data:", movieData);
      await updateMovie(id, movieData);
      setSuccess("Movie updated successfully!");
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Error updating movie:", err);
      setError(err.message || "Failed to update movie");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 3, color: "text.secondary" }}>
            Loading movie details...
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/admin/dashboard")}
              sx={{ mb: 2 }}
            >
              Back to Dashboard
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Edit sx={{ fontSize: 40, color: "primary.main" }} />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: "primary.main",
                  fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                }}
              >
                Edit Movie
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Update the movie details below
            </Typography>
          </Box>

          {/* Alerts */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          {/* Form */}
          <Paper sx={{ p: { xs: 3, sm: 4 } }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Title */}
                <TextField
                  fullWidth
                  required
                  label="Movie Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Enter movie title"
                />

                {/* Description */}
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Enter movie description"
                />

                {/* Rating and Duration Row */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexDirection: { xs: 'column', sm: 'row' } 
                }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    disabled={submitting}
                    placeholder="0.0 - 10.0"
                    inputProps={{
                      min: 0,
                      max: 10,
                      step: 0.1,
                    }}
                  />

                  <TextField
                    fullWidth
                    type="number"
                    label="Duration (minutes)"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    disabled={submitting}
                    placeholder="e.g., 120"
                    inputProps={{
                      min: 0,
                    }}
                  />
                </Box>

                {/* Release Date and Poster URL Row */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexDirection: { xs: 'column', sm: 'row' } 
                }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Release Date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    disabled={submitting}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <TextField
                    fullWidth
                    type="url"
                    label="Poster URL"
                    name="poster"
                    value={formData.poster}
                    onChange={handleChange}
                    disabled={submitting}
                    placeholder="https://example.com/poster.jpg"
                  />
                </Box>

                {/* Poster Preview */}
                {formData.poster && (
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: "text.secondary" }}
                    >
                      Poster Preview
                    </Typography>
                    <Box
                      component="img"
                      src={formData.poster}
                      alt="Poster preview"
                      sx={{
                        maxWidth: 200,
                        maxHeight: 300,
                        objectFit: "cover",
                        borderRadius: 2,
                        boxShadow: 3,
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </Box>
                )}

                {/* Submit Buttons */}
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
                    onClick={() => navigate("/admin/dashboard")}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    startIcon={submitting ? <CircularProgress size={20} /> : <Save />}
                    sx={{ px: 4 }}
                  >
                    {submitting ? "Updating..." : "Update Movie"}
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Layout>
  );
};

export default EditMovie;