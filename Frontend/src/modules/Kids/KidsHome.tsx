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
    price: 599,
    description: 'Colorful graphic t-shirt',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=500&fit=crop',
    gender: 'kids',
    category: 'boys',
    subcategory: 'boys',
    stock: 120,
    inStock: true,
    isNew: true,
    rating: 4.5,
    reviewCount: 87,
    features: ['100% Organic Cotton', 'Soft print', 'Easy care'],
    tags: ['bestseller'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
  {
    id: 'kids-2',
    name: 'Rainbow Dress',
    brand: 'LUNAR Kids',
    price: 1299,
    originalPrice: 1799,
    description: 'Playful rainbow dress',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop',
    gender: 'kids',
    category: 'girls',
    subcategory: 'girls',
    stock: 95,
    inStock: true,
    isSale: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 134,
    features: ['Vibrant colors', 'Comfortable fit', 'Play-ready'],
    tags: ['bestseller'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
  {
    id: 'kids-3',
    name: 'Light-Up Sneakers',
    brand: 'LUNAR Kids Sport',
    price: 1499,
    originalPrice: 1999,
    description: 'Fun light-up sneakers',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop',
    gender: 'kids',
    category: 'footwear',
    subcategory: 'footwear',
    stock: 78,
    inStock: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 156,
    features: ['LED lights', 'Durable sole', 'Comfortable padding'],
    tags: ['bestseller', 'trending'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
  },
  {
    id: 'kids-4',
    name: 'Animal Print Backpack',
    brand: 'LUNAR Kids',
    price: 999,
    description: 'Cute animal backpack',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=500&fit=crop',
    gender: 'kids',
    category: 'accessories',
    subcategory: 'accessories',
    stock: 150,
    inStock: true,
    rating: 4.6,
    reviewCount: 98,
    features: ['Spacious design', 'Padded straps', 'Fun prints'],
    tags: ['bestseller'],
    shippingInfo: { freeShipping: true, estimatedDays: 2, cod: true }
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
      <section className="lunar-container py-16 md:py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-kids-coral mb-3">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl">Everything for your little ones - from casual wear to special occasions</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {KIDS_SUBCATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop/kids/${cat.slug}`}
              className="group kids-card p-8 text-center hover:scale-105 transition-transform"
            >
              <span className="text-6xl mb-4 block group-hover:scale-125 transition-transform">{cat.icon}</span>
              <p className="font-semibold text-xl text-kids-coral">{cat.name}</p>
              <p className="text-xs text-muted-foreground mt-2">Shop Now</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="lunar-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-kids-coral mb-2">Best Sellers</h2>
              <p className="text-muted-foreground">Kids and parents love these picks!</p>
            </div>
            <Link 
              to="/shop/kids/boys" 
              className="text-sm font-semibold text-kids-coral flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
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

      {/* Promotional Banner */}
      <section className="lunar-container py-12">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-kids-coral via-kids-lavender to-kids-sky p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.3) 10px, rgba(255,255,255,.3) 20px)'}} className="absolute inset-0" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🎉 Free Shipping on Orders Over ₹5000!
            </h3>
            <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
              Make playtime even more special with our comfortable, durable, and fun styles for every age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop/kids/boys"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-kids-coral font-semibold rounded-full hover:shadow-lg transition-all hover:scale-105"
              >
                Shop Boys
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop/kids/girls"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-kids-coral font-semibold rounded-full hover:shadow-lg transition-all hover:scale-105"
              >
                Shop Girls
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KidsHome;
