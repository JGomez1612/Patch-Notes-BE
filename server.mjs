// Imports
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.mjs";
import { globalErr, log } from "./middleware/middleware.mjs";
import userRoutes from './routes/userRoutes.mjs';

// Setup
dotenv.config();
const PORT = process.env.PORT || 3001
const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(log);

// Routes
app.use('/api/user', userRoutes);

// Global Error Handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`);
});