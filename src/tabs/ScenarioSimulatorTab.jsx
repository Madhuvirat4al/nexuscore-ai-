import React from 'react';
import ScenarioSimulator from '../components/ScenarioSimulator';
import PythonSandboxTerminal from '../components/PythonSandboxTerminal';
import { Sliders, Sparkles, TrendingDown, RefreshCw } from 'lucide-react';

export default function ScenarioSimulatorTab({ target }) {
  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sliders className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-xl text-white">Unified Executive Risk Scenario Simulator</h2>
            <p className="text-xs text-slate-400 font-mono">Simulate macro inflation, maritime delays, tariff spikes, and material cost shocks via Python engine</p>
          </div>
        </div>
      </div>

      {/* Main Scenario Simulator Slider Controls */}
      <ScenarioSimulator target={target} />

      {/* Embedded Python Execution Sandbox */}
      <PythonSandboxTerminal target={target} />

    </div>
  );
}
