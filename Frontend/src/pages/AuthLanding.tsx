import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RotateCcw, Shield, Menu, X } from 'lucide-react';

const AuthLanding: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    { icon: Shield, title: 'Atelier Quality', desc: 'Meticulously crafted heritage pieces' },
    { icon: Truck, title: 'Global Priority', desc: 'Seamless international express delivery' },
    { icon: RotateCcw, title: 'Seamless Returns', desc: 'Managed bespoke exchange policy' }
  ];

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Top Header Section */}
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="lunar-container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-primary">LUNAR</span>
              <span className="text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase opacity-50">Archive</span>
            </div>

            {/* Desktop Features - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <feature.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu - Dropdown */}
          {menuOpen && (
            <div className="md:hidden border-t py-4 animate-slide-down space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-all hover:scale-105 animate-slide-up group" style={{ animationDelay: `${index * 0.05}s` }}>
                  <feature.icon className="h-5 w-5 text-primary mt-0.5 group-hover:scale-125 transition-transform" />
                  <div>
                    <p className="font-semibold text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=1080&fit=crop"
            alt="LUNAR Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <span className="inline-block text-primary-foreground text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.4em] mb-8 animate-slide-up font-bold drop-shadow-lg">
              THE LUNAR ATELIER
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.05s' }}>
              Discover Your <br />
              <span className="text-white">Heritage Identity</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-2xl mx-auto animate-slide-up leading-relaxed font-medium uppercase tracking-tight" style={{ animationDelay: '0.1s' }}>
              Where heritage craftsmanship meets high-fidelity design. Engineered for the modern individual who seeks the exceptional.
            </p>
            
            {/* Auth Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 animate-slide-up mt-8 justify-center" style={{ animationDelay: '0.15s' }}>
              <Link 
                to="/signin" 
                className="group px-10 py-5 bg-primary-foreground text-foreground font-black text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all inline-flex items-center justify-center shadow-2xl transform hover:scale-105"
              >
                <span>Member Access</span>
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/signup" 
                className="group px-10 py-5 border-2 border-primary-foreground text-primary-foreground font-black text-xs tracking-widest uppercase rounded-full hover:bg-primary-foreground hover:text-foreground transition-all inline-flex items-center justify-center hover:shadow-2xl transform hover:scale-105"
              >
                <span>Register Identity</span>
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary border-t">
        <div className="lunar-container py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: Shield,
                title: 'Premium Quality',
                description: 'Curated collection of finest clothing'
              },
              {
                icon: Truck,
                title: 'Fast Shipping',
                description: 'Quick and reliable delivery'
              },
              {
                icon: RotateCcw,
                title: 'Easy Returns',
                description: '30-day return policy'
              }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left animate-slide-up" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                <div className="mb-4 p-3 bg-primary/10 rounded-full inline-flex md:inline-flex">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm max-w-xs">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="lunar-container text-center text-muted-foreground text-sm">
          <p className="text-[10px] font-black tracking-[0.5em]">&copy; 2026 LUNAR ATELIER. ARCHITECTURAL PRECISION.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLanding;
