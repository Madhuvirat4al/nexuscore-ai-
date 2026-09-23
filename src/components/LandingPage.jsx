import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Terminal, 
  Globe, 
  Building2,
  Users,
  Award,
  Zap
} from 'lucide-react';

export default function LandingPage({ onOpenLogin, onLaunchDemo }) {
  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Marketing Navigation Bar */}
      <nav className="border-b border-white/10 bg-[#0B132B]/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-wider text-white">NEXUSCORE<span className="text-cyan-400">.AI</span></span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest">ENTERPRISE SAAS</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onLaunchDemo}
              className="text-xs font-mono text-slate-300 hover:text-cyan-300 hidden sm:block"
            >
              Interactive Product Demo
            </button>
            <button
              onClick={onOpenLogin}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              <Lock className="h-4 w-4" />
              <span>Client Portal Login / OTP</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden py-20 px-6 bg-grid-pattern">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Award className="h-4 w-4 text-cyan-400" />
            <span>COMMERCIAL ENTERPRISE SUPPLY CHAIN & FINANCIAL AUDIT COPILOT</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            Enterprise Financial Diligence Meets <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">Supply Chain Resilience</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-sans leading-relaxed">
            NexusCore AI combines **Vertex AI RAG Knowledge Grounding**, **Sandboxed Python Financial Math**, and **Real-Time Agentic AI** into a multi-tenant, end-to-end encrypted executive dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition-all shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-3 group"
            >
              <span>Authenticate with Mobile / Email OTP</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onLaunchDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1C2541] hover:bg-[#253258] border border-white/10 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>Launch Instant Workspace Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">Built for Fortune 500 Enterprise Risk Teams</h2>
          <p className="text-xs font-mono text-slate-400">Strict End-to-End Data Isolation • Self-Hosted User Workspaces • Real-Time Agentic AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/10 hover:border-cyan-500/40 transition-all">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit border border-cyan-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">Vertex AI RAG Grounding</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Ground financial risk disclosures against contractual SLA obligations. Verbatim line citations for SEC 10-K, 10-Q, and supplier manifests.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/10 hover:border-cyan-500/40 transition-all">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit border border-cyan-500/30">
              <Terminal className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">Sandboxed Python Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Execute live Python scripts for Altman Z-Score bankruptcy risk, 5-Year DCF valuations, and maritime lead-time variance models in isolated containers.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/10 hover:border-cyan-500/40 transition-all">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit border border-cyan-500/30">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">Multi-Tenant Vault Isolation</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              End-to-end encrypted user vaults. User session queries, target analysis profiles, and audit notes are strictly isolated per tenant account.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Commercial Notice */}
      <footer className="mt-auto border-t border-white/10 bg-[#0B132B] py-6 px-6 text-center text-xs font-mono text-slate-500">
        <p>© 2026 NexusCore AI Enterprise Copilot • Licensed SaaS Platform • All Rights Reserved</p>
      </footer>

    </div>
  );
}
