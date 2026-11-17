
import { useEffect, useState } from "react";
import {
  MapPin,
  Plus,
  Trash2,
  Star,
  CloudSun,
} from "lucide-react";

import {
  getSavedLocations,
  saveLocation,
  removeLocation,
} from "../utils/savedLocations";

function SavedLocations({ currentCity = "", onSelectCity }) {
  const [locations, setLocations] = useState([]);
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    setLocations(getSavedLocations());
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    if (!newCity.trim()) return;

    const updated = saveLocation(newCity);

    setLocations(updated);
    setNewCity("");
  };

  const handleRemove = (city) => {
    const updated = removeLocation(city);
    setLocations(updated);
  };

  return (
    <section className="bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-yellow-500/20 p-3 rounded-xl">
          <Star className="text-yellow-400" size={23} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">
            Saved Locations
          </h2>
          <p className="text-xs text-slate-400">
            Your favourite weather locations
          </p>
        </div>
      </div>

      {/* Add City */}
      <form onSubmit={handleSave} className="flex gap-2 mb-5">
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Enter city name..."
          maxLength={80}
          className="flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={!newCity.trim()}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-xl disabled:opacity-40"
          aria-label="Save city"
        >
          <Plus size={20} />
        </button>
      </form>

      {/* Saved Cities */}
      {locations.length === 0 ? (
        <div className="text-center py-7 text-slate-400">
          <MapPin size={28} className="mx-auto mb-2" />
          <p className="text-sm">No saved locations yet.</p>
          <p className="text-xs mt-1">
            Add your favourite city above.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {locations.map((city) => (
            <div
              key={city}
              className={`flex items-center justify-between gap-3 p-3 rounded-xl border ${
                currentCity.toLowerCase() === city.toLowerCase()
                  ? "bg-blue-500/10 border-blue-500/40"
                  : "bg-slate-800 border-slate-700"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectCity?.(city)}
                className="flex items-center gap-3 flex-1 min-w-0 text-left"
              >
                <CloudSun
                  size={21}
                  className="text-blue-400 shrink-0"
                />

                <span className="text-sm text-white truncate">
                  {city}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleRemove(city)}
                className="text-slate-400 hover:text-red-400 p-2"
                aria-label={`Remove ${city}`}
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-[11px] text-slate-500 mt-4">
        Saved locations are stored in this browser.
      </p>
    </section>
  );
}

export default SavedLocations;
