import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Current Weather
export async function getCurrentWeather(city) {
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!API_KEY) {
    throw new Error("Weather API key is not configured");
  }

  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
    timeout: 10000,
  });

  const data = response.data;

  return {
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    condition: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    visibility: data.visibility / 1000,
    icon: data.weather[0].icon,
  };
}

// 5-Day Weather Forecast
export async function getWeatherForecast(city) {
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!API_KEY) {
    throw new Error("Weather API key is not configured");
  }

  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
    timeout: 10000,
  });

  const data = response.data;

  return {
    city: data.city.name,
    country: data.city.country,
    timezone: data.city.timezone,
    forecast: data.list.map((item) => ({
      dateTime: item.dt_txt,
      temperature: item.main.temp,
      minTemperature: item.main.temp_min,
      maxTemperature: item.main.temp_max,
      condition: item.weather[0].main,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
    })),
  };
}