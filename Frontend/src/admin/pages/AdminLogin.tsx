import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ShieldCheck, Activity, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdminAuth } from '@/admin/context/AdminAuthContext';
import { adminAuthApi } from '@/admin/services/api';
import { AdminLoader } from '@/admin/components/AdminLoader';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }).max(255),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(100),
});

const inputClass = cn(
  'w-full rounded-2xl border py-4 pl-12 pr-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors focus:outline-none focus:ring-4',
  'border-border bg-muted/60 text-foreground placeholder:text-muted-foreground/50',
  'focus:border-primary/40 focus:ring-primary/10',
  'dark:border-white/10 dark:bg-white/5 dark:placeholder:text-white/30 dark:focus:border-primary/35 dark:focus:ring-primary/10'
);

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: Location })?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await adminAuthApi.login(email, password);
      login(response.user, response.token);
      navigate(from, { replace: true });
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Login failed. Please check your credentials.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    login(
      {
        id: 'admin-demo',
        email: 'admin@lunar.com',
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      'admin-demo-token'
    );
    navigate(from, { replace: true });
  };

  return (
    <div className="dark min-h-[100dvh] bg-background pt-safe text-foreground selection:bg-primary/20">
      <div className="flex min-h-[100dvh] flex-col lg:flex-row">
        <aside className="relative flex flex-col justify-between border-b border-border bg-muted/30 px-5 py-8 sm:px-8 sm:py-10 dark:border-white/5 dark:bg-neutral-950/40 lg:w-[min(28rem,40vw)] lg:border-b-0 lg:border-r lg:py-14">
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06] dark:opacity-[0.05]">
            <div className="absolute -left-20 top-24 select-none text-[18rem] font-black italic leading-none tracking-tighter text-foreground">
              L
            </div>
          </div>
          <div className="relative z-10 space-y-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4 text-primary" />
              storefront
            </Link>
            <div>
              <p className="text-xl font-black tracking-tighter">
                LUNAR<span className="text-primary italic">.</span>
              </p>
              <p className="mt-2 text-[8px] font-black uppercase tracking-[0.45em] text-primary/80">management kernel</p>
            </div>
          </div>
          <div className="relative z-10 hidden space-y-6 lg:block">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
              <Activity className="h-4 w-4 text-primary" />
              secure session
            </div>
            <p className="max-w-xs text-[10px] font-bold uppercase tracking-wide text-muted-foreground leading-relaxed">
              Authorized operators only. All access attempts are logged to the LUNAR audit stream.
            </p>
          </div>
        </aside>

        {/* Form column */}
        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <div className="mb-10 space-y-4 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-primary/10 dark:border-white/10">
                  <ShieldCheck className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black tracking-[0.45em] text-primary uppercase">admin access</span>
                </div>
                <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none md:text-5xl">
                  Command <span className="text-primary not-italic font-light">console</span>
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Sign in to open the operations dashboard
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-xl dark:border-white/5 dark:bg-card/80 dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)] md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-destructive">
                    {errors.general}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ADMIN@LUNAR.COM"
                      className={inputClass}
                      autoComplete="email"
                      required
                    />
                  </div>
                  {errors.email && <p className="text-[10px] font-bold uppercase tracking-wide text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={cn(inputClass, 'pr-12')}
                      autoComplete="current-password"
                      required
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
                  {errors.password && (
                    <p className="text-[10px] font-bold uppercase tracking-wide text-destructive">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-[10px] font-black tracking-[0.35em] text-primary-foreground uppercase transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? <AdminLoader size="sm" /> : 'Initialize session'}
                </button>
              </form>

              <div className="mt-8 border-t border-border pt-8 dark:border-white/5">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full rounded-2xl border border-border bg-transparent py-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-white/10"
                >
                  Preview demo dashboard
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground lg:text-left">
              © {new Date().getFullYear()} lunar — authorized personnel only
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
