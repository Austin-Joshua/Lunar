/**
 * API Client Service
 * Centralized HTTP client with automatic token injection and error handling
 */

import { API_BASE_URL, AUTH_TOKEN_KEY } from '@/utils/constants';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
  timestamp: string;
}

/**
 * Main API client with interceptors
 */
class ApiClient {
  private baseURL: string;
  private timeout: number = 10000; // 10 seconds

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Get authorization token from localStorage
   */
  private getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  /**
   * Build headers with authentication token
   */
  private buildHeaders(options: FetchOptions): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle response and extract data
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    if (!contentType?.includes('application/json')) {
      throw new Error('Invalid response format from server');
    }

    const data: ApiResponse<T> = await response.json();

    // Handle token expiry (401 Unauthorized)
    if (response.status === 401) {
      // Token expired or invalid - clear stored auth data
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('lunar_user');
      
      // Redirect to login
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      const errorMessage = data.message || 'An error occurred';
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    return data.data as T;
  }

  /**
   * Execute fetch with timeout
   */
  private async fetchWithTimeout(
    url: string,
    options: FetchOptions
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(options || {});

    try {
      const response = await this.fetchWithTimeout(url, {
        ...options,
        method: 'GET',
        headers,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(options || {});

    try {
      const response = await this.fetchWithTimeout(url, {
        ...options,
        method: 'POST',
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(options || {});

    try {
      const response = await this.fetchWithTimeout(url, {
        ...options,
        method: 'PUT',
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(options || {});

    try {
      const response = await this.fetchWithTimeout(url, {
        ...options,
        method: 'DELETE',
        headers,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Handle and log errors
   */
  private handleError(error: unknown): void {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Network error: Unable to reach server');
    } else if (error instanceof Error) {
      console.error('API Error:', error.message);
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

export type { ApiResponse, FetchOptions };
