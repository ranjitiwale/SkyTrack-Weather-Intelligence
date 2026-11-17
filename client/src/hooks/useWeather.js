import { useState } from "react";

import {
  getCurrentWeather,
  getWeatherForecast,
} from "../services/weatherApi";

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [loading, setLoading] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);

  const [error, setError] = useState("");
  const [forecastError, setForecastError] = useState("");

  // Fetch Current Weather
  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getCurrentWeather(city);

     setWeather(response.data);
return response.data;

    } catch (err) {
      setWeather(null);

      setError(
        err.response?.data?.message ||
        "Unable to fetch weather. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // Fetch 5-Day Forecast
  const fetchForecast = async (city) => {
    if (!city.trim()) return;

    try {
      setForecastLoading(true);
      setForecastError("");

      const response = await getWeatherForecast(city);

      setForecast(response.data);

    } catch (err) {
      setForecast(null);

      setForecastError(
        err.response?.data?.message ||
        "Unable to fetch forecast. Please try again."
      );

    } finally {
      setForecastLoading(false);
    }
  };

  return {
    weather,
    forecast,
    loading,
    forecastLoading,
    error,
    forecastError,
    fetchWeather,
    fetchForecast,
  };
};

export default useWeather;