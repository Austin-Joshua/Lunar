import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/services/api";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthShell } from "@/components/auth/AuthShell";
import {
  authFieldWithIconClass,
  authLabelClass,
  authOAuthButtonClass,
  authPrimaryButtonClass,
  authSecondaryLinkClass,
} from "@/components/auth/authStyles";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, isLoading: contextLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const isBusy = contextLoading || isSubmitting || googleLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);
      const { user: userData, token } = await authApi.login(email, password);
      if (!token) throw new Error("No access token from server.");
      login(userData, token, true);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const e = err as { data?: { message?: string }; message?: string };
      setError(e.data?.message || e.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      setGoogleLoading(true);
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const idToken = await cred.user.getIdToken();
      const { user: userData, token } = await authApi.loginWithGoogle(idToken);
      if (!token) throw new Error("No access token from server.");
      login(userData, token, true);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const e = err as { data?: { message?: string }; message?: string; code?: string };
      if (e.code === "auth/popup-closed-by-user") return;
      setError(e.data?.message || e.message || "Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
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

        <div className="mb-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isBusy}
            className={authOAuthButtonClass}
            aria-busy={googleLoading}
          >
            <svg className="h-[22px] w-[22px] shrink-0" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {googleLoading ? "Opening Google…" : "Continue with Google"}
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <span className="w-full border-t border-black/[0.08] dark:border-white/10" />
          </div>
          <div className="relative flex justify-center text-[13px] font-medium">
            <span className="bg-background px-3 text-black/45 dark:bg-[#0a0a0a] dark:text-white/45">or</span>
          </div>
        </div>

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

          <button type="submit" disabled={isBusy} className={authPrimaryButtonClass}>
            {isSubmitting ? (
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
