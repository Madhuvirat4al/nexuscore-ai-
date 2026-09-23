import React, { useState, useEffect } from 'react';
import { Terminal, Play, Cpu, CheckCircle, RefreshCw, Code, Sparkles, Copy } from 'lucide-react';
import { pythonSandboxEngine } from '../services/pythonSandboxEngine';

export default function PythonSandboxTerminal({ target }) {
  const [activeScript, setActiveScript] = useState('altman_z_score');
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [executionTime, setExecutionTime] = useState(null);
  const [copied, setCopied] = useState(false);

  // Default Inputs based on current target enterprise
  const [customInputs, setCustomInputs] = useState({
    workingCapital: parseFloat(target.financials.workingCapital.replace(/[^0-9.]/g, '')) * 1000,
    totalAssets: parseFloat(target.financials.totalAssets.replace(/[^0-9.]/g, '')) * 1000,
    retainedEarnings: parseFloat(target.financials.retainedEarnings.replace(/[^0-9.]/g, '')) * 1000,
    ebit: parseFloat(target.financials.ebit.replace(/[^0-9.]/g, '')) * 1000,
    marketCap: parseFloat(target.financials.marketCapVal.replace(/[^0-9.]/g, '')) * 1000,
    totalLiabilities: parseFloat(target.financials.totalLiabilities.replace(/[^0-9.]/g, '')) * 1000,
    freeCashFlow: parseFloat(target.financials.freeCashFlow.replace(/[^0-9.]/g, '')) * 1000,
    growthRate: 0.08,
    wacc: 0.09,
    terminalGrowth: 0.025,
  });

  const handleRunScript = async (scriptKey = activeScript) => {
    setIsRunning(true);
    setTerminalOutput(`[PYTHON SANDBOX INITIALIZING]...\nLoading isolated runtime environment for ${target.ticker}...\nExecuting math script: ${scriptKey}.py...\n`);
    
    try {
      const result = await pythonSandboxEngine.runPythonScript(scriptKey, customInputs);
      setTerminalOutput(result.stdout);
      setExecutionTime(result.executionTimeMs);
    } catch (err) {
      setTerminalOutput(`Error executing sandbox script: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    handleRunScript(activeScript);
  }, [target.id, activeScript]);

  const copyConsoleOutput = () => {
    navigator.clipboard.writeText(terminalOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl font-mono border border-cyan-500/20">
      
      {/* Terminal Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-slate-100 text-base">Python Code Execution Sandbox</h3>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Pillar 2 Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">Real-time financial math & supply chain optimization engine</p>
          </div>
        </div>

        {/* Script Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveScript('altman_z_score')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeScript === 'altman_z_score'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            altman_z_score.py
          </button>
          <button
            onClick={() => setActiveScript('dcf_valuation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeScript === 'dcf_valuation'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            dcf_valuation.py
          </button>
          <button
            onClick={() => setActiveScript('supply_chain_scenario_sim')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeScript === 'supply_chain_scenario_sim'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            scenario_simulator.py
          </button>
        </div>
      </div>

      {/* Code Console Output Screen */}
      <div className="relative bg-[#070B16] rounded-2xl border border-white/10 p-4 font-mono text-xs text-cyan-300 shadow-inner min-h-[220px] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2 text-[11px] text-slate-500 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 text-slate-400 font-semibold">NexusCore Python Sandbox v3.4 [x86_64-pyodide]</span>
          </div>
          <div className="flex items-center gap-3">
            {executionTime && (
              <span className="text-emerald-400">⚡ Executed in {executionTime}ms</span>
            )}
            <button
              onClick={copyConsoleOutput}
              className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              title="Copy Output"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Terminal Screen Text */}
        <pre className="overflow-x-auto whitespace-pre-wrap text-emerald-300 leading-relaxed my-2 font-mono selection:bg-cyan-500/30">
          {terminalOutput}
        </pre>

        {/* Execute Controls */}
        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Grounded target inputs loaded automatically from SEC & Balance Sheet
          </span>
          <button
            onClick={() => handleRunScript(activeScript)}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Running Python...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Re-Execute Script</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
