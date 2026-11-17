
export function analyzeWeatherRisk(weather) {
  if (!weather) {
    return {
      overallRisk: "Unavailable",
      riskScore: 0,
      risks: [],
    };
  }

  const temperature = Number(weather.temperature);
  const windSpeed = Number(weather.windSpeed) * 3.6;
  const humidity = Number(weather.humidity);
  const visibility = Number(weather.visibility);
  const condition = String(weather.condition || "").toLowerCase();

  let score = 0;
  const risks = [];

  // Heat Risk
  if (Number.isFinite(temperature)) {
    if (temperature >= 40) {
      score += 40;
      risks.push({
        type: "Extreme Heat",
        level: "High",
        message: "Very high temperature. Avoid prolonged outdoor exposure.",
      });
    } else if (temperature >= 35) {
      score += 25;
      risks.push({
        type: "Heat",
        level: "Moderate",
        message: "Stay hydrated and limit strenuous outdoor activities.",
      });
    } else if (temperature >= 32) {
      score += 10;
    }
  }

  // Wind Risk (converted to km/h)
  if (Number.isFinite(windSpeed)) {
    if (windSpeed >= 50) {
      score += 35;
      risks.push({
        type: "Strong Wind",
        level: "High",
        message: "Strong winds may affect outdoor activities.",
        value: `${windSpeed.toFixed(1)} km/h`,
      });
    } else if (windSpeed >= 30) {
      score += 20;
      risks.push({
        type: "Wind",
        level: "Moderate",
        message: "Be cautious in exposed outdoor areas.",
        value: `${windSpeed.toFixed(1)} km/h`,
      });
    }
  }

  // Visibility Risk
  if (Number.isFinite(visibility)) {
    if (visibility <= 1) {
      score += 30;
      risks.push({
        type: "Low Visibility",
        level: "High",
        message: "Visibility is very low. Take extra care while travelling.",
      });
    } else if (visibility <= 3) {
      score += 15;
      risks.push({
        type: "Reduced Visibility",
        level: "Moderate",
        message: "Reduced visibility may affect travel.",
      });
    }
  }

  // Rain and Thunderstorm
  if (condition.includes("thunderstorm")) {
    score += 40;
    risks.push({
      type: "Thunderstorm",
      level: "High",
      message: "Avoid open areas during thunderstorms.",
    });
  } else if (
    condition.includes("rain") ||
    condition.includes("drizzle")
  ) {
    score += 15;
    risks.push({
      type: "Rain",
      level: "Moderate",
      message: "Carry rain protection and check local conditions.",
    });
  }

  // Humidity
  if (humidity >= 85 && temperature >= 32) {
    score += 15;
    risks.push({
      type: "High Humidity",
      level: "Moderate",
      message: "High humidity and heat may increase discomfort.",
    });
  }

  score = Math.min(score, 100);

  const overallRisk =
    score >= 60 ? "High" :
    score >= 30 ? "Moderate" :
    "Low";

  return {
    overallRisk,
    riskScore: score,
    risks,
  };
}
