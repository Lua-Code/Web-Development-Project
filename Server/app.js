// app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");

const app = express();

// Middleware
app.use(morgan("dev"));      
app.use(cors());             
app.use(express.json());    

// Routes
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

module.exports = app;
