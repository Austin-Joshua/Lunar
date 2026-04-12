import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";
import { adminAuthApi } from "@/admin/services/api";
import { AdminLoader } from "@/admin/components/AdminLoader";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { AuthShell } from "@/components/auth/AuthShell";
import {
  authFieldWithIconClass,
  authLabelClass,
  authPrimaryButtonClass,
} from "@/components/auth/authStyles";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(100),
});

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/admin/dashboard";

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
        general: err instanceof Error ? err.message : "Login failed. Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    login(
      {
        id: "admin-demo",
        email: "admin@lunar.com",
        name: "Admin User",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      "admin-demo-token",
    );
    navigate(from, { replace: true });
  };

  return (
    <AuthShell
      variant="admin"
      eyebrow="Administrator"
      title="Sign in to console"
      subtitle="Authorized access to products, orders, and analytics. Sessions are audited."
      backHref="/"
      backLabel="Storefront"
      footerNote={`© ${new Date().getFullYear()} LUNAR · Authorized personnel only.`}
    >
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="mb-6 flex justify-center md:mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-black/[0.08] bg-primary/10 dark:border-white/10 dark:bg-primary/15">
            <ShieldCheck className="h-6 w-6 text-primary" aria-hidden />
          </div>
        </div>

        {errors.general && (
          <div
            role="alert"
            className="mb-6 rounded-[10px] border border-destructive/30 bg-destructive/10 px-4 py-3 text-center text-[14px] font-medium text-destructive dark:bg-destructive/15"
          >
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <div>
            <label htmlFor="admin-email" className={authLabelClass}>
              Email
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black/35 dark:text-white/35"
                aria-hidden
              />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lunar.com"
                className={authFieldWithIconClass}
                autoComplete="email"
                required
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-[13px] font-medium text-destructive">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="admin-password" className={authLabelClass}>
              Password
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black/35 dark:text-white/35"
                aria-hidden
              />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={cn(authFieldWithIconClass, "pr-12")}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-black/45 dark:text-white/45"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-[13px] font-medium text-destructive">{errors.password}</p>
            )}
          </div>

          <button type="submit" disabled={isLoading} className={authPrimaryButtonClass}>
            {isLoading ? <AdminLoader size="sm" /> : "Continue"}
          </button>
        </form>

        <div className="mt-8 border-t border-black/[0.06] pt-8 dark:border-white/10">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="flex min-h-[48px] w-full items-center justify-center rounded-[10px] border border-black/[0.12] bg-transparent px-4 text-[15px] font-medium text-[#1d1d1f] transition hover:bg-black/[0.04] dark:border-white/15 dark:text-white dark:hover:bg-white/5"
          >
            Preview demo dashboard
          </button>
        </div>

        <p className="mt-6 text-center text-[13px] text-black/45 dark:text-white/40">
          <Link to="/signin" className="font-medium text-primary underline-offset-4 hover:underline">
            Customer sign in
          </Link>
        </p>
      </motion.div>
    </AuthShell>
  );
};

export default AdminLogin;
