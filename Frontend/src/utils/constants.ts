// API Base URL - Set via VITE_API_BASE_URL environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Auth Token Key
export const AUTH_TOKEN_KEY = 'lunar_auth_token';
export const USER_DATA_KEY = 'lunar_user';
export const CART_STORAGE_KEY = 'lunar_cart';

// Categories
export const GENDER_CATEGORIES = {
  MEN: 'men',
  WOMEN: 'women',
  KIDS: 'kids',
} as const;

export const MEN_SUBCATEGORIES = [
  { name: 'Shirts', slug: 'shirts', icon: '👔' },
  { name: 'Pants', slug: 'pants', icon: '👖' },
  { name: 'Footwear', slug: 'footwear', icon: '👟' },
  { name: 'Accessories', slug: 'accessories', icon: '⌚' },
  { name: 'Bags', slug: 'bags', icon: '🎒' },
];

export const WOMEN_SUBCATEGORIES = [
  { name: 'Tops', slug: 'tops', icon: '👚' },
  { name: 'Pants', slug: 'pants', icon: '👖' },
  { name: 'Skirts', slug: 'skirts', icon: '👗' },
  { name: 'Footwear', slug: 'footwear', icon: '👠' },
  { name: 'Accessories', slug: 'accessories', icon: '💍' },
  { name: 'Bags', slug: 'bags', icon: '👜' },
];

export const KIDS_SUBCATEGORIES = [
  { name: 'Boys', slug: 'boys', icon: '👦' },
  { name: 'Girls', slug: 'girls', icon: '👧' },
  { name: 'Footwear', slug: 'footwear', icon: '👟' },
  { name: 'Accessories', slug: 'accessories', icon: '🧢' },
];

// Placeholder images
export const PLACEHOLDER_IMAGE = '/placeholder.svg';

// Price formatting
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
