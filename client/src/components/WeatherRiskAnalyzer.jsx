
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Wind,
  ThermometerSun,
  Eye,
  CloudRain,
  Droplets,
  Info,
} from "lucide-react";

import { analyzeWeatherRisk } from "../utils/weatherRiskAnalyzer";

const riskIcons = {
  "Extreme Heat": ThermometerSun,
  Heat: ThermometerSun,
  "Strong Wind": Wind,
  Wind,
  "Low Visibility": Eye,
  "Reduced Visibility": Eye,
  Rain: CloudRain,
  Thunderstorm: CloudRain,
  "High Humidity": Droplets,
};

function WeatherRiskAnalyzer({ weather }) {
  const result = analyzeWeatherRisk(weather);

  const riskStyles = {
    High: {
      badge: "bg-red-500/20 text-red-400",
      border: "border-red-500/30",
    },
    Moderate: {
      badge: "bg-yellow-500/20 text-yellow-400",
      border: "border-yellow-500/30",
    },
    Low: {
      badge: "bg-green-500/20 text-green-400",
      border: "border-green-500/30",
    },
  };

  const overallStyle =
    riskStyles[result.overallRisk] || riskStyles.Low;

  return (
    <section className="bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-orange-500/20 p-3 rounded-xl">
          <ShieldAlert className="text-orange-400" size={24} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">
            Weather Risk Analyzer
          </h2>
          <p className="text-xs text-slate-400">
            Weather-based risk assessment
          </p>
        </div>
      </div>

      {/* No Weather Data */}
      {!weather ? (
        <div className="text-center py-8 text-slate-400">
          <Info size={28} className="mx-auto mb-2" />
          <p>Search a city to analyze weather risks.</p>
        </div>
      ) : (
        <>
          {/* Overall Risk */}
          <div className={`border ${overallStyle.border} rounded-xl p-4 mb-5`}>
            <div className="flex justify-between items-center gap-3">
              <div>
                <p className="text-sm text-slate-400">
                  Overall Risk Level
                </p>

                <h3 className="text-2xl font-bold text-white mt-1">
                  {result.overallRisk}
                </h3>
              </div>

              <div className={`px-3 py-2 rounded-lg ${overallStyle.badge}`}>
                {result.riskScore}/100
              </div>
            </div>

            <div className="w-full bg-slate-700 h-2 rounded-full mt-4 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  result.overallRisk === "High"
                    ? "bg-red-500"
                    : result.overallRisk === "Moderate"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${result.riskScore}%` }}
              />
            </div>
          </div>

          {/* Risk Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">
              Detected Weather Risks
            </h3>

            {result.risks.length === 0 ? (
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <CheckCircle className="text-green-400" size={22} />
                <div>
                  <p className="text-sm text-green-400 font-medium">
                    No significant risks detected
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Based on the available current weather metrics.
                  </p>
                </div>
              </div>
            ) : (
              result.risks.map((risk, index) => {
                const Icon =
                  riskIcons[risk.type] || AlertTriangle;

                const style =
                  riskStyles[risk.level] || riskStyles.Low;

                return (
                  <div
                    key={`${risk.type}-${index}`}
                    className={`border ${style.border} bg-slate-800 rounded-xl p-4`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon
                        size={21}
                        className="text-orange-400 mt-1 shrink-0"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-white">
                            {risk.type}
                          </p>

                          <span
                            className={`text-xs px-2 py-1 rounded-md ${style.badge}`}
                          >
                            {risk.level} Risk
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 mt-2">
                          {risk.message}
                        </p>

                        {risk.value && (
                          <p className="text-xs text-slate-300 mt-2">
                            Measured: {risk.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <p className="text-[11px] text-slate-500 mt-5 leading-relaxed">
            This is an automated advisory based on available weather
            data, not an official weather warning. Follow IMD and local
            authority alerts.
          </p>
        </>
      )}
    </section>
  );
}

export default WeatherRiskAnalyzer;
