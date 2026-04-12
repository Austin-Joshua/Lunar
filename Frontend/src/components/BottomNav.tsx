import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: ShoppingBag, label: 'Shop', href: '/men' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: User, label: 'Account', href: '/settings' },
];

function navItemActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/' || pathname === '';
  if (href === '/search') return pathname.startsWith('/search');
  if (href === '/settings') return pathname.startsWith('/settings');
  if (href === '/men') {
    return (
      pathname.startsWith('/men') ||
      pathname.startsWith('/women') ||
      pathname.startsWith('/kids') ||
      pathname.startsWith('/product')
    );
  }
  return pathname === href;
}

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/[0.08] bg-[rgba(245,245,247,0.96)] px-safe pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-[rgba(0,0,0,0.88)] lg:hidden">
      <div className="mx-auto flex h-[4.75rem] max-w-lg items-center justify-between gap-1 px-2 sm:px-4">
        {navItems.map((item) => {
          const isActive = navItemActive(location.pathname, item.href);
          return (
            <Link
              key={item.label}
              to={item.href}
              className="group relative flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center rounded-2xl py-1"
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                className={cn(
                  'relative rounded-2xl p-2.5 transition-colors sm:p-3',
                  isActive ? 'text-primary' : 'text-[rgba(0,0,0,0.48)] dark:text-white/50',
                )}
              >
                <item.icon className={cn('h-5 w-5 sm:h-6 sm:w-6', isActive ? 'stroke-[2px]' : 'stroke-[1.5px]')} />
                {item.label === 'Shop' && itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 min-w-[1rem] rounded-full bg-primary px-1 py-0.5 text-center text-[8px] font-semibold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </motion.div>

              <span
                className={cn(
                  'mt-0.5 max-w-[4.5rem] truncate text-center text-[10px] font-normal tracking-tight',
                  isActive ? 'text-primary' : 'text-[rgba(0,0,0,0.48)] dark:text-white/50',
                )}
              >
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active-indicator"
                  className="absolute -bottom-0.5 h-1 w-7 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
