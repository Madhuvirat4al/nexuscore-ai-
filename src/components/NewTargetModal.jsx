import React, { useState } from 'react';
import { X, Building2, PlusCircle, Sparkles } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';

export default function NewTargetModal({ isOpen, onClose, onTargetAdded }) {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [sector, setSector] = useState('Technology & Microelectronics');
  const [revenue, setRevenue] = useState('$10.0B');
  const [altmanZScore, setAltmanZScore] = useState(3.1);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !ticker) return;

    const newTarget = {
      id: `target-${ticker.toLowerCase()}-${Date.now()}`,
      ticker: ticker.toUpperCase(),
      name,
      sector,
      marketCap: "$25.0 Billion",
      rating: "BBB / Stable",
      financialViabilityScore: Math.round(70 + Math.random() * 25),
      supplyChainResilienceScore: Math.round(60 + Math.random() * 30),
      overallRiskCategory: "Custom User Analyzed Target",
      financials: {
        revenue,
        ebitda: "$2.5B",
        freeCashFlow: "$1.2B",
        workingCapital: "$1.1B",
        totalAssets: "$12.0B",
        retainedEarnings: "$4.0B",
        ebit: "$2.0B",
        marketCapVal: "$25.0B",
        totalLiabilities: "$5.0B",
        altmanZScore: parseFloat(altmanZScore),
        dcfValuationPerShare: "$95.00",
        currentStockPrice: "$82.00",
        debtToEquityRatio: "0.95",
        quickRatio: "1.30",
        financialAnomalyFlag: false
      },
      supplyChain: {
        singleSourceVendorDependency: "45% (Primary Component Supplier)",
        leadTimeVarianceDays: "+14 Days",
        reorderPointUnits: "250,000 Units",
        penaltyRiskExposure: "$25.0 Million",
        activeRoutes: [
          { id: "R-C1", name: "Primary Transpacific Corridor", delayRisk: "Medium", transitDays: 18, bottleneck: "Port Clearance" }
        ],
        topSuppliers: [
          { name: `${name} Key Supplier A`, tier: "Tier 1", criticality: "High", country: "USA", slaCompliance: 93.5 }
        ]
      },
      ragDocuments: [
        {
          id: `doc-${ticker.toLowerCase()}-1`,
          title: `SEC Form 10-K — ${name}`,
          type: "SEC Filing",
          fileSize: "2.5 MB",
          date: new Date().toISOString().slice(0, 10),
          textExcerpt: `${name} (${ticker}) 10-K Filing: Operational dependencies rely on tier-1 component contracts. Disclosure notes liquidity and cash flow reserves align with enterprise credit guidelines.`,
          flaggedIssues: ["Vendor Schedule Adherence", "Supply Chain Input Risk"]
        }
      ],
      sessionNotes: [
        { timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '), author: "Lead Analyst", note: `Created new target profile for ${name}. Indexed in Firestore.` }
      ]
    };

    firestoreService.saveCompany(newTarget);
    onTargetAdded(newTarget);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel-glow max-w-md w-full p-6 rounded-3xl border border-cyan-500/40 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-white">Analyze New Enterprise Target</h3>
            <p className="text-xs text-slate-400 font-mono">Index new company profile into Firestore persistent state</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-300 mb-1">Company Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Industrial Systems"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1">Ticker Symbol</label>
              <input
                type="text"
                required
                placeholder="e.g. AIS"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 uppercase"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Annual Revenue</label>
              <input
                type="text"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Industry Sector</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="Technology & Microelectronics">Technology & Microelectronics</option>
              <option value="Freight & Maritime Logistics">Freight & Maritime Logistics</option>
              <option value="Aerospace & National Security">Aerospace & National Security</option>
              <option value="Industrial Manufacturing">Industrial Manufacturing</option>
              <option value="Energy & Resources">Energy & Resources</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Estimated Altman Z-Score: {altmanZScore}</label>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={altmanZScore}
              onChange={(e) => setAltmanZScore(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 mt-4"
          >
            <Sparkles className="h-4 w-4" />
            Save & Run Full Agent Analysis
          </button>
        </form>
      </div>
    </div>
  );
}
