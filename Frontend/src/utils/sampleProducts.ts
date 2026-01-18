import type { Product } from '@/types';

export const sampleProducts: Product[] = [
  // MEN'S COLLECTION
  {
    id: '1',
    name: 'Premium Linen Oxford Shirt',
    brand: 'LUNAR Essentials',
    price: 2499,
    originalPrice: 3999,
    description: 'Elegant linen shirt perfect for any occasion',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop&crop=faces&blend=https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=600&fit=crop&blend-mode=screen&mark=https://images.unsplash.com/photo-1598033129519-d4e773ecb7c6?w=100&h=100&fit=crop&mark-align=top-right&mark-pad=10'
    ],
    gender: 'men',
    category: 'shirts',
    subcategory: 'shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Beige', 'Black'],
    stock: 45,
    inStock: true,
    isNew: true,
    isSale: true,
    rating: 4.5,
    reviewCount: 128,
    features: [
      '100% Premium Linen',
      'Breathable & Lightweight',
      'Perfect for Summers',
      'Easy Care'
    ],
    materials: ['Linen 100%'],
    careInstructions: [
      'Machine wash cold',
      'Tumble dry low',
      'Iron on low heat'
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3,
      cod: true
    },
    tags: ['bestseller', 'summer-essential']
  },
  {
    id: '2',
    name: 'Classic Chinos',
    brand: 'LUNAR Essentials',
    price: 1999,
    originalPrice: 2999,
    description: 'Comfortable and versatile chino pants',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop',
    gender: 'men',
    category: 'pants',
    subcategory: 'pants',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Navy', 'Olive', 'Black', 'Burgundy'],
    stock: 62,
    inStock: true,
    rating: 4.3,
    reviewCount: 95,
    features: [
      'Premium Cotton Blend',
      'Comfortable Fit',
      'Versatile Style',
      'Professional Look'
    ],
    materials: ['Cotton 65%', 'Polyester 35%'],
    careInstructions: [
      'Machine wash warm',
      'Tumble dry medium'
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      cod: true
    },
    tags: ['bestseller']
  },
  {
    id: '3',
    name: 'Casual Crew Neck T-Shirt',
    brand: 'LUNAR Basics',
    price: 699,
    description: 'Perfect everyday casual t-shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
    gender: 'men',
    category: 'tops',
    subcategory: 'tshirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Gray', 'Navy', 'Red'],
    stock: 150,
    inStock: true,
    isNew: true,
    features: [
      '100% Organic Cotton',
      'Soft & Durable',
      'Eco-Friendly Production'
    ],
    materials: ['Organic Cotton 100%'],
    careInstructions: [
      'Machine wash 30°C',
      'Gentle cycle',
      'Air dry recommended'
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      cod: true
    },
    tags: ['sustainable', 'bestseller']
  },

  // WOMEN'S COLLECTION
  {
    id: '4',
    name: 'Silk Blend Blouse',
    brand: 'LUNAR Collection',
    price: 3499,
    originalPrice: 4999,
    description: 'Luxurious silk blouse for elegant occasions',
    image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=500&h=600&fit=crop',
    gender: 'women',
    category: 'tops',
    subcategory: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Black', 'Blush', 'Sage'],
    stock: 28,
    inStock: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 156,
    features: [
      '60% Silk, 40% Cotton',
      'Elegant Design',
      'Breathable Fabric',
      'Machine Washable'
    ],
    materials: ['Silk 60%', 'Cotton 40%'],
    careInstructions: [
      'Gentle wash 30°C',
      'Lay flat to dry',
      'Light steam only'
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3,
      cod: true
    },
    tags: ['bestseller', 'premium']
  },
  {
    id: '5',
    name: 'Designer Crossbody Bag',
    brand: 'LUNAR Luxe',
    price: 4999,
    originalPrice: 6999,
    description: 'Premium leather crossbody bag',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop',
    gender: 'women',
    category: 'bags',
    subcategory: 'bags',
    colors: ['Black', 'Cognac', 'Tan', 'Navy'],
    stock: 15,
    inStock: true,
    isSale: true,
    rating: 4.9,
    reviewCount: 203,
    features: [
      'Genuine Leather',
      'Adjustable Strap',
      '3 Interior Pockets',
      'RFID Protection',
      'Lifetime Warranty'
    ],
    materials: ['Genuine Leather', 'Metal Hardware'],
    careInstructions: [
      'Clean with soft cloth',
      'Condition annually',
      'Store in dust bag'
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      cod: true
    },
    tags: ['premium', 'bestseller']
  },
  {
    id: '6',
    name: 'High-Waist Yoga Pants',
    brand: 'LUNAR Active',
    price: 1899,
    description: 'Comfortable yoga pants for workouts',
    image: 'https://images.unsplash.com/photo-1506629082632-41ba4882feee?w=500&h=600&fit=crop',
    gender: 'women',
    category: 'bottoms',
    subcategory: 'pants',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy', 'Sage', 'Gray'],
    stock: 78,
    inStock: true,
    isNew: true,
    rating: 4.6,
    reviewCount: 142,
    features: [
      '4-Way Stretch',
      'High Waist Support',
      'Moisture Wicking',
      'Squat Proof',
      'Pockets on both sides'
    ],
    materials: ['Nylon 75%', 'Spandex 25%'],
    careInstructions: [
      'Machine wash cold',
      'Hang dry',
      'Avoid fabric softener'
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      cod: true
    },
    tags: ['sustainable', 'bestseller']
  },

  // KIDS' COLLECTION
  {
    id: '7',
    name: 'Colorful Kids Dress',
    brand: 'LUNAR Kids',
    price: 1299,
    originalPrice: 1799,
    description: 'Vibrant and comfortable dress for kids',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500&h=600&fit=crop',
    gender: 'kids',
    category: 'dresses',
    subcategory: 'dresses',
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y'],
    colors: ['Pink', 'Purple', 'Blue', 'Yellow'],
    stock: 89,
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 89,
    features: [
      '100% Organic Cotton',
      'Safe for Sensitive Skin',
      'Vibrant Colors',
      'Easy Care',
      'Fun Prints'
    ],
    materials: ['Organic Cotton 100%'],
    careInstructions: [
      'Machine wash 30°C',
      'Gentle cycle',
      'Color-safe bleach only'
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      cod: true
    },
    tags: ['sustainable', 'bestseller']
  },
  {
    id: '8',
    name: 'Kids Casual T-Shirt',
    brand: 'LUNAR Kids',
    price: 599,
    description: 'Soft and comfortable kids t-shirt',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop',
    gender: 'kids',
    category: 'tops',
    subcategory: 'tshirts',
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y'],
    colors: ['White', 'Light Blue', 'Green', 'Pink'],
    stock: 200,
    inStock: true,
    rating: 4.5,
    reviewCount: 120,
    features: [
      'Soft Cotton Blend',
      'Durable Stitching',
      'Hypoallergenic',
      'Quick Dry',
      'Fade Resistant'
    ],
    materials: ['Cotton 80%', 'Polyester 20%'],
    careInstructions: [
      'Machine wash 30°C',
      'Tumble dry low'
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      cod: true
    },
    tags: ['bestseller']
  },
  {
    id: '9',
    name: 'Denim Jacket for Kids',
    brand: 'LUNAR Kids',
    price: 1699,
    originalPrice: 2299,
    description: 'Classic denim jacket for kids',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=600&fit=crop',
    gender: 'kids',
    category: 'jackets',
    subcategory: 'jackets',
    sizes: ['3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y'],
    colors: ['Light Blue', 'Medium Blue', 'Dark Blue'],
    stock: 42,
    inStock: true,
    isSale: true,
    isNew: true,
    rating: 4.4,
    reviewCount: 67,
    features: [
      '100% Cotton Denim',
      'Adjustable Waist',
      'Two Front Pockets',
      'Durable Construction',
      'Timeless Style'
    ],
    materials: ['Cotton 100% Denim'],
    careInstructions: [
      'Machine wash 40°C',
      'Turn inside out before washing',
      'Air dry preferred'
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3,
      cod: true
    },
    tags: []
  }
];

// Additional featured products
export const featuredProducts = sampleProducts.slice(0, 4);
export const newArrivals = sampleProducts.filter(p => p.isNew);
export const saleProducts = sampleProducts.filter(p => p.isSale);
export const bestsellers = sampleProducts.filter(p => p.tags?.includes('bestseller'));
