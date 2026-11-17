export function getFarmerAdvice(weather) {
  if (!weather) return [];

  const advice = [];

  const temperature = weather.temperature;
  const humidity = weather.humidity;
  const windSpeed = weather.windSpeed;
  const condition = weather.condition?.toLowerCase();

  // Rain advisory
  if (["rain", "drizzle", "thunderstorm"].includes(condition)) {
    advice.push({
      title: "Rain Advisory",
      message:
        "Check field drainage and avoid unnecessary irrigation during rainfall.",
      type: "warning",
    });
  }

  // High temperature advisory
  if (temperature >= 35) {
    advice.push({
      title: "High Temperature Alert",
      message:
        "Monitor soil moisture and check crops for signs of heat stress.",
      type: "warning",
    });
  }

  // High humidity advisory
  if (humidity >= 80) {
    advice.push({
      title: "Humidity Advisory",
      message:
        "Inspect crops for fungal symptoms, especially in dense plantations.",
      type: "info",
    });
  }

  // Wind advisory
  if (windSpeed >= 6) {
    advice.push({
      title: "Wind Advisory",
      message:
        "Avoid spraying during strong winds to reduce spray drift.",
      type: "warning",
    });
  }

  // General recommendation
  if (advice.length === 0) {
    advice.push({
      title: "Weather Conditions",
      message:
        "No major weather-based advisory triggers detected. Continue regular crop monitoring.",
      type: "success",
    });
  }

  return advice;
}