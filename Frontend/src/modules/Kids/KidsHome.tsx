import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { KIDS_SUBCATEGORIES } from '@/utils/constants';
import type { Product } from '@/types';

const featuredProducts: Product[] = [
  {
    id: 'kids-1',
    name: 'Fun Graphic Tee',
    brand: 'LUNAR Kids',
    price: 35.00,
    description: 'Colorful graphic t-shirt',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=500&fit=crop',
    gender: 'kids',
    category: 'boys',
    subcategory: 'boys',
    inStock: true,
  },
  {
    id: 'kids-2',
    name: 'Rainbow Dress',
    brand: 'LUNAR Kids',
    price: 55.00,
    originalPrice: 70.00,
    description: 'Playful rainbow dress',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop',
    gender: 'kids',
    category: 'girls',
    subcategory: 'girls',
    inStock: true,
  },
  {
    id: 'kids-3',
    name: 'Light-Up Sneakers',
    brand: 'LUNAR Kids Sport',
    price: 65.00,
    description: 'Fun light-up sneakers',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop',
    gender: 'kids',
    category: 'footwear',
    subcategory: 'footwear',
    inStock: true,
  },
  {
    id: 'kids-4',
    name: 'Animal Print Backpack',
    brand: 'LUNAR Kids',
    price: 45.00,
    description: 'Cute animal backpack',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=500&fit=crop',
    gender: 'kids',
    category: 'accessories',
    subcategory: 'accessories',
    inStock: true,
  },
];

const KidsHome: React.FC = () => {
  return (
    <div className="animate-fade-in bg-gradient-to-b from-kids-sky/10 to-transparent">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1920&h=800&fit=crop"
            alt="Kids Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-kids-lavender/90 via-kids-sky/70 to-kids-mint/50" />
        </div>
        <div className="lunar-container relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-white" />
            <span className="text-white/90 text-sm uppercase tracking-widest">
              Kids Collection
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Fun, Colorful
            <br />& Comfy!
          </h1>
          <p className="text-white/90 max-w-md text-lg">
            Let them play, explore, and dream in style! ✨
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="lunar-container py-12 md:py-16">
        <h2 className="text-2xl font-bold mb-6 text-kids-coral">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {KIDS_SUBCATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/kids/${cat.slug}`}
              className="kids-card p-6 text-center hover:scale-105 transition-transform"
            >
              <span className="text-4xl mb-3 block">{cat.icon}</span>
              <p className="font-semibold text-lg">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-12 md:py-16">
        <div className="lunar-container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-kids-coral">Best Sellers</h2>
            <Link 
              to="/kids/boys" 
              className="text-sm font-medium text-kids-coral flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="kids" />
            ))}
          </div>
        </div>
      </section>

      {/* Fun Banner */}
      <section className="lunar-container py-8 mb-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-kids-coral via-kids-lavender to-kids-sky p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🎉 Free Shipping on Orders Over $50!
          </h3>
          <p className="text-white/90 mb-6">
            Make playtime even more special with our comfortable, durable styles.
          </p>
          <Link
            to="/kids/boys"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-kids-coral font-semibold rounded-full hover:scale-105 transition-transform"
          >
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default KidsHome;
