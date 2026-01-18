import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Zap, Shield, Truck } from 'lucide-react';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { MEN_SUBCATEGORIES } from '@/utils/constants';
import type { Product } from '@/types';

const featuredProducts: Product[] = [
  {
    id: 'men-1',
    name: 'Premium Linen Oxford Shirt',
    brand: 'LUNAR Essentials',
    price: 2499,
    originalPrice: 3999,
    description: 'Elegant linen shirt',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    gender: 'men',
    category: 'shirts',
    subcategory: 'shirts',
    stock: 45,
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 128,
    features: ['100% Premium Linen', 'Breathable', 'Perfect for summers'],
    tags: ['bestseller', 'summer-essential'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
  {
    id: 'men-2',
    name: 'Classic Chinos',
    brand: 'LUNAR Essentials',
    price: 1999,
    originalPrice: 2999,
    description: 'Comfortable chino pants',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
    gender: 'men',
    category: 'pants',
    subcategory: 'pants',
    stock: 62,
    inStock: true,
    rating: 4.5,
    reviewCount: 95,
    features: ['Cotton blend', 'Comfortable fit', 'Versatile'],
    tags: ['bestseller'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
  {
    id: 'men-3',
    name: 'Leather Sneakers',
    brand: 'LUNAR Sport',
    price: 3499,
    originalPrice: 4499,
    description: 'Premium leather sneakers',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=500&fit=crop',
    gender: 'men',
    category: 'footwear',
    subcategory: 'footwear',
    stock: 38,
    inStock: true,
    isSale: true,
    rating: 4.7,
    reviewCount: 156,
    features: ['Genuine leather', 'Comfortable cushioning', 'Durable sole'],
    tags: ['bestseller'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
  {
    id: 'men-4',
    name: 'Leather Belt',
    brand: 'LUNAR Luxe',
    price: 1299,
    description: 'Premium leather belt',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    gender: 'men',
    category: 'accessories',
    subcategory: 'accessories',
    stock: 89,
    inStock: true,
    rating: 4.6,
    reviewCount: 73,
    features: ['Genuine leather', 'Adjustable sizing', 'Premium buckle'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
];

const MenHome: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=900&fit=crop"
            alt="Men's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
        </div>
        <div className="lunar-container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-primary-foreground/80 text-xs uppercase tracking-widest mb-4 font-semibold">
              ✨ Men's Collection 2026
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Refined Style,
              <br />Modern Edge
            </h1>
            <p className="text-lg text-primary-foreground/85 max-w-md mb-8">
              Explore our curated selection of premium menswear designed for the modern gentleman. Quality meets elegance in every piece.
            </p>
            <Link to="/shop/men/shirts" className="inline-flex items-center gap-2 px-7 py-4 bg-primary-foreground text-primary font-semibold rounded-lg hover:shadow-xl transition-all hover:scale-105">
              Shop Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-primary/5 py-8 border-y">
        <div className="lunar-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-muted-foreground">Premium Products</p>
            </div>
            <div className="text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold">50%</p>
              <p className="text-sm text-muted-foreground">Off Sale Items</p>
            </div>
            <div className="text-center">
              <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold">FREE</p>
              <p className="text-sm text-muted-foreground">Shipping Orders 5K+</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-muted-foreground">Authentic Goods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="lunar-container py-16 md:py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl">Find exactly what you're looking for from our wide range of categories</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MEN_SUBCATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop/men/${cat.slug}`}
              className="group lunar-card p-8 text-center hover:shadow-xl transition-all hover:scale-105 transform"
            >
              <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{cat.icon}</span>
              <p className="font-semibold text-lg">{cat.name}</p>
              <p className="text-xs text-muted-foreground mt-2">Browse Collection</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="lunar-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Collection</h2>
              <p className="text-muted-foreground">Bestsellers and new arrivals curated just for you</p>
            </div>
            <Link to="/shop/men/shirts" className="text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Promo Banner */}
      <section className="lunar-container py-12">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/70 p-12 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}} />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              💎 Exclusive Member Benefits
            </h3>
            <p className="text-primary-foreground/85 mb-6 max-w-2xl mx-auto">
              Join our loyalty program and enjoy exclusive discounts, early access to new collections, and premium customer service.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:shadow-lg transition-all">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenHome;
