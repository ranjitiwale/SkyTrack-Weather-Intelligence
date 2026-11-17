
import { useState } from "react";
import {
  MapPin,
  Droplets,
  Thermometer,
  CloudSun,
  Wind,
  Gauge,
  Sun,
} from "lucide-react";

function getWeatherTheme(weather) {
  const condition = weather?.condition?.toLowerCase() || "";
  const icon = weather?.icon || "";
  const isNight = icon.endsWith("n");

  if (condition.includes("thunderstorm")) {
    return "from-[#171b3d] via-[#30265c] to-[#10182f]";
  }

  if (condition.includes("rain") || condition.includes("drizzle")) {
    return "from-[#102d50] via-[#123c61] to-[#101b36]";
  }

  if (condition.includes("snow")) {
    return "from-[#29445e] via-[#345a78] to-[#172c48]";
  }

  if (condition.includes("cloud")) {
    return "from-[#253b57] via-[#304c6a] to-[#15253f]";
  }

  if (isNight) {
    return "from-[#101a3a] via-[#202b56] to-[#10172e]";
  }

  if (condition.includes("clear")) {
    return "from-[#075985] via-[#1263a5] to-[#172d55]";
  }

  return "from-[#123b62] via-[#174c86] to-[#172d55]";
}

export default function WeatherCard({ weather, unit, setUnit }) {
  const [showDetails, setShowDetails] = useState(true);

  if (!weather) {
    return (
      <section className="relative overflow-hidden rounded-[28px] p-8 md:p-12 'bg-gradient-to-br' from-[#102b4d] via-[#123b65] to-[#101a35] border border-white/10 shadow-2xl">
        <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/10 text-cyan-200 text-xs font-semibold mb-6">
            <CloudSun size={15} />
            WEATHER INTELLIGENCE
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Welcome to <span className="text-cyan-300">SkyTrack</span>
          </h2>

          <p className="text-slate-300 mt-3 leading-relaxed">
            Discover real-time weather conditions, explore forecasts,
            and make smarter everyday decisions.
          </p>

          <p className="text-sm text-cyan-200 mt-7">
            Search a city to explore its weather →
          </p>
        </div>

        <div className="absolute right-5 bottom-2 opacity-20 hidden sm:block">
          <CloudSun size={150} className="text-cyan-200" />
        </div>
      </section>
    );
  }

  const temperature =
    unit === "C"
      ? weather.temperature
      : (weather.temperature * 9) / 5 + 32;

  const feelsLike =
    unit === "C"
      ? weather.feelsLike
      : (weather.feelsLike * 9) / 5 + 32;

  const theme = getWeatherTheme(weather);

  const formattedDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      className={`relative isolate overflow-hidden rounded-[28px] p-6 md:p-9 lg:p-10 'bg-gradient-to-br' ${theme} border border-white/10 shadow-2xl shadow-blue-950/30 animate-fade-in-up`}
    >
      {/* Decorative background */}
      <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-cyan-300/10 blur-3xl pointer-events-none" />

      <div className="absolute right-20 bottom-0 w-56 h-56 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10">

        {/* Top section */}
        <div className="flex flex-wrap justify-between items-start gap-4">

          <div>
            <div className="inline-flex items-center gap-2 text-cyan-100 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Weather Conditions
            </div>

            <div className="flex items-center gap-2 mt-4">
              <MapPin size={18} className="text-cyan-200" />

              <h2 className="text-xl md:text-2xl font-bold text-white">
                {weather.city}, {weather.country}
              </h2>
            </div>

            <p className="text-blue-100/70 text-sm mt-2">
              {formattedDate}
            </p>
          </div>

          {/* Unit selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/20 border border-white/10">
            {["C", "F"].map((value) => (
              <button
                key={value}
                onClick={() => setUnit(value)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  unit === value
                    ? "bg-white text-slate-900 shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                °{value}
              </button>
            ))}
          </div>
        </div>

        {/* Main weather information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10">

          {/* Temperature */}
          <div>
            <p className="text-blue-100/80 text-sm font-medium">
              Current Temperature
            </p>

            <div className="flex items-start mt-2">
              <h1 className="text-[76px] md:text-[100px] leading-none font-extralight tracking-tighter text-white">
                {Number(temperature).toFixed(1)}
              </h1>

              <span className="text-3xl md:text-4xl font-light text-cyan-100 mt-2">
                °{unit}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-white mt-4 capitalize">
              {weather.description}
            </h3>

            <p className="flex items-center gap-2 text-sm text-blue-100/80 mt-3">
              <Thermometer size={16} />
              Feels like {Number(feelsLike).toFixed(1)}°{unit}
            </p>
          </div>

          {/* Weather icon */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="absolute inset-4 rounded-full bg-cyan-300/15 blur-3xl" />

              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt={weather.description || "Weather condition"}
                className="relative z-10 w-44 h-44 md:w-56 md:h-56 object-contain drop-shadow-2xl"
              />
            </div>

            <span className="text-white font-semibold text-lg capitalize">
              {weather.condition}
            </span>

            <span className="text-blue-100/70 text-xs mt-1">
              Current conditions
            </span>
          </div>
        </div>

        {/* Weather metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-9 pt-6 border-t border-white/15">

          <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-4">
            <div className="flex items-center gap-2 text-blue-100/70 text-xs">
              <Droplets size={16} className="text-cyan-300" />
              Humidity
            </div>

            <p className="text-xl md:text-2xl font-bold text-white mt-2">
              {weather.humidity}%
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-4">
            <div className="flex items-center gap-2 text-blue-100/70 text-xs">
              <Wind size={16} className="text-cyan-300" />
              Wind Speed
            </div>

            <p className="text-xl md:text-2xl font-bold text-white mt-2">
              {weather.windSpeed} <span className="text-xs font-normal">m/s</span>
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-blue-100/70 text-xs">
              <Gauge size={16} className="text-cyan-300" />
              Atmospheric Pressure
            </div>

            <p className="text-xl md:text-2xl font-bold text-white mt-2">
              {weather.pressure} <span className="text-xs font-normal">hPa</span>
            </p>
          </div>
        </div>

        {/* Bottom label */}
        <div className="flex flex-wrap justify-between items-center gap-3 mt-6">
          <div className="flex items-center gap-2 text-xs text-blue-100/70">
            <Sun size={15} className="text-cyan-200" />
            Powered by OpenWeatherMap
          </div>

          <span className="text-xs text-cyan-100/80">
            SkyTrack Weather Intelligence
          </span>
        </div>

      </div>
    </section>
  );
}
