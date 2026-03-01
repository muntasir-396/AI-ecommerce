import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      // If logging in as admin from the login page directly, go to admin dashboard
      if (email === 'admin@zelori.com' && from === '/') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row">
      {/* Left Side: Visual/Editorial */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-900">
        <img 
          src="https://images.unsplash.com/photo-1539109132314-34a77ae68c44?q=80&w=1974&auto=format&fit=crop" 
          alt="Luxury Fashion" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="relative z-10 p-20 flex flex-col justify-end h-full">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[12vw] font-admin-display font-bold leading-[0.85] tracking-tighter text-white uppercase"
          >
            Zelori<br />Maison
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-zinc-400 text-sm uppercase tracking-[0.4em] font-medium"
          >
            The Private Collection Access
          </motion.p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-grow flex items-center justify-center p-8 lg:p-20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-12"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-admin-display font-bold text-white tracking-tight">Sign In</h2>
            <p className="text-zinc-500 text-sm">Enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs uppercase tracking-widest font-bold"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 group-focus-within:text-white transition-colors">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-white transition-colors" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-800 py-4 pl-8 text-white focus:outline-none focus:border-white transition-all placeholder:text-zinc-800"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 group-focus-within:text-white transition-colors">Password</label>
                  <Link to="#" className="text-[9px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-white transition-colors" size={18} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-800 py-4 pl-8 text-white focus:outline-none focus:border-white transition-all placeholder:text-zinc-800"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  Enter Maison <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-medium">
              Don't have an account?
            </p>
            <Link 
              to="/signup" 
              className="text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:underline underline-offset-8"
            >
              Create Account
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg space-y-4">
            <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[8px] uppercase tracking-widest text-zinc-600 mb-1">Admin Access</p>
                <code className="text-[10px] text-zinc-400">admin@zelori.com / admin123</code>
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-widest text-zinc-600 mb-1">User Access</p>
                <code className="text-[10px] text-zinc-400">user@example.com / any</code>
              </div>
            </div>
            <button 
              onClick={() => {
                setEmail('admin@zelori.com');
                setPassword('admin123');
              }}
              className="w-full py-2 border border-admin-gold/20 text-admin-gold text-[9px] uppercase tracking-widest font-bold hover:bg-admin-gold/10 transition-all"
            >
              Auto-fill Admin Credentials
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
