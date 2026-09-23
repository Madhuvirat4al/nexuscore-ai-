import React, { useState } from 'react';
import { Grid, Filter, AlertOctagon, Info, ArrowUpRight } from 'lucide-react';

export default function RiskHeatmap({ target, onSelectRiskCategory }) {
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);

  // 3x3 Heatmap Quadrants (Y-axis: Operational Risk, X-axis: Financial Risk)
  const quadrants = [
    { id: 'H-L', opRisk: 'High', finRisk: 'Low', label: 'Single-Point Supply Bottleneck', color: 'bg-coral-500/30 border-coral-500 text-coral-200', count: 3 },
    { id: 'H-M', opRisk: 'High', finRisk: 'Medium', label: 'Maritime SLA Penalty Exposure', color: 'bg-coral-600/50 border-coral-500 text-coral-100', count: 5 },
    { id: 'H-H', opRisk: 'High', finRisk: 'High', label: 'CRITICAL ENTERPRISE DISTRESS', color: 'bg-red-600 border-red-400 text-white font-bold animate-pulse-glow', count: 2 },
    
    { id: 'M-L', opRisk: 'Medium', finRisk: 'Low', label: 'Customs Clearance Lag', color: 'bg-amber-500/20 border-amber-500/40 text-amber-200', count: 2 },
    { id: 'M-M', opRisk: 'Medium', finRisk: 'Medium', label: 'Refinancing & Variable Rate Buffer', color: 'bg-amber-500/30 border-amber-500 text-amber-100', count: 4 },
    { id: 'M-H', opRisk: 'Medium', finRisk: 'High', label: 'Debt Covenants & Supplier Default', color: 'bg-coral-500/40 border-coral-400 text-coral-100', count: 3 },

    { id: 'L-L', opRisk: 'Low', finRisk: 'Low', label: 'PRISTINE OPTIMAL ZONE', color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200', count: 8 },
    { id: 'L-M', opRisk: 'Low', finRisk: 'Medium', label: 'Working Capital Seasonality', color: 'bg-blue-500/20 border-blue-500/40 text-blue-200', count: 3 },
    { id: 'L-H', opRisk: 'Low', finRisk: 'High', label: 'Leveraged Cash Buffer', color: 'bg-amber-500/30 border-amber-500/40 text-amber-200', count: 1 },
  ];

  // Determine active target quadrant
  const activeOp = target.supplyChainResilienceScore < 65 ? 'High' : target.supplyChainResilienceScore < 80 ? 'Medium' : 'Low';
  const activeFin = target.financials.altmanZScore < 2.0 ? 'High' : target.financials.altmanZScore < 3.0 ? 'Medium' : 'Low';
  const targetQuadrantId = `${activeOp[0]}-${activeFin[0]}`;

  return (
    <div className="glass-panel p-6 rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Grid className="h-5 w-5 text-cyan-400" />
            <h3 className="font-heading font-bold text-slate-100 text-base">Executive Risk Heatmap Matrix</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">Operational Supply Chain Risk vs Financial Balance Sheet Vulnerability</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Target Position:</span>
          <span className="px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5">
            <AlertOctagon className="h-3.5 w-3.5" />
            {target.name} [{activeOp} Op / {activeFin} Fin]
          </span>
        </div>
      </div>

      {/* 3x3 Quadrant Grid Layout */}
      <div className="grid grid-cols-3 gap-3 my-4">
        {quadrants.map((q) => {
          const isTargetHere = q.id === targetQuadrantId;
          const isSelected = selectedQuadrant === q.id;

          return (
            <button
              key={q.id}
              onClick={() => {
                setSelectedQuadrant(q.id);
                if (onSelectRiskCategory) onSelectRiskCategory(q);
              }}
              className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-28 ${q.color} ${
                isTargetHere ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0B132B] shadow-lg' : ''
              } ${isSelected ? 'scale-[1.03] z-10' : 'hover:opacity-90'}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono uppercase tracking-widest font-semibold opacity-80">
                  {q.opRisk} Op / {q.finRisk} Fin
                </span>
                {isTargetHere && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-400 text-slate-950 font-extrabold uppercase">
                    TARGET LOCATED
                  </span>
                )}
              </div>

              <div>
                <div className="font-heading font-bold text-xs leading-snug truncate-2">{q.label}</div>
                <div className="text-[10px] font-mono opacity-75 mt-1 flex items-center justify-between">
                  <span>{q.count} Risk Vectors</span>
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend & Selected Details */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500"></span> High Risk</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span> Medium Risk</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span> Safe Quadrant</span>
        </div>

        <div className="text-[11px] text-cyan-300">
          * Click any quadrant for grounded risk vector drill-down
        </div>
      </div>
    </div>
  );
}
