import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const navItems = [
  { icon: Home, label: 'Home', href: '/shop' },
  { icon: ShoppingBag, label: 'Shop', href: '/shop/men' },
  { icon: Search, label: 'Search', href: '/shop/search' },
  { icon: User, label: 'Account', href: '/shop/settings' },
];

function navItemActive(pathname: string, href: string): boolean {
  if (href === '/shop') return pathname === '/shop' || pathname === '/shop/';
  if (href === '/shop/search') return pathname.startsWith('/shop/search');
  if (href === '/shop/settings') return pathname.startsWith('/shop/settings');
  if (href === '/shop/men') {
    return (
      pathname.startsWith('/shop/men') ||
      pathname.startsWith('/shop/women') ||
      pathname.startsWith('/shop/kids') ||
      pathname.startsWith('/shop/product')
    );
  }
  return pathname === href;
}

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 px-safe pb-safe pt-1 shadow-[0_-8px_32px_-12px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-background/90 dark:shadow-[0_-8px_32px_-12px_rgba(0,0,0,0.45)] lg:hidden">
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
                  'relative rounded-2xl p-2.5 transition-all duration-300 sm:p-3',
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className={cn('h-5 w-5 sm:h-6 sm:w-6', isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]')} />
                {item.label === 'Shop' && itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-[8px] font-black text-primary-foreground ring-2 ring-background">
                    {itemCount}
                  </span>
                )}
              </motion.div>

              <span
                className={cn(
                  'mt-0.5 max-w-[4.5rem] truncate text-center text-[9px] font-semibold uppercase tracking-wide transition-all duration-300',
                  isActive ? 'text-primary opacity-100' : 'text-muted-foreground opacity-70'
                )}
              >
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active-indicator"
                  className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary"
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
