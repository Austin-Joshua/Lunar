import React, { useState, useEffect } from 'react';
import { Search, User, Mail, Activity, Hash, CreditCard, Calendar, ChevronRight, Fingerprint, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { PageLoader } from '@/admin/components/AdminLoader';
import { formatCurrency, formatDate } from '@/admin/utils/constants';
import type { Customer } from '@/admin/types';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Integration Hook: Replace with adminApi.getUsers()
    setTimeout(() => {
      setUsers([
        {
          id: 'L-USR-001',
          name: 'Alexander Vance',
          email: 'vance@architect.com',
          ordersCount: 12,
          totalSpent: 15480.00,
          createdAt: '2025-11-15T10:00:00Z',
          lastOrderDate: '2026-04-01T10:30:00Z',
        },
        // ... more users
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <PageLoader />;

  return (
    <div className="animate-fade-in space-y-12 text-foreground">
      
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col items-end justify-between gap-8 border-b border-border pb-10 dark:border-white/10 md:flex-row">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase leading-none">IDENTITY MANAGEMENT</span>
           </div>
           <h1 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-foreground md:text-7xl">User <br />Index<span className="text-primary not-italic">.</span></h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
           <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                 type="text" 
                 placeholder="SEARCH IDENTITY..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full rounded-2xl border border-border bg-muted/40 py-4 pl-14 pr-8 text-[10px] font-black uppercase tracking-widest transition-all focus:border-primary/25 focus:outline-none sm:w-64 dark:border-white/10 dark:bg-white/5"
              />
           </div>
        </div>
      </div>

      {/* METRIC ARCHITECTURE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="rounded-[2.5rem] border border-border bg-card dark:border-white/10 p-10 flex flex-col justify-between group hover:border-primary/20 transition-all duration-700">
           <p className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">REGISTERED ARCHIVISTS</p>
           <div className="flex items-baseline gap-4 mt-6">
              <p className="text-5xl font-black italic tracking-tighter text-foreground">{users.length}</p>
              <Activity className="h-6 w-6 text-primary animate-pulse" />
           </div>
        </div>
        <div className="rounded-[2.5rem] border border-border bg-card dark:border-white/10 p-10 flex flex-col justify-between group hover:border-primary/20 transition-all duration-700">
           <p className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">TOTAL ACQUISITIONS</p>
           <div className="flex items-baseline gap-4 mt-6">
              <p className="text-5xl font-black italic tracking-tighter text-foreground">
                {users.reduce((sum, u) => sum + u.ordersCount, 0)}
              </p>
           </div>
        </div>
        <div className="rounded-[2.5rem] border border-border bg-card dark:border-white/10 p-10 flex flex-col justify-between group hover:border-primary/20 transition-all duration-700">
           <p className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">GROSS VALUATION</p>
           <div className="flex items-baseline gap-4 mt-6">
              <p className="text-5xl font-black italic tracking-tighter text-primary">
                {formatCurrency(users.reduce((sum, u) => sum + u.totalSpent, 0))}
              </p>
           </div>
        </div>
      </div>

      {/* IDENTITY LEDGER */}
      <div className="rounded-[2.5rem] border border-border bg-card dark:border-white/10 overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-border bg-muted/20 dark:border-white/5 dark:bg-white/[0.02]">
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">ACQUISITION AGENT</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">ACTIVITY LEVEL</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">VALUATION</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">CHRONICLED</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">STATUS</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-6">
                             <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-muted/40 text-xl font-black uppercase text-primary transition-all group-hover:scale-110 group-hover:bg-primary/10 dark:border-white/10 dark:bg-white/5">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <p className="mb-1 text-[11px] font-black uppercase leading-none tracking-widest text-foreground">{user.name}</p>
                                <p className="text-[9px] font-bold text-muted-foreground tracking-tighter uppercase">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-3">
                             <Hash className="h-4 w-4 text-muted-foreground/50" />
                             <span className="text-[10px] font-black tracking-widest text-foreground">{user.ordersCount} ACQUISITIONS</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className="text-sm font-black italic tracking-tighter text-primary">{formatCurrency(user.totalSpent)}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-black text-muted-foreground tracking-widest">{formatDate(user.createdAt)}</span>
                             <span className="text-[8px] font-bold text-muted-foreground/50 uppercase tracking-[0.3em]">LAST ORDER: {user.lastOrderDate ? formatDate(user.lastOrderDate) : 'NONE'}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 text-emerald-500/80 text-[9px] font-black tracking-widest uppercase">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                ACTIVE ARCHIVIST
                             </div>
                             <button type="button" className="rounded-xl bg-muted/40 p-3 text-muted-foreground transition-all group-hover:bg-primary/10 group-hover:text-primary dark:bg-white/5">
                                <ExternalLink className="h-5 w-5" />
                             </button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default AdminUsers;
