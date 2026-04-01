export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: AdminOrder[];
  salesData: SalesDataPoint[];
}

export interface SalesDataPoint {
  date: string;
  sales: number;
  orders: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  brand: string;
  gender: 'men' | 'women' | 'kids';
  category: string;
  subcategory: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrder {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  createdAt: string;
  lastOrderDate?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  gender: 'men' | 'women' | 'kids';
  productCount: number;
  createdAt: string;
}

export interface ProductFormData {
  name: string;
  brand: string;
  gender: string;
  category: string;
  subcategory: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}
