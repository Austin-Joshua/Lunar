import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/services/api";
import { motion } from "framer-motion";
import { ArrowRight, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthShell } from "@/components/auth/AuthShell";
import {
  authFieldWithIconClass,
  authLabelClass,
  authPrimaryButtonClass,
  authSecondaryLinkClass,
} from "@/components/auth/authStyles";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading: contextLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const isLoading = contextLoading || isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);
      const { user: userData, token } = await authApi.register(name, email, password);
      if (!token) throw new Error("No access token from server.");
      login(userData, token, true);
      navigate("/");
    } catch (err: unknown) {
      const e = err as { data?: { message?: string }; message?: string };
      setError(e.data?.message || e.message || "Registration failed. Please check your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Create an account"
      title="Join LUNAR"
      subtitle="One profile for your cart, orders, and members-only drops."
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
            <label htmlFor="name" className={authLabelClass}>
              Name
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black/35 dark:text-white/35"
                aria-hidden
              />
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First and last name"
                className={authFieldWithIconClass}
                autoComplete="name"
              />
            </div>
          </div>

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
            <label htmlFor="password" className={authLabelClass}>
              Password
            </label>
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
                placeholder="At least 6 characters"
                className={cn(authFieldWithIconClass, "pr-12")}
                autoComplete="new-password"
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

          <p className="text-[12px] leading-relaxed text-black/50 dark:text-white/45 sm:text-[13px]">
            By continuing you agree to our{" "}
            <Link to="/terms" className={authSecondaryLinkClass}>
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className={authSecondaryLinkClass}>
              Privacy Policy
            </Link>
            .
          </p>

          <button type="submit" disabled={isLoading} className={authPrimaryButtonClass}>
            {isLoading ? (
              "Creating account…"
            ) : (
              <>
                Continue
                <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-[15px] text-black/55 dark:text-white/55">
          Already have an account?{" "}
          <Link to="/signin" className={cn(authSecondaryLinkClass, "font-semibold")}>
            Sign in
          </Link>
        </p>
      </motion.div>
    </AuthShell>
  );
};

export default Register;
