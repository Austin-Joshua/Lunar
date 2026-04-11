import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const navItems = [
  { icon: Home, label: 'HOME', href: '/shop' },
  { icon: ShoppingBag, label: 'ARCHIVE', href: '/shop/men' },
  { icon: Search, label: 'QUERY', href: '/shop/search' },
  { icon: User, label: 'PROTOCOL', href: '/shop/settings' },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 pb-safe shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-background/85 lg:hidden">
      <div className="flex h-20 items-center justify-around px-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className="group relative flex h-full w-full flex-col items-center justify-center"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={cn(
                  'relative rounded-2xl p-3 transition-all duration-500',
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className={cn('h-6 w-6', isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]')} />
                {item.label === 'ARCHIVE' && itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-[8px] font-black text-primary-foreground ring-2 ring-background">
                    {itemCount}
                  </span>
                )}
              </motion.div>

              <span
                className={cn(
                  'mt-1 text-[8px] font-black uppercase tracking-[0.3em] transition-all duration-500',
                  isActive ? 'text-primary opacity-100' : 'text-muted-foreground opacity-0 group-hover:opacity-60'
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
