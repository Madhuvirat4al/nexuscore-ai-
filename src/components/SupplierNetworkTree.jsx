import React from 'react';
import { GitBranch, ShieldCheck, AlertCircle, Globe, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function SupplierNetworkTree({ target }) {
  const suppliers = target.supplyChain.topSuppliers || [];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-cyan-400" />
            <h3 className="font-heading font-bold text-slate-100 text-base">Supplier Network Dependency Tree</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">Multi-Tier Vendor Topology & SLA Compliance Tracking</p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
          Tier 1 & Tier 2 Nodes Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suppliers.map((sup, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-[#0B132B]/80 border border-white/10 flex flex-col justify-between space-y-3 font-mono text-xs hover:border-cyan-500/40 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-white/10 text-slate-300">
                  {sup.tier}
                </span>
                <h4 className="font-heading font-bold text-slate-100 text-sm mt-1">{sup.name}</h4>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                sup.criticality === 'Critical' ? 'bg-coral-500/20 text-coral-400 border border-coral-500/30' :
                'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {sup.criticality} Risk
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-white/5">
              <div>
                <span className="text-slate-400">Jurisdiction:</span>
                <div className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                  <Globe className="h-3 w-3 text-cyan-400" /> {sup.country}
                </div>
              </div>
              <div>
                <span className="text-slate-400">SLA Compliance:</span>
                <div className={`font-semibold mt-0.5 ${sup.slaCompliance >= 95 ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {sup.slaCompliance}%
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/5">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> SLA Contract On-File
              </span>
              <span>Node ID: NX-SUP-00{idx+1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
