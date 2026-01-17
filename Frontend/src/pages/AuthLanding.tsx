import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

const AuthLanding: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-2xl">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            🌙 LUNAR
          </h1>
          <p className="text-xl text-slate-300 mb-2">Premium Clothing Store</p>
          <p className="text-slate-400">Discover your perfect style</p>
        </div>

        {/* Auth Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sign In Card */}
          <Link to="/signin">
            <div className="h-full bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex flex-col items-center text-center h-full justify-center">
                <div className="mb-6 p-4 bg-white/10 rounded-full">
                  <LogIn className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Sign In</h2>
                <p className="text-blue-100 mb-6">Access your account and continue shopping</p>
                <div className="inline-flex items-center text-white font-semibold group">
                  Sign In
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Sign Up Card */}
          <Link to="/signup">
            <div className="h-full bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex flex-col items-center text-center h-full justify-center">
                <div className="mb-6 p-4 bg-white/10 rounded-full">
                  <UserPlus className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Create Account</h2>
                <p className="text-emerald-100 mb-6">Join us and start your shopping journey</p>
                <div className="inline-flex items-center text-white font-semibold group">
                  Sign Up
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-12 border-t border-slate-700">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">✨</div>
              <h3 className="text-white font-semibold mb-1">Premium Quality</h3>
              <p className="text-slate-400 text-sm">Curated collection of finest clothing</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="text-white font-semibold mb-1">Fast Shipping</h3>
              <p className="text-slate-400 text-sm">Quick and reliable delivery</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="text-white font-semibold mb-1">Secure</h3>
              <p className="text-slate-400 text-sm">Your data is safe with us</p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-12 text-slate-400 text-sm">
          <p>&copy; 2026 LUNAR. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLanding;
