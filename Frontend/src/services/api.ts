import { API_BASE_URL, AUTH_TOKEN_KEY } from '@/utils/constants';
import type { AuthResponse, Product, Order, User } from '@/types';

// API Client with auth header injection
const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    return apiClient<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  getProfile: async (): Promise<User> => {
    return apiClient<User>('/auth/profile');
  },
};

// Products API
export const productsApi = {
  getByGender: async (gender: string): Promise<Product[]> => {
    return apiClient<Product[]>(`/products/${gender}`);
  },

  getBySubcategory: async (gender: string, subcategory: string): Promise<Product[]> => {
    return apiClient<Product[]>(`/products/${gender}/${subcategory}`);
  },

  getById: async (id: string): Promise<Product> => {
    return apiClient<Product>(`/products/${id}`);
  },

  search: async (query: string): Promise<Product[]> => {
    return apiClient<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
  },
};

// Orders API
export const ordersApi = {
  create: async (orderData: Partial<Order>): Promise<Order> => {
    return apiClient<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getMyOrders: async (): Promise<Order[]> => {
    return apiClient<Order[]>('/orders/my-orders');
  },

  getById: async (id: string): Promise<Order> => {
    return apiClient<Order>(`/orders/${id}`);
  },
};
