// Real Generative Gemini LLM & Agentic AI Reasoning Engine
import { pythonSandboxEngine } from './pythonSandboxEngine';
import { ragKnowledgeBase } from './ragKnowledgeBase';

const GEMINI_KEY_STORAGE = 'nexuscore_gemini_api_key_v1';

export const agenticAIService = {
  getApiKey: () => {
    return localStorage.getItem(GEMINI_KEY_STORAGE) || '';
  },

  setApiKey: (key) => {
    localStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
  },

  // Main multi-step AI reasoning method
  processMessage: async (userPrompt, currentTarget, customKey = '') => {
    const apiKey = customKey || agenticAIService.getApiKey();
    const promptLower = userPrompt.toLowerCase().trim();
    const startTime = performance.now();

    // Safely extract target fields
    const companyName = currentTarget?.name || 'Target Enterprise';
    const ticker = currentTarget?.ticker || 'TGT';
    const sector = currentTarget?.sector || 'Enterprise';

    let thoughtSteps = [
      "Parsing user prompt intent...",
      `Active Target Context: ${companyName} (${ticker})`,
      "Dispatching request to Real-Time AI & Live Knowledge Proxy (/api/chat)..."
    ];

    let toolExecutionLog = null;
    let groundedCitations = [];

    // Pre-execute relevant tools if financial terms are mentioned
    let pythonOutputContext = "";
    if (promptLower.includes('altman') || promptLower.includes('z-score') || promptLower.includes('bankruptcy')) {
      if (currentTarget?.financials) {
        const pyRes = await pythonSandboxEngine.runPythonScript('altman_z_score', {
          workingCapital: parseFloat((currentTarget.financials.workingCapital || '1B').replace(/[^0-9.]/g, '')) * 1000,
          totalAssets: parseFloat((currentTarget.financials.totalAssets || '10B').replace(/[^0-9.]/g, '')) * 1000,
          retainedEarnings: parseFloat((currentTarget.financials.retainedEarnings || '5B').replace(/[^0-9.]/g, '')) * 1000,
          ebit: parseFloat((currentTarget.financials.ebit || '2B').replace(/[^0-9.]/g, '')) * 1000,
          marketCap: parseFloat((currentTarget.financials.marketCapVal || '20B').replace(/[^0-9.]/g, '')) * 1000,
          totalLiabilities: parseFloat((currentTarget.financials.totalLiabilities || '5B').replace(/[^0-9.]/g, '')) * 1000,
        });
        pythonOutputContext = `Altman Z-Score: ${pyRes.result.zScore}, Zone: ${pyRes.result.zone}`;
        toolExecutionLog = { tool: 'pythonSandbox.altman_z_score()', latency: `${pyRes.executionTimeMs}ms`, status: 'VERIFIED' };
        thoughtSteps.push("Executed Altman Z-Score Python Math engine");
      }
    } else if (promptLower.includes('dcf') || promptLower.includes('valuation') || promptLower.includes('intrinsic')) {
      if (currentTarget?.financials) {
        const pyRes = await pythonSandboxEngine.runPythonScript('dcf_valuation', {
          freeCashFlow: parseFloat((currentTarget.financials.freeCashFlow || '1B').replace(/[^0-9.]/g, '')) * 1000,
          growthRate: 0.08,
          wacc: 0.09,
          terminalGrowth: 0.025
        });
        pythonOutputContext = `DCF Intrinsic Value: $${pyRes.result.perShareValue}/share vs Stock Price: ${currentTarget.financials.currentStockPrice || '$100'}`;
        toolExecutionLog = { tool: 'pythonSandbox.dcf_valuation()', latency: `${pyRes.executionTimeMs}ms`, status: 'VERIFIED' };
        thoughtSteps.push("Executed 5-Year DCF Cash Flow Valuation Python engine");
      }
    }

    const groundedDocs = ragKnowledgeBase.searchDocuments(currentTarget?.id || 'default', userPrompt);
    const topDoc = groundedDocs[0] || (currentTarget?.ragDocuments ? currentTarget.ragDocuments[0] : null);
    if (topDoc) {
      groundedCitations = [topDoc.title];
      thoughtSteps.push(`Retrieved Grounded RAG Document: ${topDoc.title}`);
    }

    // CALL REAL-TIME SERVER PROXY ENDPOINT (/api/chat)
    try {
      const systemContext = `Active Target Enterprise: ${companyName} (${ticker}). Sector: ${sector}. Python Tool Execution Context: ${pythonOutputContext || 'N/A'}. RAG Document Context: ${topDoc ? topDoc.textExcerpt : 'N/A'}.`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          systemContext,
          apiKey
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          toolExecutionLog = { tool: data.source || 'Realtime API', latency: `${Math.round(performance.now() - startTime)}ms`, status: 'REALTIME_SUCCESS' };
          thoughtSteps.push(`Realtime API Response Received (${data.source})`);

          return {
            id: `msg_${Date.now()}`,
            sender: 'agent',
            text: data.text,
            thoughtSteps,
            toolExecutionLog,
            groundedCitations,
            timestamp: new Date().toLocaleTimeString()
          };
        }
      }
    } catch (err) {
      console.warn("Realtime AI Proxy call error:", err);
    }

    // FALLBACK SYNTHESIS IF PROXY UNREACHABLE
    return {
      id: `msg_${Date.now()}`,
      sender: 'agent',
      text: `### Real-Time AI Response for: **"${userPrompt}"**\n\nI processed your query. Please ensure your dev server is active or enter a valid Google Gemini API key in the header settings!`,
      thoughtSteps,
      toolExecutionLog: { tool: 'SystemFallback', latency: '0ms', status: 'STANDBY' },
      groundedCitations,
      timestamp: new Date().toLocaleTimeString()
    };
  }
};
