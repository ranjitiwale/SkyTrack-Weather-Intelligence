
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  History,
  Trash2,
  Thermometer,
  Download,
  MapPin,
} from "lucide-react";

import {
  getWeatherHistory,
  clearWeatherHistory,
  deleteWeatherRecord,
} from "../utils/weatherHistory";

function WeatherHistory() {
  const [history, setHistory] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");

  // Load weather history
  useEffect(() => {
  const updateHistory = () => {
    setHistory(getWeatherHistory());
  };

  updateHistory();

  window.addEventListener(
    "skytrack-weather-history-updated",
    updateHistory
  );

  return () => {
    window.removeEventListener(
      "skytrack-weather-history-updated",
      updateHistory
    );
  };
}, []);

  // Clear all history
  const handleClearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all weather history?"
    );

    if (!confirmed) return;

    clearWeatherHistory();
    setHistory([]);
    setSelectedCity("All");
  };

  // Delete individual record
  const handleDeleteRecord = (id) => {
    const updatedHistory = deleteWeatherRecord(id);
    setHistory(updatedHistory);
  };

  // Get unique cities
  const cities = [
    "All",
    ...new Set(history.map((item) => item.city)),
  ];

  // Filter records by city
  const filteredHistory =
    selectedCity === "All"
      ? history
      : history.filter(
          (item) => item.city === selectedCity
        );

  // Prepare chart data
  const chartData = [...filteredHistory]
    .reverse()
    .map((item) => ({
      time: new Date(item.recordedAt).toLocaleString(
        [],
        {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
      city: item.city,
      temperature: item.temperature,
    }));

  // Export history as CSV
  const handleExportCSV = () => {
    if (filteredHistory.length === 0) return;

    const headers = [
      "City",
      "Temperature (C)",
      "Humidity (%)",
      "Wind Speed (m/s)",
      "Condition",
      "Recorded At",
    ];

    const rows = filteredHistory.map((item) => [
      item.city,
      item.temperature,
      item.humidity,
      item.windSpeed,
      item.condition,
      new Date(item.recordedAt).toLocaleString(),
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      ["\uFEFF" + csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `skytrack-weather-history-${Date.now()}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">

      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/40">
            <History size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Weather History
            </h2>

            <p className="text-sm text-slate-500">
              Your previously searched weather snapshots
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {history.length > 0 && (
          <div className="flex flex-wrap gap-2">

            <button
              onClick={handleExportCSV}
              disabled={filteredHistory.length === 0}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download size={16} />
              Export CSV
            </button>

            <button
              onClick={handleClearHistory}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
            >
              <Trash2 size={16} />
              Clear All
            </button>

          </div>
        )}
      </div>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="py-10 text-center">

          <Thermometer
            size={35}
            className="mx-auto mb-3 text-slate-400"
          />

          <p className="font-medium text-slate-700 dark:text-slate-200">
            No weather history yet
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Search for a city to start building your history.
          </p>

        </div>
      ) : (
        <>
          {/* City Filter */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <MapPin size={16} />
              Filter by city
            </div>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

          </div>

          {/* Temperature Chart */}
          {filteredHistory.length > 0 ? (
            <>
              <div className="mb-5 h-64 w-full">

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 11 }}
                    />

                    <YAxis unit="°C" />

                    <Tooltip
                      formatter={(value) => [
                        `${value}°C`,
                        "Temperature",
                      ]}
                      labelFormatter={(label) =>
                        `Recorded: ${label}`
                      }
                    />

                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />

                  </LineChart>
                </ResponsiveContainer>

              </div>

              {/* Recent Records */}
              <div className="space-y-3">

                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    Recent Records
                  </h3>

                  <span className="text-xs text-slate-500">
                    {filteredHistory.length} records
                  </span>
                </div>

                {filteredHistory.slice(0, 5).map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800"
                  >

                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {item.city}
                      </p>

                      <p className="text-xs text-slate-500">
                        {new Date(
                          item.recordedAt
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">

                      <div className="text-right">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {item.temperature}°C
                        </p>

                        <p className="text-xs text-slate-500">
                          {item.condition}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteRecord(item.id)}
                        title="Delete this record"
                        aria-label={`Delete ${item.city} weather record`}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/40"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </div>

                ))}

              </div>
            </>
          ) : (
            <p className="py-8 text-center text-sm text-slate-500">
              No records found for {selectedCity}.
            </p>
          )}
        </>
      )}

    </section>
  );
}

export default WeatherHistory;
