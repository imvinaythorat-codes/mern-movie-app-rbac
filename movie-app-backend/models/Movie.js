const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    releaseDate: {
      type: Date,
    },
    duration: {
      type: Number, // minutes
    },
    poster: {
      type: String, // URL to poster image
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
