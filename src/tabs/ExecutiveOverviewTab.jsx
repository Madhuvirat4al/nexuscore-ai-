import React from 'react';
import ExecutiveScorecard from '../components/ExecutiveScorecard';
import RiskHeatmap from '../components/RiskHeatmap';
import PythonSandboxTerminal from '../components/PythonSandboxTerminal';
import ScenarioSimulator from '../components/ScenarioSimulator';
import { Sparkles, ShieldCheck, AlertCircle, ArrowUpRight, Award, Zap } from 'lucide-react';
import { mediaGeneratorService } from '../services/mediaGeneratorService';

export default function ExecutiveOverviewTab({ target, onNavigateTab }) {
  const badgeCard = mediaGeneratorService.generateExecutiveCard(target);

  return (
    <div className="space-y-6">
      
      {/* Target Banner Overview Card */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden border border-cyan-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ACTIVE TARGET :: {target.ticker}
              </span>
              <span className="text-xs text-slate-400 font-mono">Market Cap: {target.marketCap}</span>
              <span className="text-xs text-slate-400 font-mono">Rating: {target.rating}</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
              {target.name}
            </h1>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span>Sector: <strong className="text-slate-200">{target.sector}</strong></span>
              <span>•</span>
              <span className="text-cyan-400 font-bold">Overall Risk: {target.overallRiskCategory}</span>
            </p>
          </div>

          {/* Generated Media Executive Risk Badge (Pillar 4) */}
          <div className="p-4 rounded-2xl bg-[#0B132B] border border-cyan-500/40 font-mono text-xs flex flex-col justify-between space-y-2 shrink-0 shadow-lg shadow-cyan-500/10">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Award className="h-4 w-4" /> Pillar 4 Media Badge
              </span>
              <span className="text-[10px] text-slate-500">{badgeCard.generatedAt}</span>
            </div>

            <div className="font-heading font-extrabold text-xs text-slate-100 uppercase tracking-wide">
              {badgeCard.statusText}
            </div>

            <div className="flex items-center gap-3 pt-1 border-t border-white/10 text-[11px]">
              <div>Z-Score: <strong className="text-cyan-300">{target.financials.altmanZScore}</strong></div>
              <div>SC Score: <strong className="text-coral-400">{target.supplyChainResilienceScore}/100</strong></div>
            </div>
          </div>

        </div>
      </div>

      {/* Dual Executive Health Scorecard (Pillar 5) */}
      <ExecutiveScorecard target={target} />

      {/* Risk Heatmap Matrix (Pillar 5) */}
      <RiskHeatmap target={target} onSelectRiskCategory={() => onNavigateTab('financial')} />

      {/* Embedded Python Sandbox Engine (Pillar 2) */}
      <PythonSandboxTerminal target={target} />

      {/* Interactive Scenario Stress Tester (Pillar 5 & 2) */}
      <ScenarioSimulator target={target} />

    </div>
  );
}
