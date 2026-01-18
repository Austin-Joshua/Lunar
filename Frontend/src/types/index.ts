export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images?: string[];
  gender: 'men' | 'women' | 'kids';
  category: string;
  subcategory: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  stock?: number; // Total stock quantity
  stockBySizeColor?: Record<string, number>; // Stock by size/color combination
  rating?: number;
  reviewCount?: number;
  features?: string[]; // Product features/highlights
  materials?: string[]; // Material composition
  careInstructions?: string[]; // Care instructions
  isNew?: boolean; // New arrival indicator
  isSale?: boolean; // Sale indicator
  shippingInfo?: {
    freeShipping?: boolean;
    estimatedDays?: number;
    cod?: boolean; // Cash on Delivery
  };
  tags?: string[]; // Tags like "sustainable", "bestseller", etc
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  accessToken?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
