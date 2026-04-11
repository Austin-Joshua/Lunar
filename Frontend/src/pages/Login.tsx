import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/services/api';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Eye, EyeOff, Sparkles, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const inputClass = cn(
  'w-full rounded-2xl border py-4 pl-12 pr-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors focus:outline-none focus:ring-4',
  'border-border bg-muted/60 text-foreground placeholder:text-muted-foreground/50',
  'focus:border-primary/40 focus:ring-primary/10',
  'dark:border-white/10 dark:bg-white/5 dark:placeholder:text-white/30 dark:focus:border-primary/35 dark:focus:ring-primary/10'
);

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
      login(userData, token, true);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const e = err as { data?: { message?: string }; message?: string };
      setError(e.data?.message || e.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background pt-safe text-foreground selection:bg-primary/20">
      <div className="flex min-h-[100dvh] flex-col lg:flex-row">
        <aside className="relative flex flex-col justify-between border-b border-border bg-muted/30 px-5 py-8 sm:px-8 sm:py-10 dark:border-white/5 dark:bg-neutral-950/40 lg:w-[min(28rem,40vw)] lg:border-b-0 lg:border-r lg:py-14">
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06] dark:opacity-[0.05]">
            <div className="absolute -left-16 top-20 select-none text-[16rem] font-black italic leading-none tracking-tighter text-foreground">
              M
            </div>
          </div>
          <div className="relative z-10 space-y-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4 text-primary" />
              home
            </Link>
            <div>
              <p className="text-xl font-black tracking-tighter">
                LUNAR<span className="text-primary italic">.</span>
              </p>
              <p className="mt-2 text-[8px] font-black uppercase tracking-[0.45em] text-primary/80">member access</p>
            </div>
          </div>
          <div className="relative z-10 hidden space-y-6 lg:block">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              curated for you
            </div>
            <p className="max-w-xs text-[10px] font-bold uppercase tracking-wide text-muted-foreground leading-relaxed">
              Sign in to sync your cart, orders, and saved pieces across devices.
            </p>
          </div>
        </aside>

        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <div className="mb-10 space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">authentication</span>
                </div>
                <h1 className="text-4xl font-black uppercase italic leading-none tracking-tighter md:text-5xl">
                  Welcome <span className="font-light not-italic text-primary">back</span>
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Enter your credentials to continue shopping
                </p>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-destructive"
              >
                {error}
              </motion.div>
            )}

            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-xl dark:border-white/5 dark:bg-card/80 dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)] md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="YOU@EMAIL.COM"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <label htmlFor="password" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
                    >
                      forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={cn(inputClass, 'pr-12')}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-border bg-muted accent-primary dark:border-white/20 dark:bg-white/5"
                  />
                  <label htmlFor="remember" className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                    remember this device
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-[10px] font-black uppercase tracking-[0.35em] text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    'Signing in…'
                  ) : (
                    <>
                      continue
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground lg:text-left">
              New here?{' '}
              <Link to="/signup" className="text-primary transition-colors hover:underline">
                create an account
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
