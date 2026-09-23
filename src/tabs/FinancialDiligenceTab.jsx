import React from 'react';
import RAGDocumentViewer from '../components/RAGDocumentViewer';
import PythonSandboxTerminal from '../components/PythonSandboxTerminal';
import { DCFValuationChart, AltmanZRadarChart } from '../components/FinancialCharts';
import { DollarSign, ShieldCheck, TrendingUp, Activity, BarChart3 } from 'lucide-react';

export default function FinancialDiligenceTab({ target }) {
  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-xl text-white">Financial Due Diligence & SEC Audit Engine</h2>
            <p className="text-xs text-slate-400 font-mono">Grounded document verification & real-time bankruptcy/DCF valuation analytics</p>
          </div>
        </div>
      </div>

      {/* Balance Sheet Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-[#0B132B]/90 border border-white/10 space-y-1">
          <div className="text-slate-400">Annual Revenue</div>
          <div className="font-heading font-extrabold text-xl text-cyan-300">{target.financials.revenue}</div>
          <div className="text-[10px] text-slate-500">10-K Verified</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B132B]/90 border border-white/10 space-y-1">
          <div className="text-slate-400">Altman Z-Score</div>
          <div className={`font-heading font-extrabold text-xl ${target.financials.altmanZScore > 2.99 ? 'text-emerald-400' : 'text-coral-400'}`}>
            {target.financials.altmanZScore}
          </div>
          <div className="text-[10px] text-slate-500">{target.financials.altmanZScore > 2.99 ? 'Safe Zone' : 'Distress Watch'}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B132B]/90 border border-white/10 space-y-1">
          <div className="text-slate-400">DCF Val / Share</div>
          <div className="font-heading font-extrabold text-xl text-cyan-300">{target.financials.dcfValuationPerShare}</div>
          <div className="text-[10px] text-slate-500">Stock Price: {target.financials.currentStockPrice}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B132B]/90 border border-white/10 space-y-1">
          <div className="text-slate-400">Total Liabilities</div>
          <div className="font-heading font-extrabold text-xl text-slate-200">{target.financials.totalLiabilities}</div>
          <div className="text-[10px] text-slate-500">D/E Ratio: {target.financials.debtToEquityRatio}</div>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* DCF Cash Flow Projection Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            <div>
              <h3 className="font-heading font-bold text-slate-100 text-sm">5-Year Discounted Cash Flow (DCF) Model</h3>
              <p className="text-[11px] text-slate-400 font-mono">Nominal vs Discounted Present Value Cash Flows ($M)</p>
            </div>
          </div>
          <DCFValuationChart />
        </div>

        {/* Altman Z-Score 5-Factor Radar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-cyan-400" />
            <div>
              <h3 className="font-heading font-bold text-slate-100 text-sm">Altman Z-Score 5-Factor Vector Radar</h3>
              <p className="text-[11px] text-slate-400 font-mono">Working Cap, Retained Earnings, EBIT, Market Equity, Asset Turnover</p>
            </div>
          </div>
          <AltmanZRadarChart />
        </div>

      </div>

      {/* RAG Grounding Viewer */}
      <RAGDocumentViewer target={target} />

      {/* Python Code Execution Sandbox */}
      <PythonSandboxTerminal target={target} />

    </div>
  );
}
