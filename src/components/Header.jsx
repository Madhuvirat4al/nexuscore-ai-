import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  Layers,
  ChevronDown,
  Sparkles,
  PlusCircle,
  LogOut,
  UserCheck,
  Lock,
  Download,
  SlidersHorizontal,
  FileSearch,
  Cpu
} from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import ThemeLanguageSelector from './ThemeLanguageSelector';
import { i18nService } from '../services/i18nService';

export default function Header({ 
  activeTarget, 
  targets, 
  onSelectTarget, 
  onOpenNewTargetModal, 
  activeTab, 
  onTabChange,
  currentUser,
  onLogout,
  currentTheme,
  onSelectTheme,
  currentLang,
  onSelectLang
}) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: i18nService.getText(currentLang, 'navOverview'), icon: Layers },
    { id: 'financial', label: i18nService.getText(currentLang, 'navFinancial'), icon: ShieldCheck },
    { id: 'supplyChain', label: i18nService.getText(currentLang, 'navSupplyChain'), icon: Cpu },
    { id: 'simulator', label: i18nService.getText(currentLang, 'navSimulator'), icon: SlidersHorizontal },
    { id: 'vault', label: i18nService.getText(currentLang, 'navVault'), icon: FileSearch },
  ];

  return (
    <header className="terminal-header sticky top-0 z-40 px-6 py-3 border-b border-white/10 shadow-2xl backdrop-blur-xl bg-[#0B132B]/90">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Brand & Target Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                  {i18nService.getText(currentLang, 'brandTitle')}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 tracking-widest uppercase">
                  ENTERPRISE COPILOT
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {i18nService.getText(currentLang, 'brandSubtitle')}
              </p>
            </div>
          </div>

          {/* Target Switcher */}
          <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#1C2541]/80 hover:bg-[#1C2541] border border-white/10 text-sm font-medium text-slate-200 transition-all hover:border-cyan-500/40">
                <Building2 className="h-4 w-4 text-cyan-400" />
                <span className="font-heading font-semibold text-cyan-100">{activeTarget.name} ({activeTarget.ticker})</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-300 transition-transform" />
              </button>

              <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#0B132B] border border-white/15 shadow-2xl p-2 hidden group-hover:block z-50 backdrop-blur-2xl">
                <div className="text-[11px] font-mono text-slate-400 px-3 py-1.5 font-semibold uppercase tracking-wider">SELECT TARGET ENTERPRISE</div>
                {targets.map(t => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTarget(t)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                      t.id === activeTarget.id 
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{t.sector} • {t.ticker}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      t.financialViabilityScore > 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-coral-500/20 text-coral-400'
                    }`}>
                      Score: {t.financialViabilityScore}
                    </span>
                  </button>
                ))}

                <div className="border-t border-white/10 my-1"></div>
                <button
                  onClick={onOpenNewTargetModal}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-cyan-400 hover:bg-cyan-500/10 flex items-center gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  Analyze New Target Enterprise...
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Session, Theme & Language Controls */}
        <div className="flex items-center gap-3 self-end lg:self-center">
          
          <ThemeLanguageSelector
            currentTheme={currentTheme}
            onSelectTheme={onSelectTheme}
            currentLang={currentLang}
            onSelectLang={onSelectLang}
          />

          {/* User Session Isolation Badge */}
          {currentUser && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <UserCheck className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-semibold hidden xl:inline">{currentUser.name}</span>
              <button
                onClick={onLogout}
                className="ml-1 text-slate-400 hover:text-coral-400"
                title="Logout Session"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={() => firestoreService.exportDatabaseDump()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-medium text-cyan-300 transition-all"
            title="Export Firestore JSON Audit Log"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{i18nService.getText(currentLang, 'exportAudit')}</span>
          </button>
        </div>

      </div>

      {/* Main Tab Navigation */}
      <nav className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1 border-t border-white/5 pt-3 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-white/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
