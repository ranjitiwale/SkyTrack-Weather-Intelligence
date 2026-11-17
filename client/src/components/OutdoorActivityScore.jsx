
import { calculateOutdoorScore } from "../utils/weatherIntelligence";
import { Activity, AlertTriangle, CheckCircle } from "lucide-react";

export default function OutdoorActivityScore({ weather }) {
  const result = calculateOutdoorScore(weather);

  if (!result) return null;

  const { score, recommendation, factors } = result;

  const scoreColor =
    score >= 80
      ? "text-emerald-400"
      : score >= 60
      ? "text-yellow-400"
      : score >= 40
      ? "text-orange-400"
      : "text-red-400";

  const progressColor =
    score >= 80
      ? "bg-emerald-400"
      : score >= 60
      ? "bg-yellow-400"
      : score >= 40
      ? "bg-orange-400"
      : "bg-red-400";

  return (
    <section className="bg-[#111f33] border border-white/10 rounded-2xl p-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="text-cyan-400" size={21} />
            <h3 className="text-white font-semibold text-lg">
              Outdoor Activity Score
            </h3>
          </div>

          <p className="text-slate-400 text-sm mt-1">
            Weather-based activity suitability
          </p>
        </div>

        {score >= 60 ? (
          <CheckCircle className="text-emerald-400" size={24} />
        ) : (
          <AlertTriangle className="text-orange-400" size={24} />
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-4 border-white/10">
          <div className="text-center">
            <p className={`text-3xl font-bold ${scoreColor}`}>
              {score}
            </p>
            <p className="text-xs text-slate-400">/ 100</p>
          </div>
        </div>

        <div className="flex-1">
          <h4 className={`font-semibold text-lg ${scoreColor}`}>
            {recommendation}
          </h4>

          <p className="text-sm text-slate-400 mt-2">
            Based on current temperature, humidity, wind and visibility.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Activity suitability</span>
          <span>{score}%</span>
        </div>

        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-white text-sm font-semibold mb-3">
          Weather Analysis
        </h4>

        {factors.length > 0 ? (
          <div className="space-y-2">
            {factors.map((factor, index) => (
              <p key={index} className="text-sm text-orange-300">
                • {factor}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-emerald-400">
            No major weather penalties detected.
          </p>
        )}
      </div>

    </section>
  );
}
