require("dotenv").config();
const connectDB = require("../config/db");
const seedMovies = require("./seedMovies");

const runSeed = async () => {
  try {
    await connectDB();
    await seedMovies();
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

runSeed();
