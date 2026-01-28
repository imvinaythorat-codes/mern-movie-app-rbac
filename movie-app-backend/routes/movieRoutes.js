const express = require("express");
const Movie = require("../models/Movie");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// GET all movies (public)
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

// GET single movie by ID (public)
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

// POST add new movie
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: "Failed to add movie" });
  }
});

// PUT update movie
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: "Failed to update movie" });
  }
});

// DELETE movie
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete movie" });
  }
});

// SEARCH movies
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

// SORT movies
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


module.exports = router;
