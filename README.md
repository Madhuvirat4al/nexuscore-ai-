# NexusCore AI — Enterprise Supply Chain & Financial Risk Copilot

![NexusCore AI Banner](https://img.shields.io/badge/NexusCore-Enterprise_Copilot-00F5D4?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38BDF8?style=for-the-badge)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.0_Flash-4285F4?style=for-the-badge)

**NexusCore AI** is an enterprise-grade, agent-first executive copilot platform combining **Financial Due Diligence & Audit** with **Supply Chain Operational Resilience**.

---

## 🏛️ Key Features & Technical Pillars

1. **Executive Overview & Target Enterprise Scorecard**:
   - Multi-target enterprise switcher (*Apex Semiconductor*, *Titan Logistics*, *AeroVanguard Defence*).
   - Real-time viability metrics: Financial Viability Score, Supply Chain Health Index, ESG Rating, and Overall Risk.

2. **Financial Due Diligence & Audit Module**:
   - Discounted Cash Flow (DCF) 5-year valuation model with interactive WACC and terminal growth controls.
   - Altman Z-Score bankruptcy probability radar chart.
   - Liquidity & Working Capital audit.

3. **Supply Chain Operational Resilience Module**:
   - Tier-1 to Tier-3 multi-echelon supplier dependency graph.
   - Single Point of Failure (SPOF) bottleneck identification.
   - Port disruption & customs delay heatmaps.

4. **Monte Carlo EBITDA Loss Simulator**:
   - Live stress test sliders for supply chain delays, interest rate hikes, and raw material inflation.
   - Real-time EBITDA loss waterfall chart.

5. **Vertex AI RAG Document Search Vault**:
   - Grounded RAG search across SEC 10-K/10-Q annual reports, vendor SLAs, and customs regulations.

6. **Generative AI Agentic Copilot Chatbot**:
   - Google Gemini REST API integration (`gemini-1.5-flash` / `gemini-2.0-flash-exp`).
   - Reasoning traces (`[Thought Execution]`), Python tool execution context, and custom API key drawer (`🔑`).
   - Server-side Real-Time Knowledge Proxy (`/api/chat`).

7. **Authentication & Globalization**:
   - Tabbed User Registration & Login with encrypted database persistence.
   - Resend API Email OTP verification relay (`/api/send-otp`).
   - 4 Executive Themes (*Bloomberg Midnight*, *Stripe Light*, *Cyberpunk Neon*, *Financial Navy*).
   - 6 Languages (*EN, ES, DE, JA, ZH, FR*).

---

## 🚀 Quick Start & Installation

```bash
# 1. Clone the repository
git clone https://github.com/Madhuvirat4al/nexuscore-ai.git
cd nexuscore-ai

# 2. Install dependencies
npm install

# 3. Set up Environment Variables
cp .env.example .env

# 4. Start Development Server
npm run dev
```

Application will run locally on `http://localhost:3000` (or `http://localhost:3002`).

---

## 📦 Build for Production

```bash
npm run build
```

The minified production assets will be generated in the `dist/` directory.

---

## 📜 License
MIT License © 2026 NexusCore AI
