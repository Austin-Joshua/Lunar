import { ADMIN_API_BASE_URL, ADMIN_TOKEN_KEY } from '@/admin/utils/constants';
import type { 
  AdminUser, 
  DashboardStats, 
  AdminProduct, 
  AdminOrder, 
  Customer, 
  Category,
  ProductFormData 
} from '@/admin/types';

// Admin API Client with auth header
const adminApiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);

  if (!token && !endpoint.includes('/auth/login')) {
    throw new Error('Unauthorized');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${ADMIN_API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    window.location.href = '/admin/login';
    throw new Error('Session expired');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// Auth API
export const adminAuthApi = {
  login: async (email: string, password: string): Promise<{ user: AdminUser; token: string }> => {
    return adminApiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role: 'admin' }),
    });
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    return adminApiClient('/admin/stats');
  },
};

// Products API
export const adminProductsApi = {
  getAll: async (): Promise<AdminProduct[]> => {
    return adminApiClient('/products');
  },

  getById: async (id: string): Promise<AdminProduct> => {
    return adminApiClient(`/products/${id}`);
  },

  create: async (data: ProductFormData): Promise<AdminProduct> => {
    return adminApiClient('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<ProductFormData>): Promise<AdminProduct> => {
    return adminApiClient(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<void> => {
    return adminApiClient(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Orders API
export const adminOrdersApi = {
  getAll: async (): Promise<AdminOrder[]> => {
    return adminApiClient('/orders');
  },

  getById: async (id: string): Promise<AdminOrder> => {
    return adminApiClient(`/orders/${id}`);
  },

  updateStatus: async (id: string, status: string): Promise<AdminOrder> => {
    return adminApiClient(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Users API
export const adminUsersApi = {
  getAll: async (): Promise<Customer[]> => {
    return adminApiClient('/users');
  },
};

// Categories API
export const adminCategoriesApi = {
  getAll: async (): Promise<Category[]> => {
    return adminApiClient('/categories');
  },

  create: async (data: { name: string; gender: string }): Promise<Category> => {
    return adminApiClient('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
