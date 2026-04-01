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
    <div className="space-y-12 animate-fade-in p-2 md:p-6 lg:p-10 bg-[#050505] min-h-screen text-white">
      
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-10 border-b border-white/5">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase leading-none">IDENTITY MANAGEMENT</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">User <br />Index<span className="text-primary not-italic">.</span></h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
           <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-primary transition-colors" />
              <input 
                 type="text" 
                 placeholder="SEARCH IDENTITY..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-14 pr-8 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/20 focus:outline-none text-[10px] font-black tracking-widest uppercase w-full sm:w-64 transition-all"
              />
           </div>
        </div>
      </div>

      {/* METRIC ARCHITECTURE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-10 flex flex-col justify-between group hover:border-primary/20 transition-all duration-700">
           <p className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">REGISTERED ARCHIVISTS</p>
           <div className="flex items-baseline gap-4 mt-6">
              <p className="text-5xl font-black italic tracking-tighter text-white">{users.length}</p>
              <Activity className="h-6 w-6 text-primary animate-pulse" />
           </div>
        </div>
        <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-10 flex flex-col justify-between group hover:border-primary/20 transition-all duration-700">
           <p className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">TOTAL ACQUISITIONS</p>
           <div className="flex items-baseline gap-4 mt-6">
              <p className="text-5xl font-black italic tracking-tighter text-white">
                {users.reduce((sum, u) => sum + u.ordersCount, 0)}
              </p>
           </div>
        </div>
        <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-10 flex flex-col justify-between group hover:border-primary/20 transition-all duration-700">
           <p className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">GROSS VALUATION</p>
           <div className="flex items-baseline gap-4 mt-6">
              <p className="text-5xl font-black italic tracking-tighter text-primary">
                {formatCurrency(users.reduce((sum, u) => sum + u.totalSpent, 0))}
              </p>
           </div>
        </div>
      </div>

      {/* IDENTITY LEDGER */}
      <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">ACQUISITION AGENT</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">ACTIVITY LEVEL</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">VALUATION</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">CHRONICLED</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">STATUS</th>
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
                             <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary font-black uppercase text-xl transition-all group-hover:scale-110 group-hover:bg-primary/10">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <p className="text-[11px] font-black text-white uppercase tracking-widest leading-none mb-1">{user.name}</p>
                                <p className="text-[9px] font-bold text-white/20 tracking-tighter uppercase">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-3">
                             <Hash className="h-4 w-4 text-white/10" />
                             <span className="text-[10px] font-black text-white tracking-widest">{user.ordersCount} ACQUISITIONS</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className="text-sm font-black italic tracking-tighter text-primary">{formatCurrency(user.totalSpent)}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-black text-white/20 tracking-widest">{formatDate(user.createdAt)}</span>
                             <span className="text-[8px] font-bold text-white/10 uppercase tracking-[0.3em]">LAST ORDER: {user.lastOrderDate ? formatDate(user.lastOrderDate) : 'NONE'}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 text-emerald-500/80 text-[9px] font-black tracking-widest uppercase">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                ACTIVE ARCHIVIST
                             </div>
                             <button className="p-3 rounded-xl bg-white/5 text-white/20 group-hover:text-primary transition-all group-hover:bg-primary/10">
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
