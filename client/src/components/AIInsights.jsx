
import {
  Sparkles,
  Umbrella,
  Bike,
  Sun,
  ArrowUpRight,
} from "lucide-react";

export default function AIInsights() {
  return (
    <section className="bg-linear-to-br from-[#17294a] to-[#111f33] border border-cyan-400/15 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-400/15">
            <Sparkles className="text-cyan-400" />
          </div>

          <div>
            <h3 className="text-white font-semibold">
              SkyTrack AI Insights
            </h3>

            <p className="text-xs text-slate-400">
              Weather recommendations
            </p>
          </div>
        </div>

        <span className="text-xs text-cyan-400 border border-cyan-400/20 rounded-full px-3 py-1">
          Demo
        </span>
      </div>

      <p className="text-slate-300 text-sm leading-6 mt-6">
        Today's weather conditions appear favourable for
        outdoor activities. Temperatures are comfortable
        with moderate humidity.
      </p>

      <div className="space-y-4 mt-6">
        <div className="flex items-start gap-3">
          <Sun size={19} className="text-yellow-300 mt-1" />
          <div>
            <p className="text-white text-sm font-medium">
              Outdoor Activities
            </p>
            <p className="text-slate-400 text-xs mt-1">
              A suitable day for outdoor plans.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Umbrella size={19} className="text-cyan-400 mt-1" />
          <div>
            <p className="text-white text-sm font-medium">
              Rain Preparation
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Check the latest forecast before leaving.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Bike size={19} className="text-green-400 mt-1" />
          <div>
            <p className="text-white text-sm font-medium">
              Travel Suggestion
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Check wind and visibility conditions for your ride.
            </p>
          </div>
        </div>
      </div>

      <button className="mt-6 w-full flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold rounded-xl py-3 text-sm transition">
        Explore AI Assistant
        <ArrowUpRight size={17} />
      </button>
    </section>
  );
}
