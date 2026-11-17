
const STORAGE_KEY = "skytrack_saved_locations";

export function getSavedLocations() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Unable to load saved locations:", error);
    return [];
  }
}

export function saveLocation(city) {
  const cityName = city?.trim();

  if (!cityName) {
    return getSavedLocations();
  }

  const locations = getSavedLocations();

  const alreadyExists = locations.some(
    (location) =>
      location.toLowerCase() === cityName.toLowerCase()
  );

  if (alreadyExists) {
    return locations;
  }

  const updatedLocations = [...locations, cityName];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedLocations)
  );

  return updatedLocations;
}

export function removeLocation(city) {
  const updatedLocations = getSavedLocations().filter(
    (location) =>
      location.toLowerCase() !== city.toLowerCase()
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedLocations)
  );

  return updatedLocations;
}
