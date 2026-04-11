import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, Moon, Sun, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const sectionForLabel: Record<string, string> = {
    MEN: 'men',
    WOMEN: 'women',
    ARCHIVE: 'collections',
  };

  const goToSection = (label: string) => {
    const id = sectionForLabel[label];
    if (!id) return;
    if (isHomePage) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`${homeBasePath}#${id}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isShopHome =
    location.pathname === '/shop' || location.pathname === '/shop/';
  const isPublicHome = location.pathname === '/';
  const isHomePage = isPublicHome || isShopHome;
  const homeBasePath = location.pathname.startsWith('/shop') ? '/shop' : '/';

  return (
    <>
      <header className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled ? "glass-effect py-4" : "bg-transparent py-6"
      )}>
        <nav className="lunar-container">
          <div className="flex items-center justify-between">
            
            {/* LEFT: Branding/Logo - Scroll to Top */}
            <div className="flex-1 flex items-center">
              <button 
                type="button"
                onClick={() => {
                  if (isHomePage) window.scrollTo({ top: 0, behavior: 'smooth' });
                  else navigate(homeBasePath);
                }}
                className="text-2xl font-black italic tracking-tighter hover:text-primary transition-colors leading-none uppercase"
              >
                LUNAR<span className="text-primary not-italic">.</span>
              </button>
            </div>

            {/* CENTER: Nav Links (Desktop) - Minimalist */}
            <div className="hidden lg:flex items-center gap-10">
              {['MEN', 'WOMEN', 'ARCHIVE'].map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => goToSection(link)}
                  className="text-[10px] font-black tracking-[0.4em] hover:text-primary transition-all duration-300 uppercase"
                >
                  {link}
                </button>
              ))}
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-5 md:gap-7">
              {/* Search */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="hover:scale-110 hover:text-primary transition-all p-2 rounded-full hover:bg-foreground/5"
                aria-label="Search"
              >
                <Search className="h-5 w-5 stroke-[2px]" />
              </button>

              {/* Theme Toggle */}
              <ThemeToggle className="hidden sm:flex" />

              {/* Account */}
              <Link 
                to={isAuthenticated ? "/shop/settings" : "/signin"} 
                className="hidden sm:flex hover:scale-110 transition-all p-2 rounded-full hover:bg-foreground/5"
              >
                <User className="h-5 w-5 stroke-[2px]" />
              </Link>

              {/* Cart */}
              <Link to="/shop/cart" className="relative group hover:scale-110 transition-all p-2 rounded-full hover:bg-foreground/5">
                <ShoppingBag className="h-5 w-5 stroke-[2px]" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-background">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu */}
              <button 
                className="lg:hidden p-2 rounded-full hover:bg-foreground/5 transition-all"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* FULL-SCREEN SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6"
          >
            <button 
              onClick={() => setSearchOpen(false)}
              className="absolute top-10 right-10 p-5 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-all active:scale-95"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="w-full max-w-2xl px-4">
              <span className="block text-center text-xs font-bold tracking-[0.4em] mb-10 text-muted-foreground/60 uppercase">SEARCH COLLECTION</span>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const query = (e.target as any).search.value;
                  if (query) {
                    setSearchOpen(false);
                    window.location.href = `/shop/search?q=${encodeURIComponent(query)}`;
                  }
                }}
                className="relative"
              >
                <input 
                  autoFocus
                  name="search"
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="w-full bg-transparent border-b-2 border-foreground/10 py-10 text-4xl md:text-6xl font-black text-center focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/15"
                />
              </form>
              <div className="mt-16 flex flex-wrap justify-center gap-6">
                {['NEW SEASON', 'ACCESSORIES', 'LIMITED EDIT'].map(hint => (
                  <button key={hint} className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground hover:text-primary transition-all">
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-background lg:hidden flex flex-col"
          >
            <div className="p-8 flex justify-end">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-5 rounded-full bg-secondary transition-all active:scale-90"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 px-10 flex flex-col justify-center space-y-12 text-center md:text-left">
              {['MEN', 'WOMEN', 'ARCHIVE'].map(link => (
                <button 
                  key={link}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    goToSection(link);
                  }}
                  className="text-6xl font-black tracking-tighter hover:text-primary leading-none uppercase italic"
                >
                  {link}
                </button>
              ))}
            </div>

            <div className="p-10 space-y-4">
              {isAuthenticated ? (
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn-premium-primary w-full shadow-lg">SIGN OUT</button>
              ) : (
                <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="btn-premium-primary w-full text-center shadow-lg">SIGN IN</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
