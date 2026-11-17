
import axios from "axios";

// Reusable API connection for local and production
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
  timeout: 30000,
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
