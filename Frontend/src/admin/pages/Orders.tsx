import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, RefreshCw } from 'lucide-react';
import { DataTable } from '@/admin/components/DataTable';
import { Modal } from '@/admin/components/Modal';
import { PageLoader, AdminLoader } from '@/admin/components/AdminLoader';
import { formatCurrency, formatDateTime, ORDER_STATUS_LABELS } from '@/admin/utils/constants';
import type { AdminOrder } from '@/admin/types';
import { cn } from '@/lib/utils';

// Mock orders data
const mockOrders: AdminOrder[] = [
  {
    id: 'ORD-001',
    userId: '1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    items: [
      { productId: '1', productName: 'Premium Linen Oxford Shirt', productImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80', quantity: 2, price: 89.00, size: 'M' },
      { productId: '3', productName: 'Classic Chinos', productImage: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=80', quantity: 1, price: 75.00, size: 'L' },
    ],
    total: 253.00,
    status: 'shipped',
    shippingAddress: { fullName: 'John Smith', street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'USA', phone: '+1 555-123-4567' },
    createdAt: '2026-01-17T10:30:00Z',
    updatedAt: '2026-01-17T14:00:00Z',
  },
  {
    id: 'ORD-002',
    userId: '2',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah.wilson@email.com',
    items: [
      { productId: '2', productName: 'Silk Blend Blouse', productImage: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=80', quantity: 1, price: 145.00, size: 'S', color: 'White' },
    ],
    total: 145.00,
    status: 'pending',
    shippingAddress: { fullName: 'Sarah Wilson', street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zipCode: '90001', country: 'USA', phone: '+1 555-234-5678' },
    createdAt: '2026-01-17T09:15:00Z',
    updatedAt: '2026-01-17T09:15:00Z',
  },
  {
    id: 'ORD-003',
    userId: '3',
    customerName: 'Mike Johnson',
    customerEmail: 'mike.johnson@email.com',
    items: [
      { productId: '1', productName: 'Premium Linen Oxford Shirt', productImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80', quantity: 3, price: 89.00, size: 'L' },
      { productId: '2', productName: 'Silk Blend Blouse', productImage: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=80', quantity: 2, price: 145.00, size: 'M' },
    ],
    total: 557.00,
    status: 'delivered',
    shippingAddress: { fullName: 'Mike Johnson', street: '789 Pine Rd', city: 'Chicago', state: 'IL', zipCode: '60601', country: 'USA', phone: '+1 555-345-6789' },
    createdAt: '2026-01-16T16:45:00Z',
    updatedAt: '2026-01-17T11:00:00Z',
  },
  {
    id: 'ORD-004',
    userId: '4',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@email.com',
    items: [
      { productId: '4', productName: 'Fun Graphic Tee', productImage: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=80', quantity: 2, price: 35.00, size: '8Y' },
    ],
    total: 70.00,
    status: 'processing',
    shippingAddress: { fullName: 'Emily Davis', street: '321 Elm St', city: 'Houston', state: 'TX', zipCode: '77001', country: 'USA', phone: '+1 555-456-7890' },
    createdAt: '2026-01-16T14:20:00Z',
    updatedAt: '2026-01-17T08:30:00Z',
  },
];

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [detailModal, setDetailModal] = useState<{ open: boolean; order: AdminOrder | null }>({ open: false, order: null });
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus as AdminOrder['status'] } : order
      )
    );
    setUpdatingStatus(null);
    if (detailModal.order?.id === orderId) {
      setDetailModal((prev) => ({
        ...prev,
        order: prev.order ? { ...prev.order, status: newStatus as AdminOrder['status'] } : null,
      }));
    }
  };

  const columns = [
    {
      key: 'id',
      header: 'Order ID',
      render: (order: AdminOrder) => <span className="font-medium">{order.id}</span>,
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
      key: 'items',
      header: 'Items',
      render: (order: AdminOrder) => (
        <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      render: (order: AdminOrder) => <span className="font-medium">{formatCurrency(order.total)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (order: AdminOrder) => {
        const status = ORDER_STATUS_LABELS[order.status];
        return (
          <div className="flex items-center gap-2">
            <span className={cn('px-2 py-1 rounded-full text-xs font-medium', status.color)}>
              {status.label}
            </span>
            {updatingStatus === order.id && <AdminLoader size="sm" />}
          </div>
        );
      },
    },
    {
      key: 'date',
      header: 'Date',
      render: (order: AdminOrder) => formatDateTime(order.createdAt),
    },
    {
      key: 'actions',
      header: '',
      render: (order: AdminOrder) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDetailModal({ open: true, order });
          }}
          className="p-2 rounded-md hover:bg-accent transition-colors"
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </button>
      ),
      className: 'w-16',
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-muted-foreground">{orders.length} orders total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border bg-admin-card focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-md border bg-admin-card focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All Statuses</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredOrders} keyField="id" emptyMessage="No orders found" />

      {/* Order Detail Modal */}
      <Modal
        isOpen={detailModal.open}
        onClose={() => setDetailModal({ open: false, order: null })}
        title={`Order ${detailModal.order?.id}`}
        size="lg"
      >
        {detailModal.order && (
          <div className="space-y-6">
            {/* Status Update */}
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Order Status</p>
                <span className={cn('px-2 py-1 rounded-full text-xs font-medium', ORDER_STATUS_LABELS[detailModal.order.status].color)}>
                  {ORDER_STATUS_LABELS[detailModal.order.status].label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={detailModal.order.status}
                  onChange={(e) => handleStatusUpdate(detailModal.order!.id, e.target.value)}
                  disabled={updatingStatus === detailModal.order.id}
                  className="px-3 py-1.5 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {updatingStatus === detailModal.order.id && <AdminLoader size="sm" />}
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h4 className="font-semibold mb-2">Customer Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{detailModal.order.customerName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{detailModal.order.customerEmail}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h4 className="font-semibold mb-2">Shipping Address</h4>
              <p className="text-sm">
                {detailModal.order.shippingAddress.street}<br />
                {detailModal.order.shippingAddress.city}, {detailModal.order.shippingAddress.state} {detailModal.order.shippingAddress.zipCode}<br />
                {detailModal.order.shippingAddress.country}<br />
                {detailModal.order.shippingAddress.phone}
              </p>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-semibold mb-2">Items</h4>
              <div className="space-y-3">
                {detailModal.order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md">
                    <img src={item.productImage} alt={item.productName} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.size && `Size: ${item.size}`} {item.color && `• Color: ${item.color}`} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">{formatCurrency(detailModal.order.total)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
