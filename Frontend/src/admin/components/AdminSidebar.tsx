import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAdminAuth } from '@/admin/context/AdminAuthContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { name: 'DASHBOARD', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'PRODUCTS', href: '/admin/products', icon: Package },
  { name: 'ORDERS', href: '/admin/orders', icon: ShoppingCart },
  { name: 'USERS', href: '/admin/users', icon: Users },
  { name: 'CATEGORIES', href: '/admin/categories', icon: FolderTree },
];

/** Rail width when collapsed (icon-only) — intentionally narrow, not full sidebar. */
export const ADMIN_SIDEBAR_COLLAPSED_W = 'w-14';
export const ADMIN_SIDEBAR_EXPANDED_W = 'w-52';

export const AdminSidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { logout, admin } = useAdminAuth();

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/10 bg-[#0a0a0a] text-foreground shadow-[1px_0_0_rgba(255,255,255,0.06)] transition-[width] duration-300 ease-out dark:bg-[#050505]',
        collapsed ? `${ADMIN_SIDEBAR_COLLAPSED_W}` : `${ADMIN_SIDEBAR_EXPANDED_W}`,
      )}
    >
      {/* Logo + collapse — rail: collapsed = stacked icon strip; expanded = full label row */}
      <div
        className={cn(
          'flex shrink-0 border-b border-white/10',
          collapsed
            ? 'flex-col items-center gap-2 py-3'
            : 'h-14 flex-row items-center justify-between px-3',
        )}
      >
        {!collapsed ? (
          <Link to="/admin/dashboard" className="flex min-w-0 flex-col">
            <span className="text-sm font-bold leading-none tracking-tight text-white">
              LUNAR<span className="text-primary italic">.</span>
            </span>
            <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.35em] text-primary/70">Admin</span>
          </Link>
        ) : (
          <Link
            to="/admin/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-[10px] font-bold text-white transition hover:bg-white/10"
            title="Dashboard"
          >
            L
          </Link>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary transition hover:bg-white/10"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="no-scrollbar flex-1 overflow-y-auto py-4">
        <ul className={cn('space-y-1', collapsed ? 'px-1.5' : 'px-2')}>
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    'relative flex items-center rounded-xl py-2.5 transition-colors',
                    collapsed ? 'justify-center px-0' : 'gap-3 px-3',
                    active
                      ? 'bg-primary/15 text-primary'
                      : 'text-white/55 hover:bg-white/5 hover:text-white',
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary"
                    />
                  )}
                  <item.icon
                    className={cn(
                      'h-[18px] w-[18px] shrink-0',
                      active ? 'text-primary' : 'text-inherit',
                    )}
                  />
                  {!collapsed && (
                    <span className="truncate text-[9px] font-bold uppercase tracking-[0.15em]">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-2 border-t border-white/10 p-2">
        {!collapsed && admin && (
          <div className="flex items-center gap-2 rounded-xl px-2 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-bold uppercase tracking-wide text-white">{admin.name}</p>
              <p className="truncate text-[7px] font-semibold uppercase tracking-wider text-white/45">Overseer</p>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={logout}
          className={cn(
            'flex w-full items-center rounded-xl py-2.5 text-white/50 transition hover:bg-red-500/10 hover:text-red-400',
            collapsed ? 'justify-center' : 'gap-2 px-3',
          )}
          title={collapsed ? 'Sign out' : undefined}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span className="text-[9px] font-bold uppercase tracking-wider">Sign out</span>}
        </button>
      </div>
    </aside>
  );
};
