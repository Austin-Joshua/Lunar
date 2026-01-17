import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { WOMEN_SUBCATEGORIES } from '@/utils/constants';
import type { Product } from '@/types';

const featuredProducts: Product[] = [
  {
    id: 'women-1',
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
    id: 'women-2',
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
  {
    id: 'women-3',
    name: 'Elegant Midi Skirt',
    brand: 'LUNAR Collection',
    price: 95.00,
    description: 'Flowing midi skirt',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
    gender: 'women',
    category: 'skirts',
    subcategory: 'skirts',
    inStock: true,
  },
  {
    id: 'women-4',
    name: 'Statement Heels',
    brand: 'LUNAR Luxe',
    price: 185.00,
    description: 'Designer heels',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop',
    gender: 'women',
    category: 'footwear',
    subcategory: 'footwear',
    inStock: true,
  },
];

const WomenHome: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop"
            alt="Women's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/30" />
        </div>
        <div className="lunar-container relative z-10">
          <span className="text-primary-foreground/80 text-sm uppercase tracking-widest mb-2 block">
            Women's Collection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            Elegance
            <br />Redefined
          </h1>
          <p className="text-primary-foreground/80 max-w-md">
            Discover timeless pieces that celebrate feminine strength and sophistication.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="lunar-container py-12 md:py-16">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {WOMEN_SUBCATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/women/${cat.slug}`}
              className="lunar-card p-6 text-center hover:shadow-lunar-lg transition-all"
            >
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <p className="font-medium">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="lunar-container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link to="/women/tops" className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
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
    </div>
  );
};

export default WomenHome;
