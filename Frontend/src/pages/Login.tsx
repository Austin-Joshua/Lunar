import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/services/api';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Mail, Lock, Eye, EyeOff, Sparkles, ShieldCheck } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { ThemeToggle } from '@/components/ThemeToggle';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/shop';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const { user: userData, token } = await authApi.login(email, password);
      login(userData, token, true); // Update context state
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.data?.message || err.message || 'Invalid credentials. Please attempt again.');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background selection:bg-primary/20 relative">
        <div className="absolute top-8 right-8 z-50">
          <ThemeToggle />
        </div>
        
        {/* Left Side: Editorial Branding */}
        <div className="hidden lg:block relative bg-foreground overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none overflow-hidden">
            <h1 className="text-[30vw] font-black italic tracking-tighter text-background leading-none rotate-90 whitespace-nowrap">
              ARCHIVE
            </h1>
          </div>
          
          <div className="absolute inset-0 p-24 flex flex-col justify-between z-10 text-background">
             <Link to="/" className="text-4xl font-black italic tracking-tighter leading-none group">
              LUNAR<span className="text-primary not-italic group-hover:scale-125 transition-transform inline-block">.</span>
            </Link>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10 max-w-lg"
            >
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.6em] text-white/40">
                 <Sparkles className="h-3 w-3 text-primary" />
                 AUTHENTICATE ACCESS
              </div>
              <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-[0.85]">
                Welcome <br />
                <span className="text-primary font-light not-italic">Back.</span>
              </h1>
              <p className="text-lg font-medium text-white/50 leading-relaxed uppercase tracking-tight max-w-sm">
                Unlock your curated archive, private collection previews, and seamless bespoke experiences tailored for the modern individual.
              </p>
            </motion.div>

            <div className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase">© 2026 LUNAR ATELIER</div>
          </div>

          {/* Decorative Visual */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        </div>

        {/* Right Side: Sleek Authentication Form */}
        <div className="flex items-center justify-center p-8 md:p-32 bg-background relative overflow-hidden">
          {/* Subtle background branding for mobile */}
          <div className="lg:hidden absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
            <h1 className="text-[60vw] font-black italic tracking-tighter leading-none rotate-90 whitespace-nowrap">AUTHENTICATE</h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md space-y-16 z-10"
          >
            {/* Form Header */}
            <div className="text-center space-y-6 mb-16">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="space-y-4">
                 <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase">O1 / AUTHENTICATION</span>
                 <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-foreground">Archive Access<span className="text-primary not-italic font-light">.</span></h1>
              </div>
              <p className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase leading-relaxed max-w-xs mx-auto">
                Initialize your credentials to access the LUNAR private archive and transaction history.
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/5 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest p-5 rounded-3xl text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-10">
                {/* Email - Refined Input */}
                <div className="relative group overflow-hidden">
                  <div className="flex items-center gap-6 border-b-2 border-border focus-within:border-primary transition-all duration-700 pb-4">
                    <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                    <input
                      type="email"
                      required
                      placeholder="EMAIL ADDRESS"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-sm font-black tracking-[0.2em] uppercase focus:outline-none placeholder:text-muted-foreground/30 py-1"
                    />
                  </div>
                </div>

                {/* Password - Refined Input */}
                <div className="relative group overflow-hidden">
                  <div className="flex items-center gap-6 border-b-2 border-border focus-within:border-primary transition-all duration-700 pb-4">
                    <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="PASSWORD"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent text-sm font-black tracking-[0.2em] uppercase focus:outline-none placeholder:text-muted-foreground/30 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 hover:text-primary transition-colors text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground pt-4">
                <div className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" id="remember" className="accent-primary w-4 h-4 cursor-pointer" />
                  <label htmlFor="remember" className="group-hover:text-foreground transition-colors cursor-pointer">REMEMBER ARCHIVE</label>
                </div>
                <Link to="/forgot-password" title="Recover Access" className="hover:text-primary transition-colors hover:scale-105 inline-block">FORGOT ACCESS?</Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-premium-primary w-full py-6 text-[10px] font-black tracking-[0.3em] uppercase group"
              >
                <div className="flex items-center justify-center gap-4">
                  {isLoading ? 'INITIALIZING...' : 'AUTHENTICATE PROTOCOL'}
                  {!isLoading && <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />}
                </div>
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-16 text-center space-y-6">
              <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                NO ARCHIVE IDENTITY?{" "}
                <Link to="/signup" className="text-primary hover:text-foreground transition-colors border-b border-primary/20 pb-1">
                  CREATE REGISTRATION
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
