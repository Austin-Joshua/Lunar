import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Star, Zap } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { WOMEN_SUBCATEGORIES } from '@/utils/constants';
import type { Product } from '@/types';

const featuredProducts: Product[] = [
  {
    id: 'women-1',
    name: 'Silk Blend Blouse',
    brand: 'LUNAR Collection',
    price: 3499,
    originalPrice: 4499,
    description: 'Luxurious silk blouse',
    image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=400&h=500&fit=crop',
    gender: 'women',
    category: 'tops',
    subcategory: 'tops',
    stock: 28,
    inStock: true,
    isSale: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 156,
    features: ['60% Silk, 40% Cotton', 'Elegant Design', 'Breathable'],
    tags: ['bestseller', 'premium'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
  {
    id: 'women-2',
    name: 'Designer Crossbody Bag',
    brand: 'LUNAR Luxe',
    price: 4999,
    originalPrice: 6999,
    description: 'Premium leather bag',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
    gender: 'women',
    category: 'bags',
    subcategory: 'bags',
    stock: 15,
    inStock: true,
    isSale: true,
    rating: 4.9,
    reviewCount: 203,
    features: ['Genuine Leather', 'RFID Protection', 'Lifetime Warranty'],
    tags: ['premium', 'bestseller'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
  {
    id: 'women-3',
    name: 'Elegant Midi Skirt',
    brand: 'LUNAR Collection',
    price: 2299,
    description: 'Flowing midi skirt',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
    gender: 'women',
    category: 'skirts',
    subcategory: 'skirts',
    stock: 45,
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    features: ['Premium Fabric', 'Comfortable fit', 'Elegant design'],
    tags: ['bestseller'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
  {
    id: 'women-4',
    name: 'Statement Heels',
    brand: 'LUNAR Luxe',
    price: 3899,
    originalPrice: 4999,
    description: 'Designer heels',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop',
    gender: 'women',
    category: 'footwear',
    subcategory: 'footwear',
    stock: 32,
    inStock: true,
    isSale: true,
    rating: 4.7,
    reviewCount: 142,
    features: ['Premium leather', 'Comfortable cushioning', 'Elegant design'],
    tags: ['bestseller'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
];

const WomenHome: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=900&fit=crop"
            alt="Women's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
        </div>
        <div className="lunar-container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-primary-foreground/80 text-xs uppercase tracking-widest mb-4 font-semibold">
              ✨ Women's Exclusive Collection
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Elegance
              <br />Redefined
            </h1>
            <p className="text-lg text-primary-foreground/85 max-w-md mb-8">
              Discover timeless pieces that celebrate feminine strength and sophistication. Curated with passion, crafted with precision.
            </p>
            <Link to="/shop/women/tops" className="inline-flex items-center gap-2 px-7 py-4 bg-primary-foreground text-primary font-semibold rounded-lg hover:shadow-xl transition-all hover:scale-105">
              Explore Collection
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending & Features */}
      <section className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 py-12 border-y">
        <div className="lunar-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <Heart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Trending Now</h3>
                <p className="text-sm text-muted-foreground">Discover what's hot this season with over 200+ new arrivals daily</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Star className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Handpicked pieces from trusted designers and brands worldwide</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Zap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Flash Sales</h3>
                <p className="text-sm text-muted-foreground">Get up to 70% off on selected items every week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="lunar-container py-16 md:py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl">Express yourself through our diverse collection of styles and designs</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {WOMEN_SUBCATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop/women/${cat.slug}`}
              className="group lunar-card p-8 text-center hover:shadow-xl transition-all hover:scale-105 transform"
            >
              <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{cat.icon}</span>
              <p className="font-semibold text-lg">{cat.name}</p>
              <p className="text-xs text-muted-foreground mt-2">Browse</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="lunar-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Fresh styles just added to our collection</p>
            </div>
            <Link to="/shop/women/tops" className="text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Limited Offer Banner */}
      <section className="lunar-container py-12">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 p-12 text-center">
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              🎁 Limited Time Offer
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
              Get 30% OFF on your first purchase. Use code: LUNAR30 at checkout.
            </p>
            <Link to="/shop/women" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transition-all">
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomenHome;
