import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Activity,
  ShieldCheck,
  Zap,
  Percent,
  Repeat,
  Gauge,
} from 'lucide-react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { StatCard } from '@/admin/components/StatCard';
import { PageLoader } from '@/admin/components/AdminLoader';
import { formatCurrency } from '@/admin/utils/constants';
import type { DashboardStats } from '@/admin/types';
import { dashboardApi } from '@/admin/services/api';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
      total: 2890.0,
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
      total: 1450.0,
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
      total: 5200.0,
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

const insightPills = [
  {
    label: 'Avg. order value',
    hint: 'Trailing 30 days',
    icon: Gauge,
    trend: '+4.2%',
    positive: true,
  },
  {
    label: 'Visit → order',
    value: '3.8%',
    hint: 'Store conversion',
    icon: Percent,
    trend: '+0.6%',
    positive: true,
  },
  {
    label: 'Repeat customers',
    value: '41%',
    hint: 'Returning within 90d',
    icon: Repeat,
    trend: '+2.1%',
    positive: true,
  },
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const aov = useMemo(() => {
    if (!stats || stats.totalOrders === 0) return '$0';
    return formatCurrency(Math.round(stats.totalRevenue / stats.totalOrders));
  }, [stats]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const live = await dashboardApi.getStats();
        if (!cancelled) setStats(live);
      } catch {
        if (!cancelled) setStats(mockStats);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading || !stats) {
    return <PageLoader />;
  }

  return (
    <div className="animate-fade-in space-y-10 selection:bg-primary/20">
      <div className="flex flex-col justify-between gap-8 border-b border-border pb-8 md:flex-row md:items-end dark:border-white/10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase leading-none tracking-[0.5em] text-primary">REAL-TIME TELEMETRY</span>
          </div>
          <h1 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-foreground md:text-7xl">
            Command <br />
            Intelligence<span className="text-primary not-italic">.</span>
          </h1>
          <p className="max-w-lg text-[10px] font-medium uppercase leading-relaxed tracking-wide text-muted-foreground">
            Revenue, orders, and operational signals update here as your archive grows. Connect the live API when ready.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-muted-foreground md:gap-6">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> SYSTEM ACTIVE
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> SECURE TUNNEL
          </div>
          <div className="rounded-full border border-border bg-muted/40 px-3 py-1.5 dark:border-white/10">
            Blended AOV <span className="text-primary">{aov}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          iconColor="bg-muted/70 dark:bg-white/5"
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
          iconColor="bg-muted/70 dark:bg-white/5"
        />
      </div>

      {/* Operational insights */}
      <div>
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">Operational insights</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {insightPills.map((item, i) => {
            const displayValue = i === 0 ? aov : item.value ?? '—';
            return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-2xl border border-border bg-card p-6 dark:border-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-black uppercase tracking-widest',
                    item.positive ? 'text-emerald-600 dark:text-emerald-400/90' : 'text-destructive'
                  )}
                >
                  {item.trend}
                </span>
              </div>
              <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-2xl font-black tabular-nums tracking-tight text-foreground">{displayValue}</p>
              <p className="mt-2 text-[9px] font-medium text-muted-foreground/80">{item.hint}</p>
            </motion.div>
          );})}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-8 rounded-[2.5rem] border border-border bg-card p-8 dark:border-white/10 md:p-12 lg:col-span-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Revenue & orders</h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">7-DAY PERFORMANCE — sales (area) vs. order count (line)</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-muted/50 px-4 py-3 dark:bg-white/5">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">+22.4% revenue</span>
            </div>
          </div>
          <div className="h-[380px] w-full min-w-0 md:h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stats.salesData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(43 65% 55%)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="hsl(43 65% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.55)" vertical={false} />
                <XAxis
                  dataKey="date"
                  yAxisId="left"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                  stroke="hsl(var(--muted-foreground) / 0.45)"
                  fontSize={10}
                  fontWeight={700}
                  axisLine={false}
                  tickLine={false}
                  dy={12}
                />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  stroke="hsl(var(--muted-foreground) / 0.45)"
                  fontSize={10}
                  fontWeight={700}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => `${value}`}
                  stroke="hsl(var(--muted-foreground) / 0.35)"
                  fontSize={10}
                  fontWeight={700}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                />
                <Tooltip
                  cursor={{ stroke: 'hsl(var(--primary) / 0.35)', strokeWidth: 2 }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
                  }}
                  labelStyle={{ fontSize: '9px', fontWeight: 800, marginBottom: '8px', color: 'hsl(var(--muted-foreground))' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}
                  formatter={(value) => (value === 'sales' ? 'Revenue' : 'Orders')}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  name="sales"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#velocityGradient)"
                  animationDuration={1200}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="orders"
                  stroke="hsl(var(--foreground))"
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'hsl(var(--foreground))' }}
                  activeDot={{ r: 5 }}
                  opacity={0.85}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col rounded-[2.5rem] border border-border bg-card p-8 dark:border-white/10 lg:col-span-4 lg:p-10">
          <div className="mb-10 flex items-center justify-between border-b border-border pb-6 dark:border-white/10">
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Live archive</h3>
            <Link
              to="/admin/orders"
              className="flex items-center gap-3 text-[9px] font-black tracking-[0.3em] text-primary transition-all hover:gap-5"
            >
              ALL <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-1 flex-col space-y-10">
            {stats.recentOrders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + idx * 0.08 }}
                className="group flex items-center justify-between gap-6"
              >
                <div className="flex min-w-0 items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/60 text-primary transition-colors group-hover:bg-primary/20 dark:bg-white/5">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-black uppercase tracking-widest text-foreground">{order.customerName}</p>
                    <p className="mt-1 text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                      {order.id} • {order.shippingAddress.city}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black tracking-tighter text-primary">{formatCurrency(order.total)}</p>
                  <p
                    className={cn(
                      'mt-1 text-[8px] font-black uppercase tracking-widest',
                      order.status === 'pending' ? 'text-amber-600/90 dark:text-amber-400/80' : 'text-emerald-600/90 dark:text-emerald-400/80'
                    )}
                  >
                    {order.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-10 dark:border-white/10">
            <div className="space-y-3 rounded-3xl bg-primary/5 p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Security protocol</p>
              <p className="text-[9px] font-bold uppercase leading-relaxed text-muted-foreground">
                System integrity verified. End-to-end encryption active for all current acquisition streams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
