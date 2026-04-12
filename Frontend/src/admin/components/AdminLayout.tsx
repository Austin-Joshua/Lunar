import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { cn } from '@/lib/utils';

export const AdminLayout: React.FC = () => {
  /** Default: icon rail only — sidebar is not fully expanded on load. */
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <AdminSidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          'min-w-0 transition-[margin] duration-300 ease-out',
          sidebarCollapsed ? 'lg:ml-14' : 'lg:ml-52',
        )}
      >
        <AdminTopbar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="max-w-[1600px] p-4 lg:p-5 xl:p-6 2xl:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
