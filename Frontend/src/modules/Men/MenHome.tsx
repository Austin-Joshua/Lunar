import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { MEN_SUBCATEGORIES } from '@/utils/constants';
import type { Product } from '@/types';

const featuredProducts: Product[] = [
  {
    id: 'men-1',
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
    id: 'men-2',
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
    id: 'men-3',
    name: 'Leather Sneakers',
    brand: 'LUNAR Sport',
    price: 145.00,
    description: 'Premium leather sneakers',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=500&fit=crop',
    gender: 'men',
    category: 'footwear',
    subcategory: 'footwear',
    inStock: true,
  },
  {
    id: 'men-4',
    name: 'Leather Belt',
    brand: 'LUNAR Luxe',
    price: 65.00,
    description: 'Premium leather belt',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    gender: 'men',
    category: 'accessories',
    subcategory: 'accessories',
    inStock: true,
  },
];

const MenHome: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=800&fit=crop"
            alt="Men's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/30" />
        </div>
        <div className="lunar-container relative z-10">
          <span className="text-primary-foreground/80 text-sm uppercase tracking-widest mb-2 block">
            Men's Collection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            Refined Style,
            <br />Modern Edge
          </h1>
          <p className="text-primary-foreground/80 max-w-md">
            Explore our curated selection of menswear designed for the modern gentleman.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="lunar-container py-12 md:py-16">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MEN_SUBCATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/men/${cat.slug}`}
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
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/men/shirts" className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
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

export default MenHome;
