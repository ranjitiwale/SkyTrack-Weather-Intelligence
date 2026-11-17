
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
} from "lucide-react";

const metricsConfig = [
  {
    title: "Humidity",
    key: "humidity",
    unit: "%",
    detail: "Relative humidity",
    icon: Droplets,
  },
  {
    title: "Wind Speed",
    key: "windSpeed",
    unit: "m/s",
    detail: "Current wind speed",
    icon: Wind,
  },
  {
    title: "Pressure",
    key: "pressure",
    unit: "hPa",
    detail: "Atmospheric pressure",
    icon: Gauge,
  },
  {
    title: "Visibility",
    key: "visibility",
    unit: "km",
    detail: "Current visibility",
    icon: Eye,
  },
];

export default function WeatherMetrics({ weather }) {
  if (!weather) {
    return (
      <p className="text-slate-400 text-sm">
        Search a city to view weather metrics.
      </p>
    );
  }

  return (
    <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {metricsConfig.map((metric) => {
        const Icon = metric.icon;
        const value = weather[metric.key];

        return (
          <div
            key={metric.title}
            className="bg-[#111f33] border border-white/10 rounded-2xl p-5 hover:border-cyan-400/30 transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                {metric.title}
              </p>

              <Icon size={20} className="text-cyan-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mt-5">
              {value ?? "--"} {metric.unit}
            </h3>

            <p className="text-xs text-slate-500 mt-2">
              {metric.detail}
            </p>
          </div>
        );
      })}
    </section>
  );
}
