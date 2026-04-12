import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/services/api";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthShell } from "@/components/auth/AuthShell";
import {
  authFieldWithIconClass,
  authLabelClass,
  authPrimaryButtonClass,
  authSecondaryLinkClass,
} from "@/components/auth/authStyles";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { user: userData, token } = await authApi.login(email, password);
      login(userData, token, true);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const e = err as { data?: { message?: string }; message?: string };
      setError(e.data?.message || e.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <AuthShell
      eyebrow="Member access"
      title="Sign in"
      subtitle="Use your LUNAR account email and password. Your cart and orders sync across devices."
      backHref="/"
      backLabel="LUNAR Store"
    >
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-[10px] border border-destructive/30 bg-destructive/10 px-4 py-3 text-center text-[14px] font-medium leading-snug text-destructive dark:bg-destructive/15"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <div>
            <label htmlFor="email" className={authLabelClass}>
              Email
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black/35 dark:text-white/35"
                aria-hidden
              />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className={authFieldWithIconClass}
                autoComplete="email"
                inputMode="email"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label htmlFor="password" className={cn(authLabelClass, "mb-0")}>
                Password
              </label>
              <Link to="/forgot-password" className={authSecondaryLinkClass}>
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black/35 dark:text-white/35"
                aria-hidden
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={cn(authFieldWithIconClass, "pr-12")}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-black/45 transition hover:text-foreground dark:text-white/45 dark:hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-black/20 bg-white accent-primary dark:border-white/25 dark:bg-white/10"
            />
            <label htmlFor="remember" className="text-[13px] font-medium text-black/60 dark:text-white/55">
              Keep me signed in on this device
            </label>
          </div>

          <button type="submit" disabled={isLoading} className={authPrimaryButtonClass}>
            {isLoading ? (
              "Signing in…"
            ) : (
              <>
                Continue
                <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-[15px] text-black/55 dark:text-white/55">
          New to LUNAR?{" "}
          <Link to="/signup" className={cn(authSecondaryLinkClass, "font-semibold")}>
            Create an account
          </Link>
        </p>
      </motion.div>
    </AuthShell>
  );
};

export default Login;
