import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import OTPAuthModal from './components/OTPAuthModal';
import AgenticAIChatbot from './components/AgenticAIChatbot';
import Header from './components/Header';
import ExecutiveOverviewTab from './tabs/ExecutiveOverviewTab';
import FinancialDiligenceTab from './tabs/FinancialDiligenceTab';
import SupplyChainCommanderTab from './tabs/SupplyChainCommanderTab';
import ScenarioSimulatorTab from './tabs/ScenarioSimulatorTab';
import MemoryAuditVaultTab from './tabs/MemoryAuditVaultTab';
import NewTargetModal from './components/NewTargetModal';
import { firestoreService } from './services/firestoreService';
import { authService } from './services/authService';
import { themeService } from './services/themeService';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'workspace'
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // App Theme & i18n Language State
  const [currentTheme, setCurrentTheme] = useState(themeService.getCurrentTheme());
  const [currentLang, setCurrentLang] = useState('en');

  // Enterprise Targets State
  const [companies, setCompanies] = useState([]);
  const [activeTarget, setActiveTarget] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isNewTargetModalOpen, setIsNewTargetModalOpen] = useState(false);

  useEffect(() => {
    // Check initial user session
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setViewMode('workspace');
    }
    loadCompanies();
  }, []);

  const loadCompanies = () => {
    const list = firestoreService.getCompanies();
    setCompanies(list);
    if (!activeTarget && list.length > 0) {
      setActiveTarget(list[0]);
    } else if (activeTarget) {
      const updated = list.find(c => c.id === activeTarget.id);
      if (updated) setActiveTarget(updated);
    }
  };

  const handleSelectTheme = (themeId) => {
    const t = themeService.applyTheme(themeId);
    setCurrentTheme(t);
  };

  const handleSelectLang = (langCode) => {
    setCurrentLang(langCode);
  };

  const handleAuthSuccess = (userSession) => {
    setCurrentUser(userSession);
    setViewMode('workspace');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setViewMode('landing');
  };

  const handleSelectTarget = (target) => {
    setActiveTarget(target);
  };

  const handleTargetAdded = (newTarget) => {
    loadCompanies();
    setActiveTarget(newTarget);
  };

  // If in landing mode (or user logged out), render commercial SaaS landing page
  if (viewMode === 'landing') {
    return (
      <>
        <LandingPage
          onOpenLogin={() => setIsAuthModalOpen(true)}
          onLaunchDemo={() => setViewMode('workspace')}
        />
        <OTPAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  if (!activeTarget) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center font-mono text-cyan-300">
        Initializing NexusCore AI Engine...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Header & Navigation Bar */}
      <Header
        activeTarget={activeTarget}
        targets={companies}
        onSelectTarget={handleSelectTarget}
        onOpenNewTargetModal={() => setIsNewTargetModalOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
      />

      {/* Main Container Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {activeTab === 'overview' && (
          <ExecutiveOverviewTab 
            target={activeTarget} 
            onNavigateTab={setActiveTab} 
          />
        )}

        {activeTab === 'financial' && (
          <FinancialDiligenceTab 
            target={activeTarget} 
          />
        )}

        {activeTab === 'supplyChain' && (
          <SupplyChainCommanderTab 
            target={activeTarget} 
          />
        )}

        {activeTab === 'simulator' && (
          <ScenarioSimulatorTab 
            target={activeTarget} 
          />
        )}

        {activeTab === 'vault' && (
          <MemoryAuditVaultTab 
            target={activeTarget} 
            onTargetUpdate={loadCompanies} 
          />
        )}
      </main>

      {/* Embedded Agentic AI Chatbot Drawer (Floating) */}
      <AgenticAIChatbot target={activeTarget} />

      {/* Footer Audit Bar */}
      <footer className="border-t border-white/10 bg-[#0B132B]/80 py-4 px-6 text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          <span>NEXUSCORE AI ENTERPRISE SAAS PLATFORM :: CLIENT DEPLOYMENT READY</span>
        </div>
        <div>
          User Session: <span className="text-cyan-300 font-semibold">{currentUser ? currentUser.name : 'Executive Demo'}</span>
        </div>
      </footer>

      {/* Modal for adding custom target enterprise */}
      <NewTargetModal
        isOpen={isNewTargetModalOpen}
        onClose={() => setIsNewTargetModalOpen(false)}
        onTargetAdded={handleTargetAdded}
      />

      {/* Auth Modal */}
      <OTPAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
