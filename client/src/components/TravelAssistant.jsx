import { getTravelAdvice } from "../utils/travelIntelligence";
import {
  Car,
  ShieldCheck,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function TravelAssistant({ weather }) {
  const advice = getTravelAdvice(weather);

  if (!advice) return null;

  const statusStyle = {
    Good: {
      color: "text-emerald-400",
      background: "bg-emerald-400/10",
      icon: ShieldCheck,
    },
    "Moderate Caution": {
      color: "text-yellow-400",
      background: "bg-yellow-400/10",
      icon: Info,
    },
    "High Caution": {
      color: "text-red-400",
      background: "bg-red-400/10",
      icon: AlertTriangle,
    },
  };

  const style = statusStyle[advice.status];
  const StatusIcon = style.icon;

  return (
    <section className="bg-[#111f33] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 rounded-xl bg-blue-500/10">
          <Car className="text-blue-400" size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Smart Travel Assistant
          </h2>
          <p className="text-sm text-slate-400">
            Travel guidance based on current weather.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-5">
        <div>
          <p className="text-sm text-slate-400">Travel Suitability Score</p>
          <p className="text-4xl font-bold text-white mt-1">
            {advice.score}
            <span className="text-lg text-slate-400">/100</span>
          </p>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${style.background}`}>
          <StatusIcon className={style.color} size={20} />
          <span className={`font-medium ${style.color}`}>
            {advice.status}
          </span>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-5">
        <div
          className={`h-full rounded-full ${
            advice.score >= 70
              ? "bg-emerald-400"
              : advice.score >= 40
              ? "bg-yellow-400"
              : "bg-red-400"
          }`}
          style={{ width: `${advice.score}%` }}
        />
      </div>

      <p className="text-sm text-slate-300 mb-4">
        {advice.recommendation}
      </p>

      {advice.warnings.length > 0 && (
        <div className="space-y-3">
          {advice.warnings.map((warning, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 rounded-xl bg-orange-400/10"
            >
              <AlertTriangle
                size={18}
                className="text-orange-400 shrink-0"
              />
              <p className="text-sm text-slate-300">{warning}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}