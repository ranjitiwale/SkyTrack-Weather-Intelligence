
export function calculateOutdoorScore(weather) {
  if (!weather) return null;

  let score = 100;
  const factors = [];

  const temperature = weather.temperature;
  const humidity = weather.humidity;
  const windSpeed = weather.windSpeed;
  const visibility = weather.visibility;
  const condition = weather.condition?.toLowerCase();

  // Temperature analysis
  if (temperature >= 40 || temperature <= 0) {
    score -= 30;
    factors.push("Extreme temperature");
  } else if (temperature >= 35 || temperature <= 5) {
    score -= 15;
    factors.push("Uncomfortable temperature");
  }

  // Rain analysis
  if (["rain", "thunderstorm", "drizzle"].includes(condition)) {
    score -= 25;
    factors.push("Rain or storm conditions");
  }

  // Wind analysis
  if (windSpeed >= 10) {
    score -= 20;
    factors.push("Strong wind");
  } else if (windSpeed >= 6) {
    score -= 10;
    factors.push("Moderate to strong wind");
  }

  // Humidity analysis
  if (humidity >= 85) {
    score -= 15;
    factors.push("High humidity");
  } else if (humidity >= 70) {
    score -= 7;
    factors.push("Moderately high humidity");
  }

  // Visibility analysis
  if (visibility < 1) {
    score -= 25;
    factors.push("Very low visibility");
  } else if (visibility < 3) {
    score -= 15;
    factors.push("Reduced visibility");
  }

  score = Math.max(0, Math.min(100, score));

  let recommendation;

  if (score >= 80) {
    recommendation = "Great for outdoor activities";
  } else if (score >= 60) {
    recommendation = "Generally suitable with precautions";
  } else if (score >= 40) {
    recommendation = "Outdoor activities may be uncomfortable";
  } else {
    recommendation = "Consider indoor activities";
  }

  return {
    score,
    recommendation,
    factors,
  };
}
