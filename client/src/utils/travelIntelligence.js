export function getTravelAdvice(weather) {
  if (!weather) return null;

  const { temperature, windSpeed, visibility } = weather;
  const condition = weather.condition?.toLowerCase();

  let score = 100;
  const warnings = [];

  if (["rain", "drizzle"].includes(condition)) {
    score -= 20;
    warnings.push("Rain may affect your travel.");
  }

  if (condition === "thunderstorm") {
    score -= 35;
    warnings.push("Thunderstorm conditions detected. Be cautious.");
  }

  if (visibility < 1) {
    score -= 30;
    warnings.push("Very low visibility. Drive carefully.");
  } else if (visibility < 3) {
    score -= 15;
    warnings.push("Reduced visibility may affect road travel.");
  }

  if (windSpeed >= 10) {
    score -= 15;
    warnings.push("Strong winds may affect travel.");
  }

  if (temperature >= 40) {
    score -= 10;
    warnings.push("Extreme heat may make travel uncomfortable.");
  }

  score = Math.max(0, score);

  let status = "Good";
  if (score < 40) status = "High Caution";
  else if (score < 70) status = "Moderate Caution";

  return {
    score,
    status,
    warnings,
    recommendation:
      warnings.length > 0
        ? "Review the weather conditions before starting your journey."
        : "Current weather conditions look suitable for travel.",
  };
}