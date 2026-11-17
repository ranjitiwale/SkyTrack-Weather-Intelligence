
import {
  getCurrentWeather,
  getWeatherForecast,
} from "../services/weatherService.js";

export async function currentWeather(req, res, next) {
  try {
    const city = req.query.city?.trim();

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "Please provide a city name",
      });
    }

    const weather = await getCurrentWeather(city);

    res.status(200).json({
      success: true,
      data: weather,
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "City not found. Please try another city.",
      });
    }

    next(error);
  }
}

export async function weatherForecast(req, res, next) {
  try {
    const city = req.query.city?.trim();

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "Please provide a city name",
      });
    }

    const forecast = await getWeatherForecast(city);

    res.status(200).json({
      success: true,
      data: forecast,
    });

  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "City not found. Please try another city.",
      });
    }

    next(error);
  }
}
