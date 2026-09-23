import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Read API key safely from environment variable (shielded for GitHub Secret Scanning)
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

// https://vite.dev/config/
export default defineConfig({
  base: './', // Allow relative asset paths for custom domain and GitHub Pages deployment
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'nexuscore-api-server-relay',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          
          // 1. REAL-TIME AI & LIVE KNOWLEDGE PROXY (/api/chat)
          if (req.url === '/api/chat' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const { prompt, systemContext, apiKey } = JSON.parse(body);
                const activeApiKey = apiKey || process.env.GEMINI_API_KEY || '';

                // A. Try Google Gemini API if Key is provided
                if (activeApiKey && activeApiKey.trim().length > 5) {
                  const models = ['gemini-1.5-flash', 'gemini-2.0-flash-exp', 'gemini-1.5-pro'];
                  for (const model of models) {
                    try {
                      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeApiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          contents: [{
                            parts: [
                              { text: `${systemContext}\n\nUser Prompt: ${prompt}` }
                            ]
                          }]
                        })
                      });

                      if (geminiRes.ok) {
                        const data = await geminiRes.json();
                        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (text) {
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          return res.end(JSON.stringify({ text, source: `Google Gemini (${model})` }));
                        }
                      }
                    } catch (e) {
                      console.warn(`[Gemini Proxy Error - ${model}]`, e.message);
                    }
                  }
                }

                // B. Real-time Live Wikipedia Summary API
                try {
                  const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(prompt.trim())}`);
                  if (wikiRes.ok) {
                    const wikiData = await wikiRes.json();
                    if (wikiData.extract && wikiData.type !== 'disambiguation') {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      return res.end(JSON.stringify({
                        text: `### 🌐 Real-Time Live Knowledge: **${wikiData.title}**\n\n${wikiData.extract}\n\n*Category: ${wikiData.description || 'Verified Real-Time Entity'} • Source: Live Wikipedia REST API*`,
                        source: 'Wikipedia Live REST API'
                      }));
                    }
                  }
                } catch (e) {
                  console.warn('[Wikipedia Summary Error]', e);
                }

                // C. Real-time Live Wikipedia Search API
                try {
                  const wikiSearchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(prompt)}&format=json&origin=*`);
                  if (wikiSearchRes.ok) {
                    const wikiSearchData = await wikiSearchRes.json();
                    const firstResult = wikiSearchData.query?.search?.[0];
                    if (firstResult) {
                      const cleanSnippet = firstResult.snippet.replace(/<[^>]+>/g, '');
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      return res.end(JSON.stringify({
                        text: `### 🔍 Live Web Entity Result: **${firstResult.title}**\n\n${cleanSnippet}...\n\n*Source: Live Web Search API*`,
                        source: 'Live Web Search API'
                      }));
                    }
                  }
                } catch (e) {
                  console.warn('[Wikipedia Search Error]', e);
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  text: `### NexusCore AI Executive Response\n\nI processed your prompt: **"${prompt}"**.\n\n*No live web search match found. Paste a Google Gemini API Key in the chatbot header for unrestricted Generative AI capabilities.*`,
                  source: 'NexusCore Internal Engine'
                }));

              } catch (err) {
                console.error(`[AI Proxy Server Error]`, err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: `Server error: ${err.message}` }));
              }
            });
            return;
          }

          // 2. RESEND OTP EMAIL PROXY (/api/send-otp)
          if (req.url === '/api/send-otp' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const { email, name, otpCode, customFrom } = JSON.parse(body);
                const senderAddress = customFrom || 'NexusCore Security <security@nexuscore.com>';
                const keyToUse = RESEND_API_KEY || 're_test_dummy';

                const response = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${keyToUse}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    from: senderAddress,
                    to: [email],
                    subject: `NexusCore AI Security Verification Code: ${otpCode}`,
                    html: `
                      <div style="font-family: Arial, sans-serif; background-color: #0A0F1D; color: #F1F5F9; padding: 30px; border-radius: 16px; max-width: 500px; margin: 0 auto; border: 1px solid #1C2541;">
                        <div style="text-align: center; margin-bottom: 20px;">
                          <h2 style="color: #48CAE4; font-size: 24px; margin: 0; letter-spacing: 2px;">NEXUSCORE.AI</h2>
                          <p style="color: #94A3B8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">Enterprise Vault Authentication</p>
                        </div>
                        <p style="font-size: 14px; color: #CBD5E1;">Hello <strong>${name}</strong>,</p>
                        <p style="font-size: 14px; color: #CBD5E1;">Your 6-digit verification code to access your single-tenant encrypted vault is:</p>
                        
                        <div style="background-color: #1C2541; border: 1px solid #48CAE4; border-radius: 12px; padding: 20px; text-align: center; margin: 25px 0;">
                          <span style="font-family: monospace; font-size: 36px; font-weight: bold; color: #00F5D4; letter-spacing: 8px;">${otpCode}</span>
                        </div>
                        
                        <p style="font-size: 12px; color: #94A3B8; text-align: center;">This code will expire in 5 minutes. Please enter it in the app to complete your authentication.</p>
                        <hr style="border: 0; border-top: 1px solid #1C2541; margin: 25px 0;" />
                        <p style="font-size: 10px; color: #64748B; text-align: center;">© 2026 NexusCore AI • Enterprise Supply Chain & Financial Risk Copilot</p>
                      </div>
                    `
                  })
                });

                const resData = await response.json();
                res.statusCode = response.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(resData));
              } catch (err) {
                console.error(`[Resend Proxy Error]`, err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: `Server error: ${err.message}` }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
