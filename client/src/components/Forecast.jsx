
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
} from "lucide-react";

const getWeatherIcon = (condition) => {
  switch (condition?.toLowerCase()) {
    case "clear":
      return Sun;
    case "clouds":
      return Cloud;
    case "rain":
      return CloudRain;
    case "drizzle":
      return CloudDrizzle;
    case "snow":
      return CloudSnow;
    case "thunderstorm":
      return CloudLightning;
    case "mist":
    case "fog":
    case "haze":
      return CloudFog;
    default:
      return Cloud;
  }
};

const getLocalDate = (dateTime, timezone) => {
  const utcDate = new Date(
    dateTime.replace(" ", "T") + "Z"
  );

  return new Date(
    utcDate.getTime() + timezone * 1000
  );
};

const formatDay = (dateTime, timezone) => {
  return getLocalDate(dateTime, timezone)
    .toLocaleDateString("en-IN", {
      weekday: "long",
      timeZone: "UTC",
    });
};

const formatTime = (dateTime, timezone) => {
  return getLocalDate(dateTime, timezone)
    .toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
};

export default function Forecast({ forecast, unit = "C" }) {
  if (!forecast?.forecast?.length) {
    return (
      <div className="bg-[#111f33] border border-white/10 rounded-2xl p-6 text-center">
        <Cloud size={32} className="text-blue-300 mx-auto mb-3" />
        <p className="text-white font-medium">
          Search a city to view weather forecast
        </p>
        <p className="text-sm text-slate-400 mt-2">
          Live 3-hour and 5-day forecast will appear here.
        </p>
      </div>
    );
  }

const forecastData = forecast.forecast;
const timezone = forecast.timezone;

const hourly = forecastData.slice(0, 6);

// Group forecast entries by local date
const dailyMap = {};

forecastData.forEach((item) => {
  const day = formatDay(item.dateTime, timezone);

  if (!dailyMap[day]) {
    dailyMap[day] = {
      day,
      high: item.maxTemperature,
      low: item.minTemperature,
      entries: [],
    };
  }

  dailyMap[day].high = Math.max(
    dailyMap[day].high,
    item.maxTemperature
  );

  dailyMap[day].low = Math.min(
    dailyMap[day].low,
    item.minTemperature
  );

  dailyMap[day].entries.push(item);
});

const daily = Object.values(dailyMap).slice(0, 5);

  
  const convertTemperature = (temperature) => {
    return unit === "F"
      ? (temperature * 9) / 5 + 32
      : temperature;
  };

  const temperatureLabel = (temperature) => {
    return `${Math.round(convertTemperature(temperature))}°`;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

      {/* 3-Hour Forecast */}
      <section className="bg-[#111f33] border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold text-lg mb-6">
          3-Hour Forecast
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {hourly.map((item, index) => {
            const Icon = getWeatherIcon(item.condition);
           

            return (
              <div
                key={`${item.dateTime}-${index}`}
                className="text-center bg-[#192a40] rounded-xl p-3"
              >
                <p className="text-xs text-slate-400">
                  {formatTime(item.dateTime, timezone)}
                </p>

                <Icon
                  size={25}
                  className="text-yellow-300 mx-auto my-4"
                />

                <p className="text-white font-semibold">
                  {temperatureLabel(item.temperature)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5-Day Forecast */}
      <section className="bg-[#111f33] border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold text-lg mb-5">
          5-Day Forecast
        </h3>

        <div className="space-y-4">
          {daily.map((item) => {
            const representative = item.entries.reduce(
              (closest, current) =>
                Math.abs(Number(current.dateTime.slice(11, 13)) - 12) <
                Math.abs(Number(closest.dateTime.slice(11, 13)) - 12)
                  ? current
                  : closest,
              item.entries[0]
            );

            const Icon = getWeatherIcon(representative.condition);

            return (
              <div
                key={item.day}
                className="flex items-center justify-between gap-2"
              >
                <p className="text-sm text-slate-300 w-24">
                  {item.day}
                </p>

                <div className="flex items-center gap-2 flex-1">
                  <Icon size={21} className="text-yellow-300" />
                  <span className="text-xs text-slate-400 capitalize">
                    {representative.description}
                  </span>
                </div>

                <p className="text-sm text-white font-medium">
                  {temperatureLabel(item.high)}
                </p>

                <p className="text-sm text-slate-500">
                  {temperatureLabel(item.low)}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
