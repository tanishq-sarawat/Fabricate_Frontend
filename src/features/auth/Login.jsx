import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthHero from '../../components/auth/AuthHero';

export const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [sessionNotice, setSessionNotice] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to /app
  useEffect(() => {
    if (user) {
      const destination = location.state?.from?.pathname || '/app';
      navigate(destination, { replace: true });
    }
  }, [user, navigate, location]);

  // Check for session expired notices
  useEffect(() => {
    const notice = sessionStorage.getItem('auth_notice');
    if (notice) {
      setSessionNotice(notice);
      sessionStorage.removeItem('auth_notice');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSessionNotice('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    const result = await login(email.trim(), password);
    if (result.success) {
      const destination = location.state?.from?.pathname || '/app';
      navigate(destination, { replace: true });
    } else {
      setError(
        typeof result.error === 'string'
          ? result.error
          : 'Login failed. Please verify your email and password.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-[#fbfbfa] font-sans antialiased lg:overflow-hidden">
      {/* Left Column: Auth Form */}
      <div className="w-full lg:w-1/2 min-h-screen lg:min-h-0 lg:h-screen flex flex-col justify-center items-center px-6 sm:px-12 py-8 relative lg:overflow-y-auto">
        {/* Subtle top navigation back to home */}
        <div className="absolute top-6 left-6 sm:left-10 z-20">
          <Link
            to="/"
            className="text-xs font-medium text-[#666660] hover:text-[#111111] flex items-center gap-1.5 transition-colors"
          >
            <span>←</span>
            <span>Home</span>
          </Link>
        </div>

        <div className="w-full max-w-[420px] my-auto">
          {/* Main White Auth Card */}
          <div className="w-full bg-white rounded-2xl border border-[#e8e8e5] p-8 sm:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
            {/* Keychain Logo */}
            <div className="flex justify-center mb-6">
              <Link to="/" className="inline-block group cursor-pointer">
                <span className="font-bold text-3xl lowercase tracking-tight text-[#111111] select-none">
                  fabricate<span className="text-[#f5cb39]">.</span>
                </span>
              </Link>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-light text-[#111111] text-center tracking-tight mb-7">
              Welcome back
            </h1>

            {/* Session Expiry or Logged Out Notice */}
            {sessionNotice && (
              <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center gap-2">
                <Info size={15} className="text-amber-600 shrink-0" />
                <span>{sessionNotice}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-semibold text-[#666660] tracking-wider uppercase mb-1.5"
                >
                  EMAIL OR USERNAME <span className="text-rose-500 font-semibold">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  autoComplete="email"
                  className="w-full bg-white border border-[#e5e5e2] rounded-lg px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#999990] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-semibold text-[#666660] tracking-wider uppercase"
                  >
                    PASSWORD <span className="text-rose-500 font-semibold">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Demo default password is "Password123!". Please use it to log in.')}
                    className="text-xs text-[#666660] hover:text-[#111111] transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="w-full bg-white border border-[#e5e5e2] rounded-lg px-3.5 py-2.5 pr-10 text-sm text-[#111111] placeholder:text-[#999990] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f5cb39] hover:bg-[#ebd034] text-[#111111] font-medium text-sm py-2.5 px-4 rounded-lg transition-all duration-150 select-none shadow-xs text-center cursor-pointer active:scale-[0.99] disabled:opacity-60 mt-2"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Sub-card navigation switch */}
          <div className="text-center text-xs text-[#666660] mt-6">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-[#111111] underline hover:text-black font-medium transition-colors"
            >
              Request access
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column: High-End Food Photography Hero (Randomly Selected CPG Category) */}
      <AuthHero />
    </div>
  );
};

export default Login;
