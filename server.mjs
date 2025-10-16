// Imports
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.mjs";
import { globalErr, log } from "./middleware/middleware.mjs";
import userRoutes from './routes/userRoutes.mjs';
import reviewRoutes from "./routes/reviewRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import cors from 'cors';

// Setup
dotenv.config();
const PORT = process.env.PORT || 3001
const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(log);
app.use(cors());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/auth', authRoutes)


// Global Error Handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`);
});