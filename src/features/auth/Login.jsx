import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/app');
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Login failed. Please check credentials.');
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

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_75%)] pointer-events-none" />

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/60 relative border border-slate-200">
          <div className="flex flex-col items-center mb-8">
            <Link to="/" className="flex flex-col items-center group cursor-pointer mb-2">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-3 shadow-xs group-hover:bg-amber-100 transition-colors">
                <Layers size={24} />
              </div>
              <div className="flex items-baseline font-logo text-2xl font-extrabold lowercase text-slate-900 tracking-logo-tight">
                <span>fabricate</span>
                <sup className="ml-0.5 text-[10px] font-semibold text-amber-500">®</sup>
              </div>
            </Link>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-xs text-slate-500 mt-1">Sign in to manage your manufacturing pipeline</p>
          </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            id="email"
            placeholder="brand@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

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
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-amber-600 hover:text-amber-700 font-bold">
            Create Account
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
