require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");


const movieRoutes = require("./routes/movieRoutes");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);


// test route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
