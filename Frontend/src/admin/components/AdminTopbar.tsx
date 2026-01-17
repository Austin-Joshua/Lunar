import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useAdminAuth } from '@/admin/context/AdminAuthContext';

interface TopbarProps {
  onMenuClick: () => void;
  title?: string;
}

export const AdminTopbar: React.FC<TopbarProps> = ({ onMenuClick, title }) => {
  const { admin } = useAdminAuth();

  return (
    <header className="h-16 bg-admin-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        {title && (
          <h1 className="text-lg font-semibold hidden sm:block">{title}</h1>
        )}
      </div>

      {/* Search - Desktop */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products, orders, users..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-secondary border-none focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-md hover:bg-accent transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-3 pl-3 border-l">
          <div className="w-8 h-8 rounded-full bg-admin-sidebar flex items-center justify-center text-admin-sidebar-foreground font-medium text-sm">
            {admin?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{admin?.name || 'Admin'}</p>
            <p className="text-xs text-muted-foreground capitalize">{admin?.role || 'admin'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
