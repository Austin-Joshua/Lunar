/**
 * API Service Module
 * Uses centralized apiClient for all HTTP requests
 */

import { apiClient } from './apiClient';
import type { AuthResponse, Product, Order, User } from '@/types';

type BackendTokenResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: User;
};

function mapTokenResponse(data: BackendTokenResponse): AuthResponse {
  return {
    user: data.user,
    token: data.accessToken,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
}

// Note: apiClient automatically handles:
// - Token injection from localStorage
// - CORS headers
// - Error handling
// - Request/response serialization

// Auth API
export const authApi = {
  /**
   * User login
   * Returns: token and user data
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const data = await apiClient.post<BackendTokenResponse>('/auth/login', { email, password });
    return mapTokenResponse(data);
  },

  /**
   * User registration
   * Returns: token and new user data
   */
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const data = await apiClient.post<BackendTokenResponse>('/auth/register', { name, email, password });
    return mapTokenResponse(data);
  },

  /**
   * Sign in with Google (Firebase ID token verified by backend)
   */
  loginWithGoogle: async (idToken: string): Promise<AuthResponse> => {
    const data = await apiClient.post<BackendTokenResponse>('/auth/google', { idToken });
    return mapTokenResponse(data);
  },

  /**
   * Get authenticated user profile
   * Requires: Authorization header with valid JWT
   */
  getProfile: async (): Promise<User> => {
    return apiClient.get<User>('/auth/profile');
  },
};

// Products API
export const productsApi = {
  /**
   * Get all products
   */
  getAll: async (): Promise<Product[]> => {
    return apiClient.get<Product[]>('/products');
  },

  /**
   * Get products by gender (men, women, kids)
   */
  getByGender: async (gender: string): Promise<Product[]> => {
    return apiClient.get<Product[]>(`/products/${gender}`);
  },

  /**
   * Get products by gender and subcategory
   */
  getBySubcategory: async (gender: string, subcategory: string): Promise<Product[]> => {
    return apiClient.get<Product[]>(`/products/${gender}/${subcategory}`);
  },

  /**
   * Get product by ID
   */
  getById: async (id: string): Promise<Product> => {
    return apiClient.get<Product>(`/products/${id}`);
  },

  /**
   * Search products by query
   */
  search: async (query: string): Promise<Product[]> => {
    return apiClient.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
  },

  /**
   * Create product (admin only)
   */
  create: async (data: Partial<Product>): Promise<Product> => {
    return apiClient.post<Product>('/products', data);
  },

  /**
   * Update product (admin only)
   */
  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    return apiClient.put<Product>(`/products/${id}`, data);
  },

  /**
   * Delete product (admin only)
   */
  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/products/${id}`);
  },
};

// Orders API
export const ordersApi = {
  /**
   * Create new order
   * Requires: Authentication
   */
  create: async (orderData: Partial<Order>): Promise<Order> => {
    return apiClient.post<Order>('/orders', orderData);
  },

  /**
   * Get user's orders
   * Requires: Authentication
   */
  getMyOrders: async (): Promise<Order[]> => {
    return apiClient.get<Order[]>('/orders/my-orders');
  },

  /**
   * Get order by ID
   * Requires: Authentication
   */
  getById: async (id: string): Promise<Order> => {
    return apiClient.get<Order>(`/orders/${id}`);
  },

  /**
   * Get all orders (admin only)
   * Requires: Authentication + Admin role
   */
  getAll: async (): Promise<Order[]> => {
    return apiClient.get<Order[]>('/orders');
  },

  /**
   * Update order status (admin only)
   * Requires: Authentication + Admin role
   */
  updateStatus: async (id: string, status: string): Promise<Order> => {
    return apiClient.put<Order>(`/orders/${id}/status`, { status });
  },
};
