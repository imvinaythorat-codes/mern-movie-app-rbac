import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CircularProgress
} from "@mui/material";
import { PlayArrow, Info, ChevronLeft, ChevronRight } from "@mui/icons-material";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies`);
      setMovies(response.data);
      if (response.data.length > 0) {
        setFeaturedMovie(response.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { title: "Trending Now", movies: movies.slice(0, 6) },
    { title: "New Releases", movies: movies.slice(6, 12) },
    { title: "Action Movies", movies: movies.slice(12, 18) },
    { title: "Comedy Movies", movies: movies.slice(18, 24) },
  ].filter(category => category.movies.length > 0);

  const MovieCarousel = ({ title, movies }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollLeft = () => {
      setScrollPosition(Math.max(0, scrollPosition - 1));
    };

    const scrollRight = () => {
      setScrollPosition(Math.min(movies.length - 4, scrollPosition + 1));
    };

    return (
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          {title}
        </Typography>
        <Box sx={{ position: "relative" }}>
          {scrollPosition > 0 && (
            <IconButton
              onClick={scrollLeft}
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.7)",
                color: "white",
                zIndex: 2,
                "&:hover": { bgcolor: "rgba(0,0,0,0.9)" }
              }}
            >
              <ChevronLeft />
            </IconButton>
          )}
          
          {scrollPosition < movies.length - 4 && (
            <IconButton
              onClick={scrollRight}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.7)",
                color: "white",
                zIndex: 2,
                "&:hover": { bgcolor: "rgba(0,0,0,0.9)" }
              }}
            >
              <ChevronRight />
            </IconButton>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflow: "hidden",
              transform: `translateX(-${scrollPosition * 25}%)`,
              transition: "transform 0.5s ease"
            }}
          >
            {movies.map((movie, index) => (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{ minWidth: "200px", cursor: "pointer" }}
                onClick={() => navigate(`/movie/${movie._id}`)}
              >
                <Card sx={{ bgcolor: "#333", color: "white" }}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 300,
                      bgcolor: "#555",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundImage: `url(${movie.poster || `https://picsum.photos/seed/${movie._id}/200/300`})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    {!movie.poster && (
                      <Typography variant="body2" sx={{ textAlign: "center", p: 2 }}>
                        {movie.title}
                      </Typography>
                    )}
                  </CardMedia>
                  <CardContent sx={{ p: 1 }}>
                    <Typography variant="body2" noWrap>
                      {movie.title}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      {movie.rating ? `⭐ ${movie.rating}` : "No rating"}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress sx={{ color: "#e50914" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 8 }}>
      {/* Hero Section */}
      <AnimatePresence mode="wait">
        {featuredMovie && (
          <motion.div
            key={featuredMovie._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Box
              sx={{
                height: "80vh",
                position: "relative",
                backgroundImage: `url(${featuredMovie.poster || `https://picsum.photos/seed/${featuredMovie._id}/1920/1080`})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box className="hero-gradient" sx={{ position: "absolute", inset: 0 }} />
              <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, maxWidth: "600px" }}>
                    {featuredMovie.title}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3, maxWidth: "500px", lineHeight: 1.5 }}>
                    {featuredMovie.description || "No description available"}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      onClick={() => navigate(`/movie/${featuredMovie._id}`)}
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
                      startIcon={<Info />}
                      onClick={() => navigate(`/movie/${featuredMovie._id}`)}
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
                      More Info
                    </Button>
                  </Box>
                  {featuredMovie.rating && (
                    <Typography variant="body1" sx={{ fontSize: "18px" }}>
                      ⭐ {featuredMovie.rating} • {featuredMovie.duration && `${featuredMovie.duration} min`}
                    </Typography>
                  )}
                </motion.div>
              </Container>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Movie Categories */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <MovieCarousel title={category.title} movies={category.movies} />
          </motion.div>
        ))}
      </Container>
    </Box>
  );
};

export default Home;
