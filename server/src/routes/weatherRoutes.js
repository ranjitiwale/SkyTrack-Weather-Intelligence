import express from "express";

import {
  currentWeather,
  weatherForecast,
} from "../controllers/weatherController.js";

const router = express.Router();

// Current Weather API
router.get("/current", currentWeather);

// 5-Day Forecast API
router.get("/forecast", weatherForecast);

export default router;