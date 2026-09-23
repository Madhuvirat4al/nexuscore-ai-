import React, { useState, useEffect } from 'react';
import { Sliders, RefreshCw, Zap, TrendingDown, ShieldCheck } from 'lucide-react';
import { pythonSandboxEngine } from '../services/pythonSandboxEngine';
import { ScenarioEbitdaChart } from './FinancialCharts';

export default function ScenarioSimulator({ target, onSimResultsUpdate }) {
  const [inflation, setInflation] = useState(3.5);
  const [shippingDelayDays, setShippingDelayDays] = useState(14);
  const [tariffRate, setTariffRate] = useState(12.0);
  const [materialShock, setMaterialShock] = useState(8.5);
  const [vendorFailureProb, setVendorFailureProb] = useState(15);

  const [simResult, setSimResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const runSimulation = async () => {
    setIsCalculating(true);
    try {
      const res = await pythonSandboxEngine.runPythonScript('supply_chain_scenario_sim', {
        inflation,
        shippingDelayDays,
        tariffRate,
        materialShock,
        vendorFailureProb
      });
      setSimResult(res.result);
      if (onSimResultsUpdate) onSimResultsUpdate(res.result);
    } catch (e) {
      console.error("Simulation error:", e);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [inflation, shippingDelayDays, tariffRate, materialShock, vendorFailureProb, target.id]);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-cyan-400" />
            <h3 className="font-heading font-bold text-slate-100 text-base">Unified Risk Scenario Simulator</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">Real-Time Macroeconomic & Maritime Disruption Stress Testing Engine</p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isCalculating}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold hover:bg-cyan-500/20 transition-all"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isCalculating ? 'animate-spin' : ''}`} />
          Recalculate Python Model
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sliders Panel */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Slider 1: Inflation Rate */}
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold">Macro Inflation Escalation Rate:</span>
              <span className="text-cyan-300 font-bold">{inflation.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={inflation}
              onChange={(e) => setInflation(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Baseline)</span>
              <span>7.5% (High Inflation)</span>
              <span>15% (Hyper-Escalation)</span>
            </div>
          </div>

          {/* Slider 2: Shipping Delay Days */}
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold">Maritime Lead-Time Delay (Days):</span>
              <span className="text-amber-300 font-bold">{shippingDelayDays} Days</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="1"
              value={shippingDelayDays}
              onChange={(e) => setShippingDelayDays(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 Days (On-time SLA)</span>
              <span>30 Days (Port Stoppage)</span>
              <span>60 Days (Strait Closure)</span>
            </div>
          </div>

          {/* Slider 3: Tariff Rate */}
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold">Import Tariff & Trade Barrier Rate:</span>
              <span className="text-coral-300 font-bold">{tariffRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              step="0.5"
              value={tariffRate}
              onChange={(e) => setTariffRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-coral-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Free Trade)</span>
              <span>15% (Moderate Tariff)</span>
              <span>35% (Severe Trade Sanctions)</span>
            </div>
          </div>

          {/* Slider 4: Material Price Shock */}
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold">Raw Material / Wafer Cost Increase:</span>
              <span className="text-purple-300 font-bold">{materialShock.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="0.5"
              value={materialShock}
              onChange={(e) => setMaterialShock(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0%</span>
              <span>15%</span>
              <span>30%</span>
            </div>
          </div>

        </div>


        {/* Simulation Output Dashboard Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-[#0B132B]/90 border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">PYTHON STRESS TEST RESULTS</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                REAL-TIME RE-CALC
              </span>
            </div>

            {simResult && (
              <>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Projected EBITDA Erosion</div>
                  <div className="text-3xl font-heading font-black text-coral-400 tracking-tight flex items-center gap-1.5 my-1">
                    <TrendingDown className="h-7 w-7 text-coral-400" />
                    -${simResult.totalEbitdaLoss} Million
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    EBITDA Reduced by <span className="text-coral-300 font-bold">-{simResult.ebitdaLossPercent}%</span> (Adjusted: ${simResult.adjustedEbitda}M)
                  </div>
                </div>

                {/* Live Recharts Loss Breakdown Chart */}
                <div className="my-2 p-2 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-mono text-slate-400 mb-1 px-2 font-semibold">EBITDA Loss Vector Distribution ($M)</div>
                  <ScenarioEbitdaChart breakdown={simResult.breakdown} />
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Recalculated SC Resilience</div>
                    <div className="font-heading font-extrabold text-2xl text-cyan-300">{simResult.combinedResilienceScore} / 100</div>
                  </div>
                  <ShieldCheck className="h-8 w-8 text-cyan-400 opacity-80" />
                </div>
              </>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <Zap className="h-3.5 w-3.5" /> Python Engine Live
            </span>
            <span>Scenario ID: NX-SIM-2026</span>
          </div>

        </div>

      </div>
    </div>
  );
}
