const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    return conn;
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    // Don't exit the process, just log the error
    console.log("Server will continue running without database connection");
  }
};

module.exports = connectDB;
