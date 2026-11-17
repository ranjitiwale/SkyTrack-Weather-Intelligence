
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  ShieldAlert,
} from "lucide-react";

import { generateWeatherAlerts } from "../utils/weatherAlerts";

function WeatherAlerts({ weather }) {
  const alerts = generateWeatherAlerts(weather);

  const getAlertStyle = (severity) => {
    if (severity === "High") {
      return {
        container: "border-red-500/30 bg-red-500/10",
        badge: "bg-red-500/20 text-red-400",
        icon: AlertTriangle,
      };
    }

    return {
      container: "border-yellow-500/30 bg-yellow-500/10",
      badge: "bg-yellow-500/20 text-yellow-400",
      icon: AlertCircle,
    };
  };

  return (
    <section className="bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500/20 p-3 rounded-xl">
            <Bell className="text-orange-400" size={23} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Smart Weather Alerts
            </h2>
            <p className="text-xs text-slate-400">
              Weather-based notifications
            </p>
          </div>
        </div>

        <span className="bg-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg">
          {alerts.length} Alerts
        </span>
      </div>

      {/* No Weather */}
      {!weather ? (
        <div className="text-center py-7 text-slate-400">
          <ShieldAlert size={28} className="mx-auto mb-2" />
          <p className="text-sm">
            Search a city to view weather alerts.
          </p>
        </div>
      ) : alerts.length === 0 ? (
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <CheckCircle className="text-green-400" size={23} />

          <div>
            <p className="text-sm font-semibold text-green-400">
              No significant alerts
            </p>
            <p className="text-xs text-slate-400 mt-1">
              No alert conditions detected in the current weather data.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const style = getAlertStyle(alert.severity);
            const Icon = style.icon;

            return (
              <div
                key={alert.id}
                className={`border ${style.container} rounded-xl p-4`}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    size={21}
                    className={
                      alert.severity === "High"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-white">
                        {alert.title}
                      </h3>

                      <span className={`text-xs px-2 py-1 rounded-md ${style.badge}`}>
                        {alert.severity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[11px] text-slate-500 mt-5">
        These are automated advisories, not official IMD warnings.
        Follow official local weather alerts.
      </p>
    </section>
  );
}

export default WeatherAlerts;
