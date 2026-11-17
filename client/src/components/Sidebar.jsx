
import {
  LayoutDashboard,
  MapPin,
  Heart,
  Settings,
  CloudSun,
  Menu,
  Bot,
  History,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";

import { useState } from "react";

const navigation = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    section: "WORKSPACE",
  },
  {
    name: "Explore Cities",
    icon: MapPin,
  },
  {
    name: "Favourites",
    icon: Heart,
  },
  {
    name: "Weather History",
    icon: History,
  },
  {
    name: "AI Assistant",
    icon: Bot,
    section: "INTELLIGENCE",
  },
];

export default function Sidebar({ activePage, setActivePage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigation = (page) => {
    setActivePage(page);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-slate-900 border border-white/10 text-cyan-400 shadow-lg"
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-270px min-h-screen
          flex flex-col
          bg-[#081426]/95 backdrop-blur-2xl
          border-r border-white/0.08
          p-5
          transition-transform duration-300
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 rounded-2xl 'bg-gradient-to-br' from-cyan-400/25 to-blue-500/20 border border-cyan-300/20 shadow-lg shadow-cyan-500/10">
              <CloudSun size={28} className="text-cyan-300" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                Sky<span className="text-cyan-400">Track</span>
              </h1>
              <p className="text-[9px] font-bold tracking-[2.5px] text-slate-500">
                WEATHER INTELLIGENCE
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
            aria-label="Close navigation"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <div className="mb-4 px-3">
          <p className="text-[10px] font-bold tracking-[2px] text-slate-500">
            WORKSPACE
          </p>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`
                  group relative w-full flex items-center gap-3
                  px-4 py-3.5 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r' from-cyan-400/15 to-blue-500/10 text-cyan-300 border border-cyan-400/20 shadow-lg shadow-cyan-950/20"
                      : "text-slate-400 border border-transparent hover:bg-white/[0.04 hover:text-white"
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-cyan-400" />
                )}

                <Icon
                  size={19}
                  className={
                    isActive
                      ? "text-cyan-300"
                      : "text-slate-500 group-hover:text-cyan-300"
                  }
                />

                <span className="flex-1 text-left">
                  {item.name}
                </span>

                {isActive && (
                  <ChevronRight size={16} className="text-cyan-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-5">

          {/* AI Promo Card */}
          <div className="relative overflow-hidden rounded-2xl p-4 border border-cyan-400/15 'bg-gradient-to-br' from-cyan-500/15 via-blue-500/10 to-indigo-500/10">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-cyan-400/10 blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-cyan-400/15">
                  <Sparkles size={19} className="text-cyan-300" />
                </div>

                <span className="text-[9px] font-bold tracking-wider text-cyan-300 border border-cyan-400/20 rounded-full px-2 py-1">
                  INTELLIGENCE
                </span>
              </div>

              <h3 className="text-white font-semibold text-sm">
                SkyTrack AI
              </h3>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Understand weather. Make smarter everyday decisions.
              </p>
            </div>
          </div>

          {/* Settings */}
          <button
            onClick={() => handleNavigation("Settings")}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition"
          >
            <Settings size={19} />
            Settings
          </button>

          {/* Footer */}
          <div className="border-t border-white/0.08 pt-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-xl 'bg-gradient-to-br' from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold">
                S
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  SkyTrack
                </p>
                <p className="text-[10px] text-slate-500">
                  Weather Intelligence Platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
