
const STORAGE_KEY = "skytrack_weather_history";
const MAX_RECORDS = 100;

const notifyHistoryUpdate = () => {
  window.dispatchEvent(
    new Event("skytrack-weather-history-updated")
  );
};

export function getWeatherHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to read weather history:", error);
    return [];
  }
}

export function saveWeatherSnapshot(weather) {
  if (!weather || !weather.city) {
    return getWeatherHistory();
  }

  const snapshot = {
    id: `${Date.now()}-${weather.city}`,
    city: weather.city,
    temperature: Number(weather.temperature),
    humidity: Number(weather.humidity),
    windSpeed: Number(weather.windSpeed),
    condition: weather.condition || "Unknown",
    recordedAt: new Date().toISOString(),
  };

  if (
    !Number.isFinite(snapshot.temperature) ||
    !Number.isFinite(snapshot.humidity) ||
    !Number.isFinite(snapshot.windSpeed)
  ) {
    return getWeatherHistory();
  }

  const updatedHistory = [
    snapshot,
    ...getWeatherHistory(),
  ].slice(0, MAX_RECORDS);

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );

    notifyHistoryUpdate();
  } catch (error) {
    console.error("Unable to save weather history:", error);
  }

  return updatedHistory;
}

export function deleteWeatherRecord(id) {
  const updatedHistory = getWeatherHistory().filter(
    (item) => item.id !== id
  );

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );

    notifyHistoryUpdate();
  } catch (error) {
    console.error("Unable to delete weather record:", error);
  }

  return updatedHistory;
}

export function clearWeatherHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    notifyHistoryUpdate();
  } catch (error) {
    console.error("Unable to clear weather history:", error);
  }
}
