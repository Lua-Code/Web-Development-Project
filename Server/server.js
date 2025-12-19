import app from "./app.js"; // our express app
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 
  'mongodb+srv://kevin_david:russianbias@meowcluster.zlqmwpu.mongodb.net/marketplaceDB?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, (req) => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
