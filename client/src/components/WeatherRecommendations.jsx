import { getWeatherRecommendations } from "../utils/weatherRecommendations";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";

export default function WeatherRecommendations({ weather }) {
  const recommendations = getWeatherRecommendations(weather);

  if (!weather) return null;

  const styles = {
    warning: {
      icon: AlertTriangle,
      color: "text-orange-400",
      background: "bg-orange-400/10",
    },
    info: {
      icon: Info,
      color: "text-blue-400",
      background: "bg-blue-400/10",
    },
    success: {
      icon: CheckCircle,
      color: "text-emerald-400",
      background: "bg-emerald-400/10",
    },
  };

  return (
    <section className="bg-[#111f33] border border-white/10 rounded-2xl p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">
          Smart Weather Recommendations
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Practical suggestions based on current weather conditions.
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.map((item, index) => {
          const style = styles[item.type];
          const Icon = style.icon;

          return (
            <div
              key={index}
              className={`flex gap-4 p-4 rounded-xl ${style.background}`}
            >
              <Icon className={`${style.color} shrink-0`} size={22} />

              <div>
                <h3 className="text-white font-medium">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {item.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}