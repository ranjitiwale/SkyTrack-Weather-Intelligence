
import {
  Search,
  MapPin,
  CalendarDays,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

export default function Header({
  search,
  setSearch,
  onSearch,
  loading,
}) {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim() || loading) return;

    onSearch(search.trim());
  };

  return (
    <header className="mb-8 animate-fade-in-up">

      {/* Top Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

        {/* Welcome Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-semibold tracking-[2px] uppercase text-cyan-400">
              Weather Intelligence Platform
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Weather <span className="gradient-text">Dashboard</span>
          </h2>

          <p className="text-sm text-slate-400">
            Track conditions. Understand the impact. Plan smarter.
          </p>
        </div>

        {/* Search and Date */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full xl:w-auto">

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="group flex items-center gap-3 w-full sm:w-350px px-4 py-3.5 rounded-2xl bg-[#101e32]/90 border border-white/10 hover:border-cyan-400/30 focus-within:border-cyan-400/50 focus-within:shadow-lg focus-within:shadow-cyan-500/10 transition-all duration-300"
          >
            <Search
              size={20}
              className="text-slate-400 group-focus-within:text-cyan-400 shrink-0"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any city worldwide..."
              aria-label="Search city"
              className="bg-transparent outline-none text-white text-sm w-full min-w-0 placeholder:text-slate-500"
            />

            <button
              type="submit"
              disabled={loading || !search.trim()}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl 'bg-gradient-to-r' from-cyan-500 to-blue-600 text-white text-xs font-bold hover:shadow-lg hover:shadow-cyan-500/20 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
            >
              {loading ? (
                <LoaderCircle size={15} className="animate-spin" />
              ) : (
                <Search size={15} />
              )}

              <span>{loading ? "Loading" : "Search"}</span>
            </button>
          </form>

          {/* Date Card */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#101e32]/80 border border-white/10">
            <div className="p-2.5 rounded-xl bg-cyan-400/10">
              <CalendarDays size={20} className="text-cyan-400" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Today
              </p>

              <p className="text-xs font-semibold text-slate-200 whitespace-nowrap">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Information */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-white/[0.07]">

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <MapPin size={15} className="text-cyan-400" />
          <span>Explore weather conditions across the globe</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-cyan-300">
          <Sparkles size={14} />
          <span>Powered by SkyTrack Intelligence</span>
        </div>

      </div>
    </header>
  );
}
