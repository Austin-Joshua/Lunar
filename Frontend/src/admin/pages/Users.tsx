import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { DataTable } from '@/admin/components/DataTable';
import { PageLoader } from '@/admin/components/AdminLoader';
import { formatCurrency, formatDate } from '@/admin/utils/constants';
import type { Customer } from '@/admin/types';

// Mock users data
const mockUsers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    ordersCount: 12,
    totalSpent: 1548.00,
    createdAt: '2025-11-15T10:00:00Z',
    lastOrderDate: '2026-01-17T10:30:00Z',
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    ordersCount: 8,
    totalSpent: 945.00,
    createdAt: '2025-12-01T14:00:00Z',
    lastOrderDate: '2026-01-17T09:15:00Z',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    ordersCount: 25,
    totalSpent: 3250.00,
    createdAt: '2025-09-20T08:00:00Z',
    lastOrderDate: '2026-01-16T16:45:00Z',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    ordersCount: 5,
    totalSpent: 420.00,
    createdAt: '2026-01-05T11:00:00Z',
    lastOrderDate: '2026-01-16T14:20:00Z',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@email.com',
    ordersCount: 15,
    totalSpent: 2100.00,
    createdAt: '2025-10-10T09:00:00Z',
    lastOrderDate: '2026-01-15T12:00:00Z',
  },
  {
    id: '6',
    name: 'Jennifer Martinez',
    email: 'jennifer.m@email.com',
    ordersCount: 3,
    totalSpent: 275.00,
    createdAt: '2026-01-10T16:00:00Z',
    lastOrderDate: '2026-01-14T10:00:00Z',
  },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      header: 'Customer',
      render: (user: Customer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-admin-sidebar flex items-center justify-center text-admin-sidebar-foreground font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'orders',
      header: 'Orders',
      render: (user: Customer) => (
        <span className="font-medium">{user.ordersCount}</span>
      ),
    },
    {
      key: 'spent',
      header: 'Total Spent',
      render: (user: Customer) => (
        <span className="font-medium">{formatCurrency(user.totalSpent)}</span>
      ),
    },
    {
      key: 'joined',
      header: 'Joined',
      render: (user: Customer) => formatDate(user.createdAt),
    },
    {
      key: 'lastOrder',
      header: 'Last Order',
      render: (user: Customer) =>
        user.lastOrderDate ? formatDate(user.lastOrderDate) : 'No orders',
    },
    {
      key: 'status',
      header: 'Status',
      render: (user: Customer) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      ),
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground">{users.length} registered customers</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border bg-admin-card focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-admin-card rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Customers</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-admin-card rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-bold">
            {users.reduce((sum, u) => sum + u.ordersCount, 0)}
          </p>
        </div>
        <div className="bg-admin-card rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold">
            {formatCurrency(users.reduce((sum, u) => sum + u.totalSpent, 0))}
          </p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        keyField="id"
        emptyMessage="No users found"
      />
    </div>
  );
};

export default Users;
