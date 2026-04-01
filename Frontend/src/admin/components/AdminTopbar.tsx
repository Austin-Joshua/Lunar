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
    <header className="h-24 bg-[#050505]/80 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40 selection:bg-primary/20">
      {/* Left section: Context & Navigation */}
      <div className="flex items-center gap-8">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-3 rounded-xl bg-white/5 hover:bg-primary/10 text-primary transition-all active:scale-95"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <h1 className="text-[10px] font-black tracking-[0.5em] text-white uppercase truncate max-w-[200px]">
                {title || 'SYSTEM OVERVIEW'}
              </h1>
           </div>
           <p className="text-[8px] font-bold text-white/20 tracking-[0.3em] uppercase mt-1">LUNAR OPERATING KERNEL v2.6</p>
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
            className="w-full pl-14 pr-20 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/20 focus:outline-none focus:ring-4 focus:ring-primary/5 text-[10px] font-bold tracking-widest uppercase transition-all placeholder:text-white/10"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-20 group-focus-within:opacity-100 transition-opacity">
             <span className="px-2 py-1 bg-white/10 rounded text-[9px] font-black">⌘</span>
             <span className="px-2 py-1 bg-white/10 rounded text-[9px] font-black">K</span>
          </div>
        </div>
      </div>

      {/* Right side: Alerts & Identity */}
      <div className="flex items-center gap-8">
        {/* Theme Protocol Switcher */}
        <ThemeToggle className="w-12 h-12 bg-white/5 border border-white/5" />
        
        {/* Alerts Archive */}
        <button className="relative group p-3 rounded-xl bg-white/5 hover:bg-primary/10 transition-all active:scale-95">
          <Bell className="h-5 w-5 text-white/40 group-hover:text-primary transition-colors" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full animate-ping" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* System Overseer Identity */}
        <div className="flex items-center gap-5 pl-8 border-l border-white/5">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black tracking-widest text-white uppercase truncate max-w-[120px]">{admin?.name || 'ADMIN'}</p>
            <p className="text-[8px] font-bold text-primary tracking-[0.3em] uppercase mt-0.5">{admin?.role || 'LEVEL-1 ACCESS'}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl border border-white/5 bg-gradient-to-br from-primary/20 to-transparent p-0.5 group cursor-pointer overflow-hidden">
             <div className="w-full h-full bg-[#050505] rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck className="h-6 w-6" />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};
