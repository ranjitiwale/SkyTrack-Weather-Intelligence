
export function getWeatherRecommendations(weather) {
  if (!weather) return [];

  const recommendations = [];

  const temperature = weather.temperature;
  const humidity = weather.humidity;
  const windSpeed = weather.windSpeed;
  const visibility = weather.visibility;
  const condition = weather.condition?.toLowerCase();

  // Rain recommendations
  if (["rain", "drizzle", "thunderstorm"].includes(condition)) {
    recommendations.push({
      title: "Rain Alert",
      message: "Carry an umbrella or raincoat before going outside.",
      type: "warning",
    });
  }

  // High temperature
  if (temperature >= 35) {
    recommendations.push({
      title: "High Temperature",
      message: "Stay hydrated and avoid prolonged exposure to direct sunlight.",
      type: "warning",
    });
  }

  // Low temperature
  if (temperature <= 10) {
    recommendations.push({
      title: "Cold Weather",
      message: "Consider wearing warm clothing when going outside.",
      type: "info",
    });
  }

  // High humidity
  if (humidity >= 80) {
    recommendations.push({
      title: "High Humidity",
      message: "Outdoor activities may feel more uncomfortable. Stay hydrated.",
      type: "info",
    });
  }

  // Strong wind
  if (windSpeed >= 10) {
    recommendations.push({
      title: "Strong Wind",
      message: "Be cautious around trees and temporary outdoor structures.",
      type: "warning",
    });
  }

  // Low visibility
  if (visibility < 1) {
    recommendations.push({
      title: "Very Low Visibility",
      message: "Avoid unnecessary travel and use extra caution on roads.",
      type: "warning",
    });
  } else if (visibility < 3) {
    recommendations.push({
      title: "Reduced Visibility",
      message: "Drive carefully and maintain a safe distance from other vehicles.",
      type: "info",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: "Weather Looks Comfortable",
      message: "No major recommendation triggers detected from current weather data.",
      type: "success",
    });
  }

  return recommendations;
}
