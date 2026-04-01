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

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  // First check sampleProducts for exact match
  let product = sampleProducts.find(p => p.id === id);
  if (product) return product;

  // If not found, parse the generated ID format (e.g., "men-shirts-1")
  const idParts = id.split('-');
  if (idParts.length >= 3) {
    const [gender, subcategory, index] = idParts;
    const idx = parseInt(index) - 1;
    
    // Create a product based on category and index
    const categoryKey = `${gender}_${subcategory}`;
    
    const categoryNames: Record<string, string[]> = {
      men_shirts: ['Oxford Shirt', 'Casual Button-Up', 'Formal Shirt', 'Linen Shirt', 'Polo Shirt', 'Denim Shirt', 'Henley Shirt', 'T-Shirt'],
      men_pants: ['Classic Chinos', 'Denim Jeans', 'Dress Pants', 'Casual Trousers', 'Joggers', 'Cargo Pants', 'Shorts', 'Linen Pants'],
      men_footwear: ['Leather Sneakers', 'Dress Shoes', 'Casual Loafers', 'Sports Shoes', 'Sandals', 'Boots', 'Slip-ons', 'Running Shoes'],
      men_accessories: ['Leather Belt', 'Wrist Watch', 'Baseball Cap', 'Scarf', 'Tie', 'Wallet', 'Sunglasses', 'Backpack'],
      men_bags: ['Laptop Bag', 'Messenger Bag', 'Travel Backpack', 'Crossbody Bag', 'Duffel Bag', 'Weekend Bag', 'Camera Bag', 'Briefcase'],
      
      women_tops: ['Casual T-Shirt', 'Blouse', 'Crop Top', 'Tank Top', 'Sweater', 'Cardigan', 'Long Sleeve Top', 'Tunic'],
      women_pants: ['Skinny Jeans', 'Bootcut Jeans', 'Leggings', 'Cargo Pants', 'Joggers', 'Casual Trousers', 'Shorts', 'Wide-Leg Pants'],
      women_skirts: ['Pencil Skirt', 'A-Line Skirt', 'Maxi Skirt', 'Mini Skirt', 'Denim Skirt', 'Pleated Skirt', 'Wrap Skirt', 'Asymmetrical Skirt'],
      women_footwear: ['Heeled Pumps', 'Flat Sandals', 'Ankle Boots', 'Sneakers', 'Ballet Flats', 'Wedges', 'Loafers', 'Strappy Heels'],
      women_accessories: ['Handbag', 'Shoulder Bag', 'Necklace', 'Bracelet', 'Earrings', 'Hat', 'Scarf', 'Sunglasses'],
      women_bags: ['Tote Bag', 'Crossbody Bag', 'Backpack', 'Clutch', 'Satchel', 'Hobo Bag', 'Shoulder Bag', 'Leather Bag'],
      
      kids_boys: ['Boys T-Shirt', 'Boys Jeans', 'Boys Shorts', 'Boys Hoodie', 'Boys Jacket', 'Boys Shoes', 'Boys Hat', 'Boys Backpack'],
      kids_girls: ['Girls Dress', 'Girls T-Shirt', 'Girls Skirt', 'Girls Leggings', 'Girls Jacket', 'Girls Shoes', 'Girls Backpack', 'Girls Hair Clip'],
      kids_footwear: ['Kids Sneakers', 'Kids Sandals', 'Kids Boots', 'Kids Slip-ons', 'Kids Running Shoes', 'Kids Casual Shoes', 'Kids Sports Shoes', 'Kids Loafers'],
      kids_accessories: ['Kids Hat', 'Kids Scarf', 'Kids Backpack', 'Kids Watch', 'Kids Sunglasses', 'Kids Socks', 'Kids Belt', 'Kids Cap'],
    };

    const images: Record<string, string[]> = {
      men: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
      ],
      women: [
        'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=600&fit=crop',
      ],
      kids: [
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=600&fit=crop',
      ],
    };

    const brands = ['LUNAR Essentials', 'LUNAR Collection', 'LUNAR Luxe', 'LUNAR Sport'];
    const productNames = categoryNames[categoryKey] || ['Product Item'];
    const genderImages = images[gender] || images.men;

    if (idx < productNames.length) {
      return {
        id,
        name: productNames[idx],
        brand: brands[idx % brands.length],
        price: gender === 'kids' 
          ? 399 + (idx * 150)
          : gender === 'women'
            ? 1299 + (idx * 400)
            : 999 + (idx * 350),
        originalPrice: Math.random() > 0.5 
          ? (gender === 'kids' 
              ? 599 + (idx * 200)
              : gender === 'women'
                ? 1799 + (idx * 500)
                : 1499 + (idx * 450))
          : undefined,
        description: `Premium ${subcategory} item - High quality ${gender} fashion from LUNAR collection`,
        image: genderImages[idx % genderImages.length],
        images: [genderImages[idx % genderImages.length], genderImages[(idx + 1) % genderImages.length]],
        gender: gender as 'men' | 'women' | 'kids',
        category: subcategory,
        subcategory,
        sizes: gender === 'kids' ? ['2-3Y', '3-4Y', '4-5Y', '5-6Y'] : ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Blue', 'Navy'],
        stock: 50 + (idx * 10),
        inStock: true,
        isNew: idx % 3 === 0,
        isSale: idx % 2 === 0,
        rating: 4 + (Math.random() * 0.9),
        reviewCount: 50 + (idx * 20),
        features: ['Premium Quality', 'Comfortable', 'Durable', 'Stylish'],
        materials: ['Cotton', 'Polyester'],
        careInstructions: ['Gentle wash', 'Air dry recommended'],
        shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true },
        tags: idx % 2 === 0 ? ['bestseller'] : ['trending'],
      };
    }
  }

  return undefined;
};
