import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { logger } from "./middleware/logger.js";
import { authenticate } from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Public route
app.get("/", (req, res) => {
  res.send("Welcome to the Product API! Go to /api/products");
});

// Protected routes
app.use("/api/products", authenticate, productRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
