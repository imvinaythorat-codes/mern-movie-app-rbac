import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  CircularProgress,
  IconButton
} from "@mui/material";
import { ArrowBack, PlayArrow, Add } from "@mui/icons-material";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      setError("Failed to fetch movie details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", pt: 8 }}>
        <CircularProgress sx={{ color: "#e50914" }} />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container maxWidth="lg" sx={{ pt: 8 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" color="error" sx={{ mb: 2 }}>
            {error || "Movie not found"}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ bgcolor: "#e50914", "&:hover": { bgcolor: "#f40612" } }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ pt: 8, minHeight: "100vh", bgcolor: "#141414" }}>
      {/* Hero Background */}
      <Box
        sx={{
          height: "60vh",
          position: "relative",
          backgroundImage: `url(${movie.poster || `https://picsum.photos/seed/${movie._id}/1920/1080`})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #141414 0%, rgba(20, 20, 20, 0.8) 50%, transparent 100%)",
          }}
        />
        
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.8)" },
            zIndex: 2,
          }}
        >
          <ArrowBack />
        </IconButton>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
              {movie.title}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
              {movie.rating && (
                <Typography variant="h6" sx={{ color: "#ffd700" }}>
                  ⭐ {movie.rating}
                </Typography>
              )}
              {movie.duration && (
                <Typography variant="h6">
                  {movie.duration} min
                </Typography>
              )}
              {movie.releaseDate && (
                <Typography variant="h6">
                  {new Date(movie.releaseDate).getFullYear()}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "black",
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.8)" }
                }}
              >
                Play
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                size="large"
                sx={{
                  bgcolor: "rgba(109,109,110,0.7)",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "rgba(109,109,110,0.9)" }
                }}
              >
                My List
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Movie Details */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                Synopsis
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "18px", color: "rgba(255,255,255,0.9)" }}>
                {movie.description || "No description available for this movie."}
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Paper
                elevation={8}
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  p: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Movie Information
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {movie.rating && (
                    <Box>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                        Rating
                      </Typography>
                      <Typography variant="body1">
                        ⭐ {movie.rating}/10
                      </Typography>
                    </Box>
                  )}
                  {movie.duration && (
                    <Box>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                        Duration
                      </Typography>
                      <Typography variant="body1">
                        {movie.duration} minutes
                      </Typography>
                    </Box>
                  )}
                  {movie.releaseDate && (
                    <Box>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                        Release Date
                      </Typography>
                      <Typography variant="body1">
                        {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      Added Date
                    </Typography>
                    <Typography variant="body1">
                      {new Date(movie.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetails;
