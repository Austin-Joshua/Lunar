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
  ShieldCheck
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
        "fixed left-0 top-0 h-screen bg-[#050505] text-white transition-all duration-500 z-50 flex flex-col border-r border-white/5",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo Section */}
      <div className="h-24 flex items-center justify-between px-6 border-b border-white/5">
        {!collapsed && (
          <Link to="/admin/dashboard" className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">
              LUNAR<span className="text-primary italic">.</span>
            </span>
            <span className="text-[8px] font-black tracking-[0.4em] text-primary/60 mt-1 uppercase">MANAGEMENT</span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "p-2.5 rounded-xl bg-white/5 hover:bg-primary/10 transition-all duration-300",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4 text-primary" /> : <ChevronLeft className="h-4 w-4 text-primary" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-10 overflow-y-auto no-scrollbar">
        <ul className="space-y-4 px-4">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 group",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  {active && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                    />
                  )}
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0 transition-transform duration-500 group-hover:scale-110",
                    active ? "text-primary" : "text-inherit"
                  )} />
                  {!collapsed && (
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase transition-opacity duration-500">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Information */}
      <div className="p-6 border-t border-white/5 space-y-6">
        {!collapsed && admin && (
          <div className="flex items-center gap-4 px-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
               <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black tracking-widest truncate uppercase">{admin.name}</p>
              <p className="text-[8px] font-bold text-white/20 tracking-widest truncate uppercase">SYSTEM OVERSEER</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-4 px-4 py-4 rounded-2xl w-full text-white/30 hover:text-destructive hover:bg-destructive/5 transition-all duration-500 group",
            collapsed && "justify-center"
          )}
          title={collapsed ? "End Session" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0 transition-transform duration-500 group-hover:-translate-x-1" />
          {!collapsed && <span className="text-[10px] font-black tracking-[0.2em] uppercase">END SESSION</span>}
        </button>
      </div>
    </aside>
  );
};
