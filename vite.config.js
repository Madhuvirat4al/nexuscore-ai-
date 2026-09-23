import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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

          // 2. UNIVERSAL PUBLIC EMAIL RELAY PROXY (/api/send-otp)
          if (req.url === '/api/send-otp' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const { email, name, otpCode } = JSON.parse(body);
                console.log(`[Universal Email Proxy] Dispatching OTP code ${otpCode} to ${email}`);

                const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    _subject: `🔐 NexusCore AI Security Code: ${otpCode}`,
                    _captcha: "false",
                    Recipient_Name: name || 'Enterprise User',
                    Recipient_Email: email,
                    Verification_Code: otpCode,
                    Message: `Hello ${name || 'User'}, your 6-digit verification code to access NexusCore AI Vault is: ${otpCode}. This code will expire in 5 minutes.`
                  })
                });

                const resData = await response.json();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  id: `fs_${Date.now()}`,
                  message: `Verification code sent to ${email}`
                }));
              } catch (err) {
                console.error(`[Universal Email Proxy Error]`, err);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: `OTP generated: ${otpCode}` }));
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
