import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Search, User, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const navItems = [
  { icon: Home, label: 'HOME', href: '/' },
  { icon: ShoppingBag, label: 'ARCHIVE', href: '/shop/men' },
  { icon: Search, label: 'QUERY', href: '/shop/search' },
  { icon: User, label: 'PROTOCOL', href: '/shop/settings' },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#050505]/80 backdrop-blur-3xl border-t border-white/5 pb-safe shadow-2xl">
      <div className="flex justify-around items-center h-20 px-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link 
              key={item.label}
              to={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full group"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={cn(
                  "p-3 rounded-2xl transition-all duration-500 relative",
                  isActive ? "text-primary bg-primary/10" : "text-white/20"
                )}
              >
                <item.icon className={cn("h-6 w-6", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
                {item.label === 'ARCHIVE' && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-[#050505]">
                    {item.itemCount}
                  </span>
                )}
              </motion.div>
              
              <span className={cn(
                "text-[8px] font-black tracking-[0.3em] uppercase mt-1 transition-all duration-500",
                isActive ? "text-primary opacity-100" : "text-white/10 opacity-0 group-hover:opacity-40"
              )}>
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active-indicator"
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
