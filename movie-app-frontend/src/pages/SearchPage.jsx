import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { movieAPI } from "../services/api";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await movieAPI.search(searchQuery);
      setSearchResults(response.data);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 12, pb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
          Search Movies
        </Typography>

        <Paper
          elevation={8}
          sx={{
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            p: 4,
            mb: 6,
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSearch}>
            <TextField
              fullWidth
              placeholder="Search for movies by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "rgba(255,255,255,0.7)" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" sx={{ color: "#e50914" }}>
                      <FilterList />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  fontSize: "16px",
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
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              }}
            />
          </form>
        </Paper>

        {loading && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography>Loading...</Typography>
          </Box>
        )}

        {!loading && hasSearched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              {searchResults.length > 0 
                ? `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`
                : "No movies found"
              }
            </Typography>

            {searchResults.length > 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(auto-fill, minmax(200px, 1fr))",
                    sm: "repeat(auto-fill, minmax(250px, 1fr))",
                    md: "repeat(auto-fill, minmax(300px, 1fr))",
                  },
                  gap: 3,
                }}
              >
                {searchResults.map((movie, index) => (
                  <motion.div
                    key={movie._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleMovieClick(movie._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Paper
                      elevation={6}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 2,
                        overflow: "hidden",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          height: 200,
                          bgcolor: "#333",
                          backgroundImage: `url(${movie.poster || `https://picsum.photos/seed/${movie._id}/300/200`})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {!movie.poster && (
                          <Typography variant="body2" sx={{ textAlign: "center", p: 2, color: "white" }}>
                            {movie.title}
                          </Typography>
                        )}
                      </Box>
                      
                      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                          {movie.title}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: "rgba(255,255,255,0.7)", 
                            mb: 2,
                            flexGrow: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {movie.description || "No description available"}
                        </Typography>
                        
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: "auto" }}>
                          {movie.rating && (
                            <Chip 
                              label={`⭐ ${movie.rating}`} 
                              size="small"
                              sx={{ 
                                bgcolor: "rgba(255, 215, 0, 0.2)", 
                                color: "#ffd700",
                                fontWeight: "bold"
                              }} 
                            />
                          )}
                          {movie.duration && (
                            <Chip 
                              label={`${movie.duration} min`} 
                              size="small"
                              sx={{ 
                                bgcolor: "rgba(255,255,255,0.1)", 
                                color: "rgba(255,255,255,0.8)"
                              }} 
                            />
                          )}
                          {movie.releaseDate && (
                            <Chip 
                              label={new Date(movie.releaseDate).getFullYear()} 
                              size="small"
                              sx={{ 
                                bgcolor: "rgba(255,255,255,0.1)", 
                                color: "rgba(255,255,255,0.8)"
                              }} 
                            />
                          )}
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            )}
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default SearchPage;
