import type { AdminOrder, DashboardStats, SalesDataPoint } from '@/admin/types';

/** Shape returned by Go API for orders (Firestore-backed). */
export interface ApiOrderRecord {
  id: string;
  user_id: string;
  userName?: string | null;
  userEmail?: string | null;
  total_price?: number;
  total?: number;
  status?: string;
  items?: Array<{
    product_id?: string;
    name?: string | null;
    image?: string | null;
    quantity: number;
    price: number;
  }>;
  created_at: string;
  updated_at: string;
}

const VALID_STATUSES: AdminOrder['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

function normalizeStatus(s: string | undefined): AdminOrder['status'] {
  if (s && VALID_STATUSES.includes(s as AdminOrder['status'])) {
    return s as AdminOrder['status'];
  }
  return 'pending';
}

export function mapApiOrderToAdmin(o: ApiOrderRecord): AdminOrder {
  const customerName = o.userName?.trim() || 'Guest';
  const customerEmail = o.userEmail?.trim() || '';
  const total = o.total ?? o.total_price ?? 0;
  return {
    id: o.id,
    userId: o.user_id,
    customerName,
    customerEmail,
    items: (o.items ?? []).map((it, idx) => ({
      productId: it.product_id ?? `line-${idx}`,
      productName: it.name ?? 'Product',
      productImage: it.image ?? '',
      quantity: it.quantity,
      price: it.price,
    })),
    total,
    status: normalizeStatus(o.status),
    shippingAddress: {
      fullName: customerName,
      street: '',
      city: '—',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
    },
    createdAt: o.created_at,
    updatedAt: o.updated_at,
  };
}

export function buildSalesDataFromOrders(orders: ApiOrderRecord[], days = 7): SalesDataPoint[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const points: SalesDataPoint[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    points.push({ date: key, sales: 0, orders: 0 });
  }

  const byDate = new Map(points.map((p) => [p.date, p]));
  for (const o of orders) {
    if (o.status === 'cancelled') continue;
    const key = new Date(o.created_at).toISOString().slice(0, 10);
    const row = byDate.get(key);
    if (!row) continue;
    row.sales += o.total ?? o.total_price ?? 0;
    row.orders += 1;
  }

  return points.map((p) => ({
    ...p,
    sales: Math.round(p.sales),
  }));
}

export function assembleDashboardStats(
  counts: {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  },
  orders: ApiOrderRecord[]
): DashboardStats {
  const sorted = [...orders].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const recentOrders = sorted.slice(0, 5).map(mapApiOrderToAdmin);
  const salesData = buildSalesDataFromOrders(orders, 7);

  return {
    totalUsers: counts.totalUsers,
    totalProducts: counts.totalProducts,
    totalOrders: counts.totalOrders,
    totalRevenue: Math.round(counts.totalRevenue),
    recentOrders,
    salesData,
  };
}
