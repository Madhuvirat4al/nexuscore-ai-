import React, { useState } from 'react';
import { Navigation, AlertTriangle, ShieldCheck, Ship, Plane, Truck, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function SupplyChainMap({ target }) {
  const [activeRouteId, setActiveRouteId] = useState(target.supplyChain.activeRoutes[0]?.id || 'R1');

  const routes = target.supplyChain.activeRoutes;
  const activeRoute = routes.find(r => r.id === activeRouteId) || routes[0];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-cyan-400" />
            <h3 className="font-heading font-bold text-slate-100 text-base">Supply Chain Route Optimization Map</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">Maritime Corridors, Port Bottlenecks & Secondary Air Freight Contingency</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
            Active Routes: <span className="text-cyan-300 font-bold">{routes.length}</span>
          </span>
        </div>
      </div>

      {/* Interactive SVG Geographic Shipping Route Visualizer */}
      <div className="relative bg-[#070B16] rounded-2xl border border-white/10 p-6 overflow-hidden my-4">
        {/* Background Grid Lines & World Map Silhouette */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

        {/* SVG Route Diagrams */}
        <div className="relative z-10 h-64 w-full flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 800 300">
            {/* World Node Coordinates */}
            {/* Node 1: Asia Pacific Wafer / Hub */}
            <circle cx="150" cy="180" r="12" fill="#48CAE4" className="animate-ping opacity-75" />
            <circle cx="150" cy="180" r="8" fill="#48CAE4" />
            <text x="130" y="210" fill="#E2E8F0" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">Asia Pac Fab Hub</text>
            <text x="130" y="224" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">(Primary Origin)</text>

            {/* Node 2: Port Bottleneck / Transit Strait */}
            <circle cx="450" cy="140" r="10" fill="#FF5A5F" />
            <text x="420" y="115" fill="#FF5A5F" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">Bottleneck Strait</text>
            <text x="420" y="129" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">Transit Delay Zone</text>

            {/* Node 3: North American Gateway */}
            <circle cx="700" cy="120" r="8" fill="#06D6A0" />
            <text x="660" y="150" fill="#06D6A0" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">US Long Beach Port</text>
            <text x="660" y="164" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">Destination Hub</text>

            {/* Primary Maritime Route Arc (Corridor 1) */}
            <path
              d="M 150 180 Q 300 80 450 140 T 700 120"
              fill="none"
              stroke="#FF5A5F"
              strokeWidth={activeRouteId === 'R1' ? "4" : "2"}
              strokeDasharray="8 4"
              className="animate-pulse"
            />

            {/* Secondary Air Express Arc (Corridor 2) */}
            <path
              d="M 150 180 Q 400 240 700 120"
              fill="none"
              stroke="#06D6A0"
              strokeWidth={activeRouteId === 'R3' ? "4" : "2"}
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Route Selector Chips */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/10 relative z-20">
          {routes.map((r) => {
            const isSelected = r.id === activeRouteId;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRouteId(r.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {r.delayRisk === 'High' ? <Ship className="h-4 w-4 text-coral-400" /> : <Plane className="h-4 w-4 text-emerald-400" />}
                <span>{r.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                  r.delayRisk === 'High' ? 'bg-coral-500/20 text-coral-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {r.transitDays}d
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Route Details Card */}
      {activeRoute && (
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-slate-400">Selected Corridor</div>
            <div className="font-heading font-bold text-slate-100 text-sm mt-0.5">{activeRoute.name}</div>
          </div>
          <div>
            <div className="text-slate-400">Transit Duration & Risk</div>
            <div className="font-bold text-amber-300 mt-0.5 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {activeRoute.transitDays} Days ({activeRoute.delayRisk} Risk)
            </div>
          </div>
          <div>
            <div className="text-slate-400">Identified Bottleneck</div>
            <div className="font-bold text-coral-400 mt-0.5">{activeRoute.bottleneck}</div>
          </div>
        </div>
      )}

    </div>
  );
}
