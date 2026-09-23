import React, { useState, useEffect } from 'react';
import { Bot, Send, Sparkles, X, Terminal, FileText, CheckCircle2, ChevronRight, Zap, Key, Settings, Check } from 'lucide-react';
import { agenticAIService } from '../services/agenticAIService';

export default function AgenticAIChatbot({ target }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState(agenticAIService.getApiKey());
  const [tempKey, setTempKey] = useState(apiKey);

  const [messages, setMessages] = useState([
    {
      id: 'm-init',
      sender: 'agent',
      text: `Hello! I am your **NexusCore Generative Agentic AI Copilot**.\n\nI operate with sandboxed Python math engines, SEC Form 10-K RAG document stores, and real **Google Gemini API** generative models for **${target.name}**. What would you like to analyze?`,
      thoughtSteps: ["Initializing agentic reasoning pipeline...", "Grounded SEC document store connected", "Python sandbox engine ready"],
      timestamp: 'Now'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const quickPrompts = [
    "Run Altman Z-Score model",
    "Calculate DCF intrinsic valuation",
    "Search SEC 10-K & SLA penalties",
    "Simulate 30d shipping delay shock"
  ];

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    agenticAIService.setApiKey(tempKey);
    setApiKey(tempKey);
    setShowKeyModal(false);
  };

  const handleSendMessage = async (promptText) => {
    const query = promptText || inputPrompt;
    if (!query.trim()) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    try {
      const agentReply = await agenticAIService.processMessage(query, target, apiKey);
      setMessages(prev => [...prev, agentReply]);
    } catch (err) {
      console.error("Agent chat error:", err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono text-xs">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-2xl shadow-cyan-500/40 ring-2 ring-white/20 transition-all transform hover:scale-105"
        >
          <Bot className="h-5 w-5 animate-pulse" />
          <span>Gemini Agentic AI</span>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      )}

      {/* Expanded Chatbot Drawer Panel */}
      {isOpen && (
        <div className="glass-panel-glow w-96 sm:w-[480px] h-[580px] rounded-3xl border border-cyan-500/40 shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-[#0B132B] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-slate-100 text-sm flex items-center gap-2">
                  <span>NexusCore Agentic AI</span>
                  {apiKey && <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Gemini LLM Active</span>}
                </div>
                <div className="text-[10px] text-cyan-400 font-semibold">Vertex AI RAG • Python Sandbox • Gemini API</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowKeyModal(!showKeyModal)}
                className={`p-2 rounded-xl border transition-all ${
                  apiKey ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Configure Gemini API Key"
              >
                <Key className="h-4 w-4" />
              </button>

              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Optional Gemini API Key Configuration Drawer */}
          {showKeyModal && (
            <form onSubmit={handleSaveApiKey} className="p-3.5 bg-slate-900 border-b border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-cyan-300">
                <span>Google Gemini API Key Integration</span>
                <span className="text-[9px] text-slate-400 font-normal">Optional</span>
              </div>
              <input
                type="password"
                placeholder="Paste Gemini API Key (AIza...)"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 font-mono"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-3 py-1 rounded-lg text-slate-400 hover:text-white text-[11px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[11px] hover:bg-cyan-400 flex items-center gap-1"
                >
                  <Check className="h-3.5 w-3.5" /> Save Key
                </button>
              </div>
            </form>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#070B16]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-4 rounded-2xl max-w-[90%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/40 font-sans'
                      : 'bg-[#1C2541] text-slate-200 border border-white/10 font-sans'
                  }`}
                >
                  {/* Step-by-Step Reasoning Trace */}
                  {m.thoughtSteps && m.thoughtSteps.length > 0 && (
                    <div className="mb-3 p-2.5 rounded-xl bg-slate-950/60 border border-cyan-500/20 font-mono text-[10px] space-y-1">
                      <div className="text-cyan-400 font-bold flex items-center gap-1.5 uppercase tracking-wider mb-1">
                        <Sparkles className="h-3 w-3" /> Reasoning Trace ({m.thoughtSteps.length} Steps)
                      </div>
                      {m.thoughtSteps.map((step, idx) => (
                        <div key={idx} className="text-slate-400 flex items-center gap-1.5">
                          <ChevronRight className="h-3 w-3 text-cyan-400 shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Main Message Text */}
                  <div className="whitespace-pre-wrap text-xs font-sans leading-normal">
                    {m.text}
                  </div>

                  {/* Grounded Citation Badge */}
                  {m.groundedCitations && m.groundedCitations.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" /> Grounded Source: {m.groundedCitations[0]}
                    </div>
                  )}

                  {/* Tool execution log */}
                  {m.toolExecutionLog && (
                    <div className="mt-2 pt-2 border-t border-white/10 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5" /> Executed: <code className="bg-slate-900 px-1.5 py-0.5 rounded border border-cyan-500/30 text-cyan-200">{m.toolExecutionLog.tool}</code> ({m.toolExecutionLog.latency})
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">{m.timestamp}</span>
              </div>
            ))}

            {isThinking && (
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center gap-2">
                <Sparkles className="h-4 w-4 animate-spin text-cyan-400" />
                <span>Executing multi-step reasoning & Gemini LLM response...</span>
              </div>
            )}
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-[#0A0F1D] border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-[10px] font-mono text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-colors"
              >
                ⚡ {qp}
              </button>
            ))}
          </div>

          {/* Input Prompt Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 bg-[#0B132B] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask Gemini AI (e.g. 'Run DCF valuation')..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
