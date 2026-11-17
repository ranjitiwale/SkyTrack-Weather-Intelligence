import aiRoutes from "./routes/aiRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import weatherRoutes from "./routes/weatherRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000;

// ================================
// MIDDLEWARE
// ================================

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "10kb" }));

// ================================
// HEALTH CHECK API
// ================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkyTrack API is running successfully!",
    application: "SkyTrack",
    status: "healthy",
  });
});

// ================================
// WEATHER API ROUTES
// ================================

app.use("/api/weather", weatherRoutes);

// ================================
// ROOT ROUTE
// ================================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to SkyTrack - Weather Intelligence Platform",
    version: "1.0.0",
  });
});

app.use("/api/ai", aiRoutes);

// ================================
// 404 ERROR HANDLER
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// ================================
// GLOBAL ERROR HANDLER
// ================================


app.use((err, req, res, next) => {
  console.error("SkyTrack API Error:", err.message);

  let statusCode = err.status || 500;
  let message = "Internal server error";

  if (err.response?.status === 401) {
    statusCode = 502;
    message = "External API authentication failed. Please check API credentials.";
  } else if (err.response?.status === 429) {
    statusCode = 503;
    message = "AI or Weather API quota exceeded. Please check provider usage and billing.";
  } else if (err.code === "ECONNABORTED") {
    statusCode = 504;
    message = "External API request timed out. Please try again.";
  } else if (err.message?.includes("OPENAI_API_KEY")) {
    statusCode = 503;
    message = "AI service is not configured.";
  } else if (err.message?.includes("Weather API key")) {
    statusCode = 503;
    message = "Weather service is not configured.";
  } else if (err.response?.data?.error?.message) {
    message = err.response.data.error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
});


// ================================
// START SERVER
// ================================


// Export Express app for Vercel
export default app;

// Start local server during development only
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log("----------------------------------");
    console.log("       SKYTRACK API SERVER");
    console.log("----------------------------------");
    console.log(`Server running: http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log("----------------------------------");
  });
}

