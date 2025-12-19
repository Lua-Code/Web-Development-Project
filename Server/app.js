// app.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";  

import routes from "./routes/index.js"; // Mainline routes

const app = express();

// Middleware
app.use(morgan("dev"));      
app.use(cors({ origin: true, credentials: true }));          
app.use(express.json());    
app.use(session({
  secret: "meowSecret", 
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 hour session meow meow
}));

//added///////////////////
// Buyer app currently calls GET /products
// Redirect it to the real route: GET /api/listings
app.get("/products", (req, res) => {
  res.redirect(307, "/api/listings");
});

////////

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
