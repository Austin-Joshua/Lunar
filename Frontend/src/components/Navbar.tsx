import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ThemeToggle } from './ThemeToggle';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const sectionForLabel: Record<string, string> = {
    MEN: 'men',
    WOMEN: 'women',
    KIDS: 'kids',
    ARCHIVE: 'collections',
  };

  const goToSection = (label: string) => {
    const id = sectionForLabel[label];
    if (!id) return;
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`/#${id}`);
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[rgba(0,0,0,0.8)] pt-safe backdrop-blur-xl backdrop-saturate-180 dark:border-white/10">
        <nav className="lunar-container">
          <div className="flex h-12 items-center justify-between sm:h-[3.25rem]">
            <div className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => {
                  if (isHomePage) window.scrollTo({ top: 0, behavior: 'smooth' });
                  else navigate('/');
                }}
                className="text-[17px] font-bold leading-none tracking-tight text-white transition-opacity hover:opacity-90"
              >
                LUNAR
              </button>
            </div>

            <div className="hidden items-center gap-5 lg:flex xl:gap-8">
              {['MEN', 'WOMEN', 'KIDS', 'ARCHIVE'].map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => goToSection(link)}
                  className="text-xs font-normal text-white/80 transition-colors hover:text-white"
                >
                  {link}
                </button>
              ))}
            </div>

            <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="rounded-full p-2.5 text-white/90 transition-colors hover:bg-white/10"
                aria-label="Search"
              >
                <Search className="h-[17px] w-[17px]" strokeWidth={1.75} />
              </button>

              <ThemeToggle className="hidden h-10 w-10 bg-white/10 hover:bg-white/15 sm:flex [&_svg]:!text-white" />

              <Link
                to={isAuthenticated ? '/settings' : '/signin'}
                className="hidden rounded-full p-2.5 text-white/90 transition-colors hover:bg-white/10 sm:flex"
              >
                <User className="h-[17px] w-[17px]" strokeWidth={1.75} />
              </Link>

              <Link to="/cart" className="relative rounded-full p-2.5 text-white/90 transition-colors hover:bg-white/10">
                <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.75} />
                {itemCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                className="rounded-full p-2.5 text-white/90 lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f5f5f7]/95 p-6 backdrop-blur-md dark:bg-black/90"
          >
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="absolute right-6 top-6 rounded-full p-3 text-[#1d1d1f] transition-colors hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="w-full max-w-xl px-4">
              <p className="mb-8 text-center text-xs font-normal tracking-tight text-[rgba(0,0,0,0.48)] dark:text-white/50">
                Search collection
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const query = (fd.get('search') as string)?.trim();
                  if (query) {
                    setSearchOpen(false);
                    navigate(`/search?q=${encodeURIComponent(query)}`);
                  }
                }}
              >
                <input
                  autoFocus
                  name="search"
                  type="text"
                  placeholder="Search"
                  className="w-full border-0 border-b border-black/10 bg-transparent py-4 text-center text-2xl font-semibold tracking-tight text-[#1d1d1f] placeholder:text-[rgba(0,0,0,0.28)] focus:border-primary focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-white/30 sm:text-4xl"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#f5f5f7] lg:hidden dark:bg-[#000000]"
          >
            <div className="flex justify-end p-6">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full p-3 text-[#1d1d1f] dark:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center space-y-8 px-10">
              {['MEN', 'WOMEN', 'KIDS', 'ARCHIVE'].map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    goToSection(link);
                  }}
                  className="text-left text-4xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white"
                >
                  {link}
                </button>
              ))}
            </div>

            <div className="space-y-3 p-8">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-full bg-primary py-3.5 text-[17px] font-semibold text-primary-foreground"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-full bg-primary py-3.5 text-center text-[17px] font-semibold text-primary-foreground"
                >
                  Sign in
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
