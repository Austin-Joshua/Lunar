import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { formatPrice, PLACEHOLDER_IMAGE } from '@/utils/constants';
import { cn } from '@/lib/utils';
import type { Order } from '@/types';

// Mock orders for display
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      {
        product: {
          id: '1',
          name: 'Premium Linen Oxford Shirt',
          brand: 'LUNAR Essentials',
          price: 89.00,
          description: 'Elegant linen shirt',
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
          gender: 'men',
          category: 'shirts',
          subcategory: 'shirts',
          inStock: true,
        },
        quantity: 2,
        size: 'M',
      },
    ],
    total: 178.00,
    status: 'shipped',
    shippingAddress: {
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1 555-123-4567',
    },
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-16T14:30:00Z',
  },
  {
    id: 'ORD-002',
    userId: '1',
    items: [
      {
        product: {
          id: '2',
          name: 'Silk Blend Blouse',
          brand: 'LUNAR Collection',
          price: 145.00,
          description: 'Luxurious silk blouse',
          image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=400&h=500&fit=crop',
          gender: 'women',
          category: 'tops',
          subcategory: 'tops',
          inStock: true,
        },
        quantity: 1,
        size: 'S',
      },
    ],
    total: 145.00,
    status: 'delivered',
    shippingAddress: {
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1 555-123-4567',
    },
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-14T09:00:00Z',
  },
];

const statusConfig = {
  pending: { icon: Clock, label: 'Pending', color: 'text-yellow-600' },
  processing: { icon: Package, label: 'Processing', color: 'text-blue-600' },
  shipped: { icon: Truck, label: 'Shipped', color: 'text-purple-600' },
  delivered: { icon: CheckCircle, label: 'Delivered', color: 'text-green-600' },
  cancelled: { icon: Clock, label: 'Cancelled', color: 'text-red-600' },
};

const Orders: React.FC = () => {
  const orders = mockOrders; // Replace with API call

  if (orders.length === 0) {
    return (
      <div className="lunar-container py-12">
        <EmptyState type="orders" />
      </div>
    );
  }

  return (
    <div className="lunar-container py-8 md:py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;

          return (
            <div key={order.id} className="lunar-card p-6">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className={cn("flex items-center gap-2", status.color)}>
                  <StatusIcon className="h-4 w-4" />
                  <span className="font-medium">{status.label}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="py-4 space-y-4">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image || PLACEHOLDER_IMAGE}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item.product.brand}
                      </p>
                      <p className="font-medium">{item.product.name}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        {item.size && <span>Size: {item.size}</span>}
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <p className="mt-1 font-medium">{formatPrice(item.product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="pt-4 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Shipping to: {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Order Total</p>
                  <p className="text-xl font-semibold">{formatPrice(order.total)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
