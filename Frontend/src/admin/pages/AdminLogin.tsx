import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import { useAdminAuth } from '@/admin/context/AdminAuthContext';
import { adminAuthApi } from '@/admin/services/api';
import { AdminLoader } from '@/admin/components/AdminLoader';
import { z } from 'zod';

// Validation schema
const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }).max(255),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(100),
});

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

    // Validate input
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

  // Demo login for preview
  const handleDemoLogin = () => {
    login(
      { 
        id: 'admin-demo', 
        email: 'admin@lunar.com', 
        name: 'Admin User', 
        role: 'admin',
        createdAt: new Date().toISOString() 
      },
      'admin-demo-token'
    );
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-admin-bg p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-admin-sidebar mb-4">
            <Shield className="h-8 w-8 text-admin-sidebar-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to access the LUNAR dashboard</p>
        </div>

        {/* Form Card */}
        <div className="bg-admin-card rounded-lg border border-border p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {errors.general}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lunar.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-admin-sidebar text-admin-sidebar-foreground font-medium rounded-md hover:bg-admin-sidebar-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? <AdminLoader size="sm" /> : 'Sign In'}
            </button>
          </form>

          {/* Demo Login */}
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={handleDemoLogin}
              className="w-full py-2.5 border-2 border-admin-sidebar text-admin-sidebar font-medium rounded-md hover:bg-admin-sidebar hover:text-admin-sidebar-foreground transition-colors"
            >
              Access Demo Dashboard
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LUNAR. Authorized personnel only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
