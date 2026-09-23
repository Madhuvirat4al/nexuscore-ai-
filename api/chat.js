export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { prompt, systemContext, apiKey } = req.body || {};
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
              return res.status(200).json({ text, source: `Google Gemini (${model})` });
            }
          }
        } catch (e) {
          console.warn(`[Vercel Chat Error - ${model}]`, e.message);
        }
      }
    }

    // B. Real-time Live Wikipedia Summary API
    try {
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(prompt.trim())}`);
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        if (wikiData.extract && wikiData.type !== 'disambiguation') {
          return res.status(200).json({
            text: `### 🌐 Real-Time Live Knowledge: **${wikiData.title}**\n\n${wikiData.extract}\n\n*Category: ${wikiData.description || 'Verified Real-Time Entity'} • Source: Live Wikipedia REST API*`,
            source: 'Wikipedia Live REST API'
          });
        }
      }
    } catch (e) {
      console.warn('[Vercel Wikipedia Summary Error]', e);
    }

    // C. Real-time Live Wikipedia Search API
    try {
      const wikiSearchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(prompt)}&format=json&origin=*`);
      if (wikiSearchRes.ok) {
        const wikiSearchData = await wikiSearchRes.json();
        const firstResult = wikiSearchData.query?.search?.[0];
        if (firstResult) {
          const cleanSnippet = firstResult.snippet.replace(/<[^>]+>/g, '');
          return res.status(200).json({
            text: `### 🔍 Live Web Entity Result: **${firstResult.title}**\n\n${cleanSnippet}...\n\n*Source: Live Web Search API*`,
            source: 'Live Web Search API'
          });
        }
      }
    } catch (e) {
      console.warn('[Vercel Wikipedia Search Error]', e);
    }

    return res.status(200).json({
      text: `### NexusCore AI Executive Response\n\nI processed your prompt: **"${prompt}"**.\n\n*No live web search match found. Paste a Google Gemini API Key in the chatbot header for unrestricted Generative AI capabilities.*`,
      source: 'NexusCore Internal Engine'
    });

  } catch (error) {
    console.error(`[Vercel Serverless Chat Error]`, error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
}
