import React from 'react';
import SupplyChainMap from '../components/SupplyChainMap';
import SupplierNetworkTree from '../components/SupplierNetworkTree';
import { Cpu, Truck, Ship, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SupplyChainCommanderTab({ target }) {
  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-coral-500/10 border border-coral-500/30 text-coral-400">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-xl text-white">Supply Chain Operational Commander</h2>
            <p className="text-xs text-slate-400 font-mono">Live maritime route optimization, bottleneck defense & tier-1 vendor SLA monitoring</p>
          </div>
        </div>
      </div>

      {/* Key Supply Chain Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-[#0B132B]/90 border border-white/10 space-y-1">
          <div className="text-slate-400">Single-Source Reliance</div>
          <div className="font-heading font-extrabold text-base text-coral-400 truncate">{target.supplyChain.singleSourceVendorDependency}</div>
          <div className="text-[10px] text-slate-500">Tier-1 Reliance</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B132B]/90 border border-white/10 space-y-1">
          <div className="text-slate-400">Lead-Time Variance</div>
          <div className="font-heading font-extrabold text-base text-amber-300">{target.supplyChain.leadTimeVarianceDays}</div>
          <div className="text-[10px] text-slate-500">Asia Pacific Corridor</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B132B]/90 border border-white/10 space-y-1">
          <div className="text-slate-400">SLA Penalty Risk</div>
          <div className="font-heading font-extrabold text-base text-coral-400">{target.supplyChain.penaltyRiskExposure}</div>
          <div className="text-[10px] text-slate-500">Contractual Cap</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B132B]/90 border border-white/10 space-y-1">
          <div className="text-slate-400">Reorder Threshold</div>
          <div className="font-heading font-extrabold text-base text-cyan-300">{target.supplyChain.reorderPointUnits}</div>
          <div className="text-[10px] text-slate-500">Optimal Buffer</div>
        </div>
      </div>

      {/* Supply Chain Map */}
      <SupplyChainMap target={target} />

      {/* Supplier Dependency Network Tree */}
      <SupplierNetworkTree target={target} />

    </div>
  );
}
