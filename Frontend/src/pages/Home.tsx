import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RotateCcw, Shield } from 'lucide-react';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types';

// Mock featured products for display
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Linen Oxford Shirt',
    brand: 'LUNAR Essentials',
    price: 89.00,
    originalPrice: 120.00,
    description: 'Elegant linen shirt',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    gender: 'men',
    category: 'shirts',
    subcategory: 'shirts',
    inStock: true,
  },
  {
    id: '2',
    name: 'Silk Blend Blouse',
    brand: 'LUNAR Collection',
    price: 145.00,
    description: 'Luxurious silk blouse',
    image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=400&h=500&fit=crop',
    gender: 'women',
    category: 'tops',
    subcategory: 'tops',
    inStock: true,
  },
  {
    id: '3',
    name: 'Classic Chinos',
    brand: 'LUNAR Essentials',
    price: 75.00,
    description: 'Comfortable chino pants',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
    gender: 'men',
    category: 'pants',
    subcategory: 'pants',
    inStock: true,
  },
  {
    id: '4',
    name: 'Designer Crossbody Bag',
    brand: 'LUNAR Luxe',
    price: 195.00,
    originalPrice: 250.00,
    description: 'Premium leather bag',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
    gender: 'women',
    category: 'bags',
    subcategory: 'bags',
    inStock: true,
  },
];

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
];

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=1080&fit=crop"
            alt="LUNAR Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent" />
        </div>

        <div className="lunar-container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-primary-foreground/80 text-sm uppercase tracking-widest mb-4 animate-slide-up">
              New Season Collection
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Discover Your
              <br />
              <span className="text-lunar-silver">Signature Style</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Curated fashion for the modern individual. Quality meets elegance in every piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/shop/women" className="lunar-btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Shop Women
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/shop/men" className="lunar-btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Shop Men
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-secondary py-6 border-y">
        <div className="lunar-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center justify-center gap-3 text-center md:text-left">
                <feature.icon className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="lunar-container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections designed for every style and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            title="Men"
            subtitle="New Collection"
            href="/shop/men"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"
          />
          <CategoryCard
            title="Women"
            subtitle="Trending Now"
            href="/shop/women"
            image="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop"
          />
          <CategoryCard
            title="Kids"
            subtitle="Fun & Playful"
            href="/shop/kids"
            image="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&h=800&fit=crop"
            variant="kids"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="lunar-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Hand-picked favorites from our collection</p>
            </div>
            <Link to="/shop/men" className="lunar-btn-outline">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="lunar-container py-16 md:py-24">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=500&fit=crop"
            alt="Newsletter"
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/60 flex items-center">
            <div className="lunar-container">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Stay in the Loop
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  Subscribe to receive exclusive offers, early access to new arrivals, and style inspiration.
                </p>
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                  />
                  <button type="submit" className="px-6 py-3 bg-primary-foreground text-primary font-medium rounded-md hover:bg-primary-foreground/90 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
