const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
