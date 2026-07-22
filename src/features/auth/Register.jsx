import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('BRAND'); // 'BRAND' | 'MANUFACTURER'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'manufacturer') {
      setRole('MANUFACTURER');
    } else if (roleParam === 'brand') {
      setRole('BRAND');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(email, password, role);
    if (result.success) {
      navigate('/app');
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden font-sans">
      {/* Minimal Navbar */}
      <header className="w-full bg-white/60 backdrop-blur-md border-b border-slate-200/50 relative z-25">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors">
              <Layers className="h-5 w-5" />
            </div>
            <span className="flex items-baseline font-logo text-xl font-extrabold lowercase text-slate-900 tracking-logo-tight select-none">
              fabricate
              <sup className="ml-0.5 text-[10px] font-semibold text-amber-500">®</sup>
            </span>
          </Link>
          <Link to="/" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        <div className="absolute inset-y-0 left-[20%] w-px bg-slate-200/60" />
        <div className="absolute inset-y-0 left-[50%] w-px bg-slate-200/60" />
        <div className="absolute inset-y-0 left-[80%] w-px bg-slate-200/60" />
        <div className="absolute top-[120px] left-0 right-0 h-px bg-slate-200/60" />
        <div className="absolute top-[400px] left-0 right-0 h-px bg-slate-200/60" />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/60 relative border border-slate-200">
          <div className="flex flex-col items-center mb-6">
            <Link to="/" className="flex flex-col items-center group cursor-pointer mb-2">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-3 shadow-xs group-hover:bg-amber-100 transition-colors">
                <Layers size={24} />
              </div>
              <div className="flex items-baseline font-logo text-2xl font-extrabold lowercase text-slate-900 tracking-logo-tight">
                <span>fabricate</span>
                <sup className="ml-0.5 text-[10px] font-semibold text-amber-500">®</sup>
              </div>
            </Link>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create an Account</h2>
            <p className="text-xs text-slate-500 mt-1">Join the Fabricate manufacturing network</p>
          </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            id="email"
            placeholder="brand@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Account Type</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('BRAND')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all duration-200 cursor-pointer ${
                  role === 'BRAND'
                    ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Brand / Buyer
              </button>
              <button
                type="button"
                onClick={() => setRole('MANUFACTURER')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all duration-200 cursor-pointer ${
                  role === 'MANUFACTURER'
                    ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Manufacturer
              </button>
            </div>
          </div>

          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full justify-center py-2.5 mt-2"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-600 hover:text-amber-700 font-bold">
            Sign In
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
