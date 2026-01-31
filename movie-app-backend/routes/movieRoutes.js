const express = require("express");
const Movie = require("../models/Movie");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// ==========================================
// IMPORTANT: Specific routes MUST come BEFORE generic /:id route
// Otherwise Express treats "search" and "sorted" as IDs
// ==========================================

// SEARCH movies (must be before /:id)
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
});

// SORT movies (must be before /:id)
router.get("/sorted", async (req, res) => {
  try {
    const { by, order } = req.query;

    const allowedFields = ["title", "rating", "releaseDate", "duration"];
    if (!allowedFields.includes(by)) {
      return res.status(400).json({ message: "Invalid sort field" });
    }

    const sortOrder = order === "desc" ? -1 : 1;

    const movies = await Movie.find().sort({ [by]: sortOrder });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Sorting failed" });
  }
});

// GET all movies (public)
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

// GET single movie by ID (public) - MUST be after /search and /sorted
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movie" });
  }
});

// POST add new movie (Admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: "Failed to add movie", error: error.message });
  }
});

// PUT update movie (Admin only)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated doc and run validation
    );
    
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: "Failed to update movie", error: error.message });
  }
});

// DELETE movie (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    
    res.json({ message: "Movie deleted successfully", movie: deletedMovie });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete movie", error: error.message });
  }
});

module.exports = router;
