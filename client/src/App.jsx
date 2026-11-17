import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import WeatherMetrics from "./components/WeatherMetrics";
import Forecast from "./components/Forecast";
import AIInsights from "./components/AIInsights";
import useWeather from "./hooks/useWeather";
import OutdoorActivityScore from "./components/OutdoorActivityScore";
import WeatherRecommendations from "./components/WeatherRecommendations";
import TravelAssistant from "./components/TravelAssistant";
import AIChat from "./components/AIChat";
import WeatherRiskAnalyzer from "./components/WeatherRiskAnalyzer";
import WeatherAlerts from "./components/WeatherAlerts";
import SavedLocations from "./components/SavedLocations";
import { saveWeatherSnapshot } from "./utils/weatherHistory";
import WeatherHistory from "./components/WeatherHistory";

function App() {
  const [unit, setUnit] = useState("C");
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState("Overview");

  // Weather Hook
  const {
    weather,
    forecast,
    loading,
    forecastLoading,
    error,
    forecastError,
    fetchWeather,
    fetchForecast,
  } = useWeather();

  // Search Current Weather + Forecast
const handleSearch = async (city) => {
  const [weatherResult] = await Promise.all([
    fetchWeather(city),
    fetchForecast(city),
  ]);

  if (weatherResult) {
    saveWeatherSnapshot(weatherResult);
  }
};

console.log("CURRENT WEATHER:", weather);

  return (
    <main className="min-h-screen bg-[#07111f] flex flex-col lg:flex-row">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 min-w-0 p-5 md:p-8 lg:p-10">

        <Header
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          loading={loading || forecastLoading}
        />

        <div className="max-w-1500px mx-auto space-y-6">

          {loading && (
            <p className="text-blue-300 text-center py-3">
              Fetching live weather data...
            </p>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300">
              {error}
            </div>
          )}

          <WeatherCard
            weather={weather}
            unit={unit}
            setUnit={setUnit}
          />

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Weather Overview
            </h3>

            <WeatherMetrics weather={weather} />
          </div>

          <OutdoorActivityScore weather={weather} />

          <WeatherRecommendations weather={weather} />
          <TravelAssistant weather={weather} />
          <AIChat city={weather?.city || search} />

        <WeatherRiskAnalyzer weather={weather?.data || weather} />
        <WeatherAlerts weather={weather} />

        <SavedLocations
  currentCity={weather?.city || ""}
  onSelectCity={handleSearch}
/>

<WeatherHistory />

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Weather Forecast
            </h3>

            {forecastLoading && (
              <p className="text-blue-300 py-3">
                Loading 5-day forecast...
              </p>
            )}

            {forecastError && (
              <p className="text-red-300 py-3">
                {forecastError}
              </p>
            )}

          <Forecast forecast={forecast} unit={unit} />
          </div>

          <AIInsights />

          <footer className="text-center text-xs text-slate-500 py-5 border-t border-white/10">
            © 2026 SkyTrack. Built with React and modern web technologies.
          </footer>

        </div>
      </div>
    </main>
  );
}

export default App;