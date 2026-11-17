
export function generateWeatherAlerts(weather) {
  if (!weather) return [];

  const alerts = [];

  const temperature = Number(weather.temperature);
  const windSpeedKmh = Number(weather.windSpeed) * 3.6;
  const humidity = Number(weather.humidity);
  const condition = String(weather.condition || "").toLowerCase();
  const description = String(weather.description || "").toLowerCase();

  // Extreme Heat Alert
  if (Number.isFinite(temperature) && temperature >= 40) {
    alerts.push({
      id: "extreme-heat",
      title: "Extreme Heat Alert",
      severity: "High",
      message: "Very high temperatures detected. Avoid prolonged outdoor exposure and stay hydrated.",
    });
  }

  // High Temperature Advisory
  else if (Number.isFinite(temperature) && temperature >= 35) {
    alerts.push({
      id: "high-temperature",
      title: "High Temperature Advisory",
      severity: "Moderate",
      message: "High temperatures detected. Take breaks and drink sufficient water.",
    });
  }

  // Thunderstorm Alert
  if (condition.includes("thunderstorm")) {
    alerts.push({
      id: "thunderstorm",
      title: "Thunderstorm Alert",
      severity: "High",
      message: "Thunderstorms detected. Avoid open areas and exposed locations.",
    });
  }

  // Rain Advisory
  else if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    description.includes("rain")
  ) {
    alerts.push({
      id: "rain",
      title: "Rain Advisory",
      severity: "Moderate",
      message: "Rain conditions detected. Carry rain protection and check local updates.",
    });
  }

  // Strong Wind Alert
  if (Number.isFinite(windSpeedKmh) && windSpeedKmh >= 50) {
    alerts.push({
      id: "strong-wind",
      title: "Strong Wind Alert",
      severity: "High",
      message: "Strong winds detected. Be careful around trees and temporary structures.",
    });
  }

  // High Humidity Advisory
  if (
    Number.isFinite(humidity) &&
    humidity >= 85 &&
    Number.isFinite(temperature) &&
    temperature >= 32
  ) {
    alerts.push({
      id: "high-humidity",
      title: "High Humidity Advisory",
      severity: "Moderate",
      message: "High humidity and heat may increase discomfort during outdoor activities.",
    });
  }

  return alerts;
}
