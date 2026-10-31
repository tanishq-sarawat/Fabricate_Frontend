import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthHero from '../../components/auth/AuthHero';

export const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('Brand'); // 'Brand' | 'Manufacturer'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to /app
  useEffect(() => {
    if (user) {
      const destination = location.state?.from?.pathname || '/app';
      navigate(destination, { replace: true });
    }
  }, [user, navigate, location]);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'manufacturer') {
      setCompanyType('Manufacturer');
    } else if (roleParam === 'brand') {
      setCompanyType('Brand');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide an email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    const backendRole = companyType === 'Manufacturer' ? 'MANUFACTURER' : 'BRAND';

    const result = await register(
      email.trim(),
      password,
      backendRole,
      { name: name.trim(), company: companyName.trim() }
    );

    if (result.success) {
      if (backendRole === 'MANUFACTURER') {
        navigate('/app/register-facility', { replace: true });
      } else {
        const destination = location.state?.from?.pathname || '/app';
        navigate(destination, { replace: true });
      }
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-[#fbfbfa] font-sans antialiased lg:overflow-hidden">
      {/* Left Column: Auth Form */}
      <div className="w-full lg:w-1/2 min-h-screen lg:min-h-0 lg:h-screen flex flex-col justify-center items-center px-6 sm:px-10 py-6 relative lg:overflow-y-auto">
        {/* Subtle top navigation back to home */}
        <div className="absolute top-5 left-6 sm:left-8 z-20">
          <Link
            to="/"
            className="text-xs font-medium text-[#666660] hover:text-[#111111] flex items-center gap-1.5 transition-colors"
          >
            <span>←</span>
            <span>Home</span>
          </Link>
        </div>

        <div className="w-full max-w-[420px] my-auto py-4">
          {/* Main White Auth Card */}
          <div className="w-full bg-white rounded-2xl border border-[#e8e8e5] p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
            {/* Keychain Logo */}
            <div className="flex justify-center mb-4">
              <Link to="/" className="inline-block group cursor-pointer">
                <span className="font-bold text-2xl lowercase tracking-tight text-[#111111] select-none">
                  fabricate<span className="text-[#f5cb39]">.</span>
                </span>
              </Link>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-light text-[#111111] text-center tracking-tight mb-5">
              Request access
            </h1>

            {error && (
              <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-[#222222] mb-1.5"
                >
                  Name <span className="text-rose-500 font-semibold">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Hayes"
                  required
                  autoComplete="name"
                  className="w-full bg-white border border-[#e5e5e2] rounded-lg px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#999990] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="block text-xs font-medium text-[#222222] mb-1.5"
                >
                  Company Name <span className="text-rose-500 font-semibold">*</span>
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Pacific Botanicals"
                  required
                  autoComplete="organization"
                  className="w-full bg-white border border-[#e5e5e2] rounded-lg px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#999990] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="companyType"
                  className="block text-xs font-medium text-[#222222] mb-1.5"
                >
                  Company Type
                </label>
                <div className="relative">
                  <select
                    id="companyType"
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="w-full appearance-none bg-white border border-[#e5e5e2] rounded-lg px-3.5 py-2.5 pr-10 text-sm text-[#111111] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all cursor-pointer"
                  >
                    <option value="Brand">Brand (CPG Brand / Buyer)</option>
                    <option value="Manufacturer">Manufacturer (Co-Packer / Factory)</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666660] pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-[#222222] mb-1.5"
                >
                  Work Email Address <span className="text-rose-500 font-semibold">*</span>
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
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-[#222222] mb-1.5"
                >
                  Password <span className="text-rose-500 font-semibold">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    autoComplete="new-password"
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
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          </div>

          {/* Sub-card navigation switch */}
          <div className="text-center text-xs text-[#666660] mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#111111] underline hover:text-black font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column: High-End Food Photography Hero (Randomly Selected CPG Category) */}
      <AuthHero />
    </div>
  );
};

export default Register;
