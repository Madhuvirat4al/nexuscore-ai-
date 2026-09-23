import React, { useState } from 'react';
import { X, Lock, ShieldCheck, UserPlus, LogIn, AlertTriangle, Send, Sparkles, Inbox, Key, Eye, EyeOff, Building2, Briefcase, Mail, User } from 'lucide-react';
import { authService } from '../services/authService';

export default function OTPAuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [authTab, setAuthTab] = useState('signup'); // 'signup' | 'login'
  const [step, setStep] = useState('form'); // 'form' | 'otp'

  // Registration Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Chief Risk Officer');
  const [organization, setOrganization] = useState('Enterprise Global Vault');
  const [showPassword, setShowPassword] = useState(false);

  // OTP Verification State
  const [otpCode, setOtpCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Handle Registration Form Submit -> Send OTP
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !password) {
      setErrorMsg("Please fill in all required registration fields.");
      return;
    }

    setIsSending(true);

    try {
      const res = await authService.requestRegistration({ name, email, password, role, organization });
      if (res.success) {
        setStep('otp');
        setStatusMsg(res.message);
      } else {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setErrorMsg("Error requesting registration: " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  // Handle Login Form Submit -> Validate Password -> Send OTP
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg("Please enter your registered email and password.");
      return;
    }

    setIsSending(true);

    try {
      const res = await authService.requestLogin({ email, password });
      if (res.success) {
        setStep('otp');
        setStatusMsg(res.message);
      } else {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setErrorMsg("Error requesting login: " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  // Handle OTP Verification Submit -> Complete Registration or Login
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpCode || otpCode.trim().length !== 6) {
      setErrorMsg("Please enter the 6-digit code received in your email inbox.");
      return;
    }

    const res = authService.verifyOTP(otpCode);
    if (res.success) {
      onAuthSuccess(res.user);
      onClose();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md font-mono text-xs">
      <div className="glass-panel-glow max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/50 relative shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Client Portal Vault Authentication</h3>
              <p className="text-slate-400 text-[11px]">Database Persistence • 2-Factor Security Mailer OTP</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher: Sign Up vs Sign In */}
        {step === 'form' && (
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-900 border border-white/10 text-xs">
            <button
              onClick={() => { setAuthTab('signup'); setErrorMsg(''); }}
              className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                authTab === 'signup' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="h-4 w-4" /> Create Account (Sign Up)
            </button>
            
            <button
              onClick={() => { setAuthTab('login'); setErrorMsg(''); }}
              className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                authTab === 'login' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LogIn className="h-4 w-4" /> Log In (Sign In)
            </button>
          </div>
        )}

        {/* 1. REGISTRATION FORM */}
        {step === 'form' && authTab === 'signup' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Ex. Madhu Seepana"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 focus:outline-none focus:border-cyan-400"
                />
                <User className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Gmail / Outlook Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="madhuseepana@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-[#0A0F1D] border border-cyan-500/40 text-cyan-200 font-bold focus:outline-none focus:border-cyan-400"
                />
                <Mail className="h-4 w-4 text-cyan-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pl-10 pr-10 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                  <Key className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Job Role / Title</label>
                <div className="relative">
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                  <Briefcase className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Organization / Enterprise</label>
              <div className="relative">
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 focus:outline-none focus:border-cyan-400"
                />
                <Building2 className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-coral-500/10 border border-coral-500/30 text-coral-300 text-[11px] flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-coral-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 text-xs"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-spin text-cyan-200" />
                  Dispatching OTP Email to Inbox...
                </span>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Register & Send Email OTP Code
                </>
              )}
            </button>
          </form>
        )}

        {/* 2. LOGIN FORM */}
        {step === 'form' && authTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Registered Gmail / Outlook Email *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="madhuseepana@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-[#0A0F1D] border border-cyan-500/40 text-cyan-200 font-bold focus:outline-none focus:border-cyan-400"
                />
                <Mail className="h-4 w-4 text-cyan-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-10 pr-10 rounded-xl bg-[#0A0F1D] border border-white/15 text-slate-100 focus:outline-none focus:border-cyan-400"
                />
                <Key className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-coral-500/10 border border-coral-500/30 text-coral-300 text-[11px] flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-coral-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 text-xs"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-spin text-cyan-200" />
                  Validating Password & Sending Email OTP...
                </span>
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> Verify Password & Send Email OTP
                </>
              )}
            </button>
          </form>
        )}

        {/* 3. OTP VERIFICATION STEP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-[11px] leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Inbox className="h-4 w-4" /> Real-Time OTP Sent to Inbox
              </div>
              <p className="text-slate-100 font-bold">{statusMsg}</p>
              <p className="text-slate-300 text-[10px] pt-1 border-t border-cyan-500/20">
                Please open your <strong>Gmail / Outlook inbox</strong> on your phone or laptop. Type the 6-digit code to complete {authTab === 'signup' ? 'registration' : 'login'}.
              </p>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Enter 6-Digit Email Verification Code *</label>
              <input
                type="text"
                maxLength={6}
                required
                autoFocus
                placeholder="Ex. 000000"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-[#0A0F1D] border border-cyan-500/50 text-cyan-300 font-bold tracking-widest text-center text-2xl focus:outline-none focus:border-cyan-300"
              />
              <p className="text-[10px] text-slate-400 mt-1 text-center font-mono">
                💡 Dev Testing Pass Code: <button type="button" onClick={() => setOtpCode('000000')} className="text-cyan-400 underline font-bold">000000</button>
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-coral-500/10 border border-coral-500/30 text-coral-300 text-[11px] flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-coral-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setStep('form'); setErrorMsg(''); }}
                className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[11px]"
              >
                Back
              </button>

              <button
                type="submit"
                className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <ShieldCheck className="h-4 w-4" /> Verify Code & Complete
              </button>
            </div>

          </form>
        )}

        <div className="pt-2 border-t border-white/10 text-[10px] text-slate-500 flex items-center justify-between">
          <span>Universal Security Mailer Relay</span>
          <span className="text-cyan-400">Encrypted Vault Storage</span>
        </div>

      </div>
    </div>
  );
}
