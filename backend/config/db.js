// backend/config/db.js

const mongoose = require("mongoose");

// Flag to track the database connection status
let isDatabaseConnected = false;

const URI = process.env.MONGO_URI || "mongodb://localhost:27017/parking"
// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the database
    const connection = await mongoose.connect(URI);

    if (connection) {
      console.log("Database connected successfully");
      isDatabaseConnected = true;
    } else {
      console.log("Database connection failed");
    }
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

// Middleware to check if the database is connected
const checkDatabaseConnection = (req, res, next) => {
  if (!isDatabaseConnected) {
    return res.status(503).send(
      "Service unavailable: Database connection is not established yet. Please try again later."
    );
  }
 
  next();
};
// Check if a collection exists by querying it
const collectionExists = async (collectionName) => {
  try {
    // Use Mongoose to check if the collection exists by querying it
    const count = await mongoose.connection.db.collection(collectionName).countDocuments();
    return count > 0; // If count is greater than 0, the collection exists and has data
  } catch (error) {
    console.error("Error checking collection existence:", error);
    return false; // In case of error, assume the collection does not exist
  }
};

module.exports = {
  connectDB,
  checkDatabaseConnection,
  collectionExists
};
