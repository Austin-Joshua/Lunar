import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/services/api';
import { loginWithGoogle, loginWithApple } from '@/services/oauth';
import { Loader } from '@/components/Loader';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  // Initialize Google OAuth
  useEffect(() => {
    const initGoogle = async () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
          });
          // Render Google button
          window.google.accounts.id.renderButton(
            document.getElementById('google-signin-btn'),
            { theme: 'outline', size: 'large' }
          );
        }
      };
    };

    initGoogle();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(email, password);
      login(response.user, response.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login for preview
  const handleDemoLogin = () => {
    login(
      { id: 'demo', email: 'demo@lunar.com', name: 'Demo User', createdAt: new Date().toISOString() },
      'demo-token'
    );
    navigate(from, { replace: true });
  };

  // Handle Google OAuth response
  const handleGoogleResponse = async (response: any) => {
    try {
      setIsLoading(true);
      setError('');

      // Decode JWT from Google
      const decoded = JSON.parse(atob(response.credential.split('.')[1]));

      const loginResponse = await loginWithGoogle({
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture || '',
      });

      login(loginResponse.user, loginResponse.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Apple OAuth login
  const handleAppleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');

      if (!window.AppleID) {
        setError('Apple ID SDK not loaded. Please try again.');
        return;
      }

      const response = await window.AppleID.auth.signIn();

      const loginResponse = await loginWithApple({
        sub: response.user?.uid,
        email: response.user?.email,
        name: response.user?.name?.firstName || 'Apple User',
      });

      login(loginResponse.user, loginResponse.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Apple login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-3xl font-bold mb-2">
            LUNAR
          </Link>
          <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
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
                className="w-full pl-10 pr-12 py-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
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
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 lunar-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader size="sm" /> : 'Sign In'}
          </button>
        </form>

        {/* Demo Login */}
        <button
          onClick={handleDemoLogin}
          className="w-full mt-3 py-3 lunar-btn-outline"
        >
          Try Demo Account
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          {/* Google Sign-In */}
          <div id="google-signin-btn" className="w-full flex justify-center" />

          {/* Apple Sign-In */}
          <button
            type="button"
            onClick={handleAppleLogin}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-md border border-border bg-white hover:bg-gray-50 dark:bg-slate-950 dark:hover:bg-slate-900 font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.05 13.5c-.91 0-1.7.52-2.1 1.28.94.64 1.57 1.77 1.57 3.02 0 .78-.24 1.5-.64 2.11h2.72c1.23-1.2 2-2.88 2-4.74 0-3.66-2.98-6.65-6.65-6.65-1.44 0-2.77.47-3.85 1.25.64 1.4 1.01 2.96 1.01 4.6 0 .78-.09 1.55-.24 2.29.68.4 1.5.63 2.33.63 1.28 0 2.39-.68 3-1.69.4.1.82.15 1.25.15z" />
            </svg>
            Sign in with Apple
          </button>
        </div>

        {/* Register Link */}
        <div className="my-6 border-t border-border" />
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
