// Read Resend API Key securely from Vercel Environment Variables
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export default async function handler(req, res) {
  // Set CORS headers for Vercel Serverless Function
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
    const { email, name, otpCode, customFrom } = req.body || {};
    
    // Sender fallback for Resend testing account
    const senderAddress = customFrom || 'NexusCore Security <onboarding@resend.dev>';
    const keyToUse = RESEND_API_KEY || 're_dummy_key';

    console.log(`[Vercel Serverless Resend] Dispatching OTP code ${otpCode} to ${email} from ${senderAddress}`);

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
            <p style="font-size: 14px; color: #CBD5E1;">Hello <strong>${name || 'Enterprise User'}</strong>,</p>
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
    return res.status(response.status).json(resData);
  } catch (error) {
    console.error(`[Vercel Serverless Resend Error]`, error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
}
