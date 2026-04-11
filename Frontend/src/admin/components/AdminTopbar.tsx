import React from 'react';
import { Bell, Search, Menu, Command, Sparkles, User, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAdminAuth } from '@/admin/context/AdminAuthContext';
import { cn } from '@/lib/utils';

interface TopbarProps {
  onMenuClick: () => void;
  title?: string;
}

export const AdminTopbar: React.FC<TopbarProps> = ({ onMenuClick, title }) => {
  const { admin } = useAdminAuth();

  return (
    <header className="sticky top-0 z-40 flex h-24 items-center justify-between border-b border-border bg-background/90 px-8 backdrop-blur-3xl selection:bg-primary/20 dark:border-white/5 dark:bg-background/85">
      {/* Left section: Context & Navigation */}
      <div className="flex items-center gap-8">
        <button
          onClick={onMenuClick}
          className="rounded-xl bg-muted/50 p-3 text-primary transition-all hover:bg-primary/10 active:scale-95 dark:bg-white/5"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <h1 className="max-w-[200px] truncate text-[10px] font-black uppercase tracking-[0.5em] text-foreground">
                {title || 'SYSTEM OVERVIEW'}
              </h1>
           </div>
           <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.3em] text-muted-foreground">LUNAR OPERATING KERNEL v2.6</p>
        </div>
      </div>

      {/* Center: Command Center Search */}
      <div className="hidden md:flex flex-1 max-w-xl mx-12">
        <div className="relative w-full group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
             <Command className="h-4 w-4 text-primary/40 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="ACCESS PROTOCOLS, PRODUCTS, OR ANALYTICS..."
            className="w-full rounded-2xl border border-border bg-muted/40 py-4 pl-14 pr-20 text-[10px] font-bold uppercase tracking-widest transition-all placeholder:text-muted-foreground/40 focus:border-primary/25 focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-white/15"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-20 group-focus-within:opacity-100 transition-opacity">
             <span className="rounded bg-muted/80 px-2 py-1 text-[9px] font-black dark:bg-white/10">⌘</span>
             <span className="rounded bg-muted/80 px-2 py-1 text-[9px] font-black dark:bg-white/10">K</span>
          </div>
        </div>
      </div>

      {/* Right side: Alerts & Identity */}
      <div className="flex items-center gap-8">
        {/* Theme Protocol Switcher */}
        <ThemeToggle className="h-12 w-12 border border-border bg-muted/50 dark:border-white/10 dark:bg-white/5" />
        
        {/* Alerts Archive */}
        <button type="button" className="group relative rounded-xl bg-muted/50 p-3 transition-all hover:bg-primary/10 active:scale-95 dark:bg-white/5">
          <Bell className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full animate-ping" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* System Overseer Identity */}
        <div className="flex items-center gap-5 border-l border-border pl-8 dark:border-white/10">
          <div className="text-right hidden sm:block">
            <p className="max-w-[120px] truncate text-[10px] font-black uppercase tracking-widest text-foreground">{admin?.name || 'ADMIN'}</p>
            <p className="text-[8px] font-bold text-primary tracking-[0.3em] uppercase mt-0.5">{admin?.role || 'LEVEL-1 ACCESS'}</p>
          </div>
          <div className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/20 to-transparent p-0.5 dark:border-white/10">
             <div className="flex h-full w-full items-center justify-center rounded-xl bg-background text-primary transition-transform duration-700 group-hover:scale-110 dark:bg-neutral-950">
                <ShieldCheck className="h-6 w-6" />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};
