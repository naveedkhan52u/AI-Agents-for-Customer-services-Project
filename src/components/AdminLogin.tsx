import React, { useState } from 'react';
import { ScreenType } from '../types';
import { APP_ASSETS } from '../mockData';

interface AdminLoginProps {
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('admin@orken.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState<'idle' | 'validating' | 'verified'>('idle');
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthStep('validating');

    setTimeout(() => {
      setAuthStep('verified');
      setTimeout(() => {
        onLoginSuccess();
        onNavigate('overview');
      }, 900);
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden font-sans">
      {/* Subtle Abstract AI Network Grid Pattern Layer */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <svg className="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="40" id="network-grid" patternUnits="userSpaceOnUse" width="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4d44e3" strokeOpacity="0.08" strokeWidth="1" />
              <circle cx="0" cy="0" fill="#4d44e3" fillOpacity="0.15" r="1.5" />
              <circle cx="40" cy="0" fill="#4d44e3" fillOpacity="0.15" r="1.5" />
              <circle cx="0" cy="40" fill="#4d44e3" fillOpacity="0.15" r="1.5" />
              <circle cx="40" cy="40" fill="#4d44e3" fillOpacity="0.15" r="1.5" />
            </pattern>
            <radialGradient cx="50%" cy="35%" id="portal-glow" r="60%">
              <stop offset="0%" stopColor="#4d44e3" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#4d44e3" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect fill="url(#portal-glow)" height="100%" width="100%" />
          <rect fill="url(#network-grid)" height="100%" width="100%" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* Return link */}
        <button
          onClick={() => onNavigate('landing')}
          className="self-start mb-3 inline-flex items-center gap-1 text-xs text-[#565e74] hover:text-[#3525cd] transition-colors cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Return to Public Website</span>
        </button>

        {/* Security Status Badge Top Banner */}
        <div className="w-full mb-4">
          <div className="bg-[#dae2fd]/60 backdrop-blur-sm rounded-xl p-3 border border-[#dce9ff] shadow-xs flex items-start gap-2.5">
            <span
              className="material-symbols-outlined text-[#3525cd] text-xl shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#0b1c30] uppercase tracking-wider font-bold">
                Protected Enterprise Portal
              </p>
              <p className="text-xs text-[#5c647a] mt-0.5 leading-snug">
                2FA authentication enforced for all administrative sessions.
              </p>
            </div>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] bg-[#71f8e4] text-[#00201c] font-bold">
              SSL 256
            </span>
          </div>
        </div>

        {/* Main Clean Login Card Container */}
        <div className="w-full bg-white rounded-2xl shadow-xl border border-[#dce9ff] p-6 sm:p-7 relative flex flex-col">
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center p-2.5 mb-3 shadow-xs">
              <img
                alt="Orken AI Logo"
                className="w-full h-full object-contain"
                src={APP_ASSETS.logo}
              />
            </div>
            <div className="inline-flex items-center gap-1.5 mb-1">
              <span className="text-base font-bold tracking-tight text-[#0b1c30]">
                Orken AI
              </span>
              <span className="text-[10px] bg-[#e2dfff] text-[#0f0069] px-2 py-0.5 rounded-full font-bold">
                Console
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#0b1c30] mt-1">
              Welcome Back
            </h1>
            <p className="text-xs text-[#464555] mt-1 text-center">
              Sign in to manage your AI agents and leads.
            </p>
          </div>

          {/* Authentication Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0b1c30]" htmlFor="admin-email">
                Administrator Email
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#565e74] text-lg pointer-events-none">
                  mail
                </span>
                <input
                  autoComplete="email"
                  className="w-full pl-10 pr-3 py-2.5 bg-[#eff4ff] text-[#0b1c30] text-sm rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4f46e5] border border-[#dce9ff] transition-all"
                  id="admin-email"
                  placeholder="admin@orken.ai"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#0b1c30]" htmlFor="admin-password">
                  Master Password
                </label>
                <span className="text-[10px] text-[#464555] font-mono">Auth V2.4</span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#565e74] text-lg pointer-events-none">
                  lock
                </span>
                <input
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#eff4ff] text-[#0b1c30] text-sm rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4f46e5] border border-[#dce9ff] transition-all"
                  id="admin-password"
                  placeholder="Enter secure password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  aria-label="Toggle password visibility"
                  className="absolute right-2.5 text-[#565e74] hover:text-[#0b1c30] p-1 rounded-md transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Utility Row: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#4f46e5] focus:ring-0 accent-[#3525cd] cursor-pointer"
                  id="remember-session"
                  type="checkbox"
                />
                <span className="text-xs text-[#464555]">Remember Me</span>
              </label>
              <button
                className="text-xs text-[#3525cd] hover:text-[#4f46e5] font-semibold transition-colors focus:outline-none cursor-pointer"
                onClick={() => setShowForgotNotice(true)}
                type="button"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submission Button with Active State Feedback */}
            <div className="pt-2">
              <button
                disabled={isAuthenticating}
                className="w-full bg-[#4f46e5] hover:bg-[#3525cd] text-white text-sm font-bold py-3 px-4 rounded-lg shadow-sm hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
                type="submit"
              >
                <span>{isAuthenticating ? 'Authenticating...' : 'Sign In to Console'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Live Interactive Verification Prompt */}
          {authStep !== 'idle' && (
            <div className="mt-4 p-3 bg-[#dce9ff] rounded-lg text-[#0b1c30] text-xs flex items-center space-x-2 animate-in fade-in">
              {authStep === 'validating' ? (
                <>
                  <span className="material-symbols-outlined text-[#006d62] text-lg animate-spin">
                    progress_activity
                  </span>
                  <span>Validating token credentials &amp; routing to 2FA...</span>
                </>
              ) : (
                <>
                  <span
                    className="material-symbols-outlined text-[#006d62] text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-semibold text-[#00534a]">
                    Identity verified. Redirecting to 2FA Key exchange...
                  </span>
                </>
              )}
            </div>
          )}

          {/* Quick Session Indicator */}
          <div className="mt-5 pt-3 border-t border-[#eff4ff] flex items-center justify-between text-[#464555] text-[11px]">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006d62] animate-pulse"></span>
              <span>Active Node: US-East-4</span>
            </div>
            <span className="tracking-wide text-[#565e74]">IP: 198.51.100.24</span>
          </div>
        </div>

        {/* Strict Administrator Notice */}
        <div className="w-full mt-5 text-center px-4">
          <div className="inline-flex items-center space-x-1.5 text-[#464555] mb-1">
            <span className="material-symbols-outlined text-sm">lock_person</span>
            <span className="text-[11px] font-semibold">Restricted Personnel Only</span>
          </div>
          <p className="text-[11px] text-[#5c647a] leading-relaxed">
            Public self-registration is permanently disabled. For credential provisioning or access revocation, contact the <span className="font-semibold text-[#0b1c30]">Orken Operations Desk</span>.
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border border-[#dce9ff]">
            <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#3525cd] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[22px]">key</span>
            </div>
            <h3 className="text-base font-bold text-[#0b1c30]">Administrative Credential Recovery</h3>
            <p className="text-xs text-[#464555] mt-2 leading-relaxed">
              Administrative recovery protocols require a physical FIDO2 security key challenge or authorization via the Internal IT Infrastructure Team at <strong>security@orken.ai</strong>.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowForgotNotice(false)}
                className="px-4 py-2 bg-[#3525cd] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
