import React from 'react';
import { ShieldAlert, TrendingUp, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';

export default function ExecutiveScorecard({ target }) {
  const finScore = target.financialViabilityScore;
  const scScore = target.supplyChainResilienceScore;

  // Calculate gauge offsets (circumference = 2 * PI * r = 2 * 3.14159 * 52 ≈ 326.7)
  const getStrokeOffset = (score) => 326.7 - (326.7 * score) / 100;

  const getScoreColor = (score) => {
    if (score >= 80) return '#06D6A0'; // Emerald
    if (score >= 60) return '#FFD166'; // Gold
    return '#FF5A5F'; // Coral Warning
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Meter 1: Financial Viability Scorecard */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-100 text-base">Financial Viability Scorecard</h3>
              <p className="text-xs text-slate-400 font-mono">Altman Z-Score & Debt Solvency Model</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/5 border border-white/10 text-slate-300">
            Pillar 2 Sandbox
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 my-2">
          {/* Circular Radial Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                stroke={getScoreColor(finScore)}
                strokeWidth="10"
                strokeDasharray="326.7"
                strokeDashoffset={getStrokeOffset(finScore)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-heading font-black text-3xl text-white tracking-tight">{finScore}</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">/ 100 INDEX</span>
            </div>
          </div>

          {/* Quick Metrics List */}
          <div className="flex-1 w-full space-y-2.5 font-mono text-xs">
            <div className="flex justify-between items-center p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400">Altman Z-Score:</span>
              <span className={`font-semibold ${target.financials.altmanZScore > 2.99 ? 'text-emerald-400' : 'text-coral-400'}`}>
                {target.financials.altmanZScore} ({target.financials.altmanZScore > 2.99 ? 'Safe Zone' : 'Distress Watch'})
              </span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400">DCF Val / Share:</span>
              <span className="font-semibold text-cyan-300">{target.financials.dcfValuationPerShare}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400">Debt-to-Equity Ratio:</span>
              <span className="font-semibold text-slate-200">{target.financials.debtToEquityRatio}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
            <CheckCircle2 className="h-4 w-4" /> SEC 10-K Solvency Verified
          </span>
          <span className="font-mono text-[11px]">Updated 5m ago</span>
        </div>
      </div>


      {/* Meter 2: Supply Chain Resilience Scorecard */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:border-coral-500/40 transition-all">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-coral-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-coral-500/10 border border-coral-500/20 text-coral-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-100 text-base">Supply Chain Resilience Scorecard</h3>
              <p className="text-xs text-slate-400 font-mono">SLA Penalty & Route Disruption Matrix</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/5 border border-white/10 text-slate-300">
            Pillar 1 RAG Verified
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 my-2">
          {/* Circular Radial Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                stroke={getScoreColor(scScore)}
                strokeWidth="10"
                strokeDasharray="326.7"
                strokeDashoffset={getStrokeOffset(scScore)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-heading font-black text-3xl text-white tracking-tight">{scScore}</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">/ 100 INDEX</span>
            </div>
          </div>

          {/* Quick Metrics List */}
          <div className="flex-1 w-full space-y-2.5 font-mono text-xs">
            <div className="flex justify-between items-center p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400">Vendor Dependency:</span>
              <span className="font-semibold text-coral-400 truncate max-w-[140px]" title={target.supplyChain.singleSourceVendorDependency}>
                {target.supplyChain.singleSourceVendorDependency}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400">Lead-Time Variance:</span>
              <span className="font-semibold text-amber-300">{target.supplyChain.leadTimeVarianceDays}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400">SLA Penalty Risk:</span>
              <span className="font-semibold text-coral-400">{target.supplyChain.penaltyRiskExposure}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-amber-400 font-mono">
            <AlertTriangle className="h-4 w-4" /> Single-Source Dependency Flagged
          </span>
          <span className="font-mono text-[11px]">3 Corridors Active</span>
        </div>
      </div>

    </div>
  );
}
