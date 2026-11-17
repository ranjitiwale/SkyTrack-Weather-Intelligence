
import axios from "axios";

// Create a reusable API connection
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

// Fetch current weather for a city
export const getCurrentWeather = async (city) => {
  const response = await API.get("/weather/current", {
    params: { city },
  });

  return response.data;
};

// Get 5-Day Weather Forecast
export const getWeatherForecast = async (city) => {
  const response = await API.get("/weather/forecast", {
    params: { city },
  });

  return response.data;
};