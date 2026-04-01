import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, ShoppingCart, DollarSign, ArrowRight, TrendingUp, Activity, ShieldCheck, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/admin/components/StatCard';
import { PageLoader } from '@/admin/components/AdminLoader';
import { formatCurrency, formatDate } from '@/admin/utils/constants';
import type { DashboardStats, AdminOrder } from '@/admin/types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mock data standardized for Luxury UI
const mockStats: DashboardStats = {
  totalUsers: 1247,
  totalProducts: 156,
  totalOrders: 842,
  totalRevenue: 125750,
  recentOrders: [
    {
      id: 'L-AQ-00165',
      userId: '1',
      customerName: 'Alexander Vance',
      customerEmail: 'vance@architect.com',
      items: [],
      total: 2890.00,
      status: 'shipped',
      shippingAddress: { fullName: '', street: '', city: 'Tokyo', state: 'JP', zipCode: '', country: '', phone: '' },
      createdAt: '2026-04-01T10:30:00Z',
      updatedAt: '2026-04-01T14:00:00Z',
    },
    {
      id: 'L-AQ-00164',
      userId: '2',
      customerName: 'Sienna Sterling',
      customerEmail: 'sterling@atelier.com',
      items: [],
      total: 1450.00,
      status: 'pending',
      shippingAddress: { fullName: '', street: '', city: 'Paris', state: 'FR', zipCode: '', country: '', phone: '' },
      createdAt: '2026-04-01T09:15:00Z',
      updatedAt: '2026-04-01T09:15:00Z',
    },
    {
      id: 'L-AQ-00163',
      userId: '3',
      customerName: 'Julian Thorne',
      customerEmail: 'thorne@vault.com',
      items: [],
      total: 5200.00,
      status: 'delivered',
      shippingAddress: { fullName: '', street: '', city: 'London', state: 'UK', zipCode: '', country: '', phone: '' },
      createdAt: '2026-03-31T16:45:00Z',
      updatedAt: '2026-04-01T11:00:00Z',
    },
  ],
  salesData: [
    { date: '2026-03-26', sales: 42000, orders: 42 },
    { date: '2026-03-27', sales: 38000, orders: 38 },
    { date: '2026-03-28', sales: 51000, orders: 51 },
    { date: '2026-03-29', sales: 47000, orders: 47 },
    { date: '2026-03-30', sales: 62000, orders: 62 },
    { date: '2026-03-31', sales: 58000, orders: 58 },
    { date: '2026-04-01', sales: 71000, orders: 71 },
  ],
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading || !stats) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-12 animate-fade-in p-2 md:p-6 lg:p-10 bg-[#050505] min-h-screen selection:bg-primary/20">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-10 border-b border-white/5">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase leading-none">REAL-TIME TELEMETRY</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">Command <br />Intelligence<span className="text-primary not-italic">.</span></h1>
        </div>
        <div className="flex items-center gap-6 text-[9px] font-bold tracking-widest text-white/20 uppercase">
           <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> SYSTEM ACTIVE</div>
           <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> SECURE TUNNEL</div>
        </div>
      </div>

      {/* STATS ARCHIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="ACTIVE USERS"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
          iconColor="bg-primary/10"
        />
        <StatCard
          title="ARCHIVE PIECES"
          value={stats.totalProducts.toLocaleString()}
          icon={Package}
          trend={{ value: 8.2, isPositive: true }}
          iconColor="bg-white/5"
        />
        <StatCard
          title="ACQUISITIONS"
          value={stats.totalOrders.toLocaleString()}
          icon={ShoppingCart}
          trend={{ value: 15.3, isPositive: true }}
          iconColor="bg-primary/10"
        />
        <StatCard
          title="VALUATION"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          trend={{ value: 22.4, isPositive: true }}
          iconColor="bg-white/5"
        />
      </div>

      {/* INTELLIGENCE GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* REVENUE FLUCTUATION */}
        <div className="lg:col-span-8 bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-12 space-y-12">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-black italic tracking-tighter text-white uppercase">Revenue Velocity</h3>
              <p className="text-[9px] font-bold text-white/20 tracking-[0.3em] uppercase">7-DAY PERFORMANCE ARCHIVE</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">
               <TrendingUp className="h-4 w-4 text-primary" />
               <span className="text-[10px] font-black text-primary tracking-widest uppercase">+22.4% RISE</span>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.salesData}>
                <defs>
                  <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(196,160,111,0.2)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="rgba(196,160,111,0)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={10}
                  fontWeight={900}
                  axisLine={false}
                  tickLine={false}
                  dy={20}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={10}
                  fontWeight={900}
                  axisLine={false}
                  tickLine={false}
                  dx={-20}
                />
                <Tooltip
                  cursor={{ stroke: 'rgba(196,160,111,0.2)', strokeWidth: 2 }}
                  contentStyle={{
                    backgroundColor: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#c4a06f' }}
                  labelStyle={{ fontSize: '9px', fontWeight: 900, marginBottom: '10px', color: 'rgba(255,255,255,0.2)' }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#c4a06f"
                  strokeWidth={4}
                  fill="url(#velocityGradient)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT PROTOCOLS */}
        <div className="lg:col-span-4 bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-10 flex flex-col">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
             <h3 className="text-xl font-black italic tracking-tighter text-white uppercase">Live Archive</h3>
             <Link to="/admin/orders" className="text-[9px] font-black text-primary tracking-[0.3em] flex items-center gap-3 hover:gap-5 transition-all">ALL <ArrowRight className="h-3 w-3" /></Link>
          </div>
          
          <div className="space-y-10 flex-1">
             {stats.recentOrders.map((order, idx) => (
               <motion.div 
                 key={order.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5 + idx * 0.1 }}
                 className="group flex items-center justify-between gap-6"
               >
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                       <Zap className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                       <p className="text-[10px] font-black tracking-widest text-white uppercase truncate">{order.customerName}</p>
                       <p className="text-[8px] font-bold text-white/20 tracking-widest uppercase mt-1">{order.id} • {order.shippingAddress.city}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-primary tracking-tighter">{formatCurrency(order.total)}</p>
                    <p className={cn("text-[8px] font-black tracking-widest uppercase mt-1", order.status === 'pending' ? 'text-yellow-500/50' : 'text-emerald-500/50')}>
                       {order.status}
                    </p>
                 </div>
               </motion.div>
             ))}
          </div>

          <div className="pt-10 mt-10 border-t border-white/5">
              <div className="bg-primary/5 rounded-3xl p-8 space-y-4">
                 <p className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Security Protocol</p>
                 <p className="text-[9px] font-bold text-white/40 leading-relaxed uppercase">System integrity verified. End-to-end encryption active for all current acquisition streams.</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
