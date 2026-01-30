import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Container, Alert, Grid } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "@/components/common/Layout";
import MovieGrid from "@/components/movies/MovieGrid";
import Pagination from "@/components/movies/Pagination";
import SearchBar from "@/components/movies/SearchBar";
import SortControls from "@/components/movies/SortControls";
import {
  getAllMovies,
  searchMovies,
  getSortedMovies,
} from "@/services/movieService";

const HomePage = () => {
  // State
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  // Search and Sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const moviesPerPage = 12;

  // Fetch movies based on search/sort/pagination
  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchQuery, sortBy, sortOrder]);

  const fetchMovies = async () => {
    setLoading(true);
    setError("");

    try {
      let response;

      // If there's a search query, search movies
      if (searchQuery.trim()) {
        response = await searchMovies(searchQuery);

        // Handle search response (usually returns array directly)
        if (Array.isArray(response)) {
          setMovies(response);
          setTotalMovies(response.length);
          setTotalPages(1); // Search returns all results, no pagination
          setCurrentPage(1);
        } else {
          setError("Unexpected search response format");
        }
      } else {
        // If no search, get sorted movies with pagination
        response = await getSortedMovies(sortBy, sortOrder);

        if (Array.isArray(response)) {
          // Calculate pagination manually
          setTotalMovies(response.length);
          const calculatedTotalPages = Math.ceil(
            response.length / moviesPerPage,
          );
          setTotalPages(calculatedTotalPages);

          // Slice array for current page
          const startIndex = (currentPage - 1) * moviesPerPage;
          const endIndex = startIndex + moviesPerPage;
          setMovies(response.slice(startIndex, endIndex));
        } else if (response.movies) {
          // Backend returns paginated response
          setMovies(response.movies);
          setTotalMovies(response.total || response.movies.length);
          setTotalPages(
            response.totalPages ||
              Math.ceil(
                (response.total || response.movies.length) / moviesPerPage,
              ),
          );
        } else {
          setError("Unexpected response format from server");
        }
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError(err.message || "Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search query change
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Handle sort order toggle
  const handleOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCurrentPage(1); // Reset to first page when changing order
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 3, sm: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "text.primary",
                mb: 1,
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              All Movies
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {loading
                ? "Loading..."
                : `${totalMovies} movies ${searchQuery ? `found for "${searchQuery}"` : "in collection"}`}
            </Typography>
          </Box>

          {/* Search and Sort Controls */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <SearchBar onSearch={handleSearch} />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <SortControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                onOrderChange={handleOrderChange}
              />
            </Grid>
          </Grid>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {/* Movie Grid */}
          <MovieGrid movies={movies} loading={loading} />

          {/* Empty State */}
          {!loading && movies.length === 0 && !error && (
            <Box
              sx={{
                textAlign: "center",
                py: { xs: 6, sm: 8 },
                border: "2px dashed",
                borderColor: "text.secondary",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  mb: 2,
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                {searchQuery
                  ? `No movies found for "${searchQuery}"`
                  : "No movies found"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                {searchQuery
                  ? "Try a different search term"
                  : "The movie collection is empty. Admins can add movies from the Admin Dashboard."}
              </Typography>
            </Box>
          )}

          {/* Pagination - Only show when not searching and have multiple pages */}
          {!loading && !searchQuery && movies.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </motion.div>
      </Container>
    </Layout>
  );
};

export default HomePage;
