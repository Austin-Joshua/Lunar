import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, ShoppingCart, DollarSign, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/admin/components/StatCard';
import { DataTable } from '@/admin/components/DataTable';
import { PageLoader } from '@/admin/components/AdminLoader';
import { formatCurrency, formatDate, ORDER_STATUS_LABELS } from '@/admin/utils/constants';
import type { DashboardStats, AdminOrder } from '@/admin/types';

// Mock data
const mockStats: DashboardStats = {
  totalUsers: 1247,
  totalProducts: 156,
  totalOrders: 842,
  totalRevenue: 125750,
  recentOrders: [
    {
      id: 'ORD-001',
      userId: '1',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      items: [],
      total: 289.00,
      status: 'shipped',
      shippingAddress: { fullName: '', street: '', city: 'New York', state: 'NY', zipCode: '', country: '', phone: '' },
      createdAt: '2026-01-17T10:30:00Z',
      updatedAt: '2026-01-17T14:00:00Z',
    },
    {
      id: 'ORD-002',
      userId: '2',
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah@example.com',
      items: [],
      total: 145.00,
      status: 'pending',
      shippingAddress: { fullName: '', street: '', city: 'Los Angeles', state: 'CA', zipCode: '', country: '', phone: '' },
      createdAt: '2026-01-17T09:15:00Z',
      updatedAt: '2026-01-17T09:15:00Z',
    },
    {
      id: 'ORD-003',
      userId: '3',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      items: [],
      total: 520.00,
      status: 'delivered',
      shippingAddress: { fullName: '', street: '', city: 'Chicago', state: 'IL', zipCode: '', country: '', phone: '' },
      createdAt: '2026-01-16T16:45:00Z',
      updatedAt: '2026-01-17T11:00:00Z',
    },
    {
      id: 'ORD-004',
      userId: '4',
      customerName: 'Emily Davis',
      customerEmail: 'emily@example.com',
      items: [],
      total: 178.00,
      status: 'processing',
      shippingAddress: { fullName: '', street: '', city: 'Houston', state: 'TX', zipCode: '', country: '', phone: '' },
      createdAt: '2026-01-16T14:20:00Z',
      updatedAt: '2026-01-17T08:30:00Z',
    },
  ],
  salesData: [
    { date: '2026-01-11', sales: 4200, orders: 42 },
    { date: '2026-01-12', sales: 3800, orders: 38 },
    { date: '2026-01-13', sales: 5100, orders: 51 },
    { date: '2026-01-14', sales: 4700, orders: 47 },
    { date: '2026-01-15', sales: 6200, orders: 62 },
    { date: '2026-01-16', sales: 5800, orders: 58 },
    { date: '2026-01-17', sales: 7100, orders: 71 },
  ],
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading || !stats) {
    return <PageLoader />;
  }

  const orderColumns = [
    {
      key: 'id',
      header: 'Order ID',
      render: (order: AdminOrder) => (
        <span className="font-medium">{order.id}</span>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (order: AdminOrder) => (
        <div>
          <p className="font-medium">{order.customerName}</p>
          <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      render: (order: AdminOrder) => formatCurrency(order.total),
    },
    {
      key: 'status',
      header: 'Status',
      render: (order: AdminOrder) => {
        const status = ORDER_STATUS_LABELS[order.status];
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
        );
      },
    },
    {
      key: 'date',
      header: 'Date',
      render: (order: AdminOrder) => formatDate(order.createdAt),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
          iconColor="bg-admin-info"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts.toLocaleString()}
          icon={Package}
          trend={{ value: 8.2, isPositive: true }}
          iconColor="bg-admin-warning"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          icon={ShoppingCart}
          trend={{ value: 15.3, isPositive: true }}
          iconColor="bg-admin-success"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          trend={{ value: 22.4, isPositive: true }}
          iconColor="bg-admin-sidebar-active"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-admin-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Sales Overview</h3>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--admin-card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Sales']}
                  labelFormatter={(label) => formatDate(label)}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth={2}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-admin-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Orders Overview</h3>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.salesData}>
                <defs>
                  <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--admin-card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [value, 'Orders']}
                  labelFormatter={(label) => formatDate(label)}
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(142, 76%, 36%)"
                  strokeWidth={2}
                  fill="url(#ordersGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <Link
            to="/admin/orders"
            className="text-sm text-admin-sidebar-active hover:underline flex items-center gap-1"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <DataTable
          columns={orderColumns}
          data={stats.recentOrders}
          keyField="id"
        />
      </div>
    </div>
  );
};

export default Dashboard;
