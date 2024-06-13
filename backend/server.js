import express from "express";
import { userRoutes } from "./routes/userRoutes.js";
import { ticketRoutes } from "./routes/ticketRoutes.js";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

// Load environment variables from .env file
configDotenv();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for all origins
app.use(cors());
// Enable CORS middleware
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow requests from localhost:3000
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// Connect to the database
connectDB();

const PORT = process.env.PORT || 8000;

// Mount user routes
app.use("/api/user", userRoutes);
// Mount user routes
app.use("/api/tickets", ticketRoutes);

// Global error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
