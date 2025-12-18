// app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");

// Import routes
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");

const app = express();

// Middleware
app.use(morgan("dev"));      
app.use(cors({ origin: true, credentials: true }));          
app.use(express.json());    
app.use(session({
  secret: "meowSecret", 
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 hour session
}));

//mount Mainline route
app.use("/api", routes); 

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

export default app;
