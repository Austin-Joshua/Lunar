import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, Grid, LayoutGrid, ArrowLeft } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Loader';
import { EmptyState } from '@/components/EmptyState';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductListProps {
  gender: 'men' | 'women' | 'kids';
  subcategory?: string;
}

// Mock products
const generateMockProducts = (gender: string, subcategory?: string): Product[] => {
  const images: Record<string, string[]> = {
    men: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    ],
    women: [
      'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop',
    ],
    kids: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=500&fit=crop',
    ],
  };

  const brands = ['LUNAR Essentials', 'LUNAR Collection', 'LUNAR Luxe', 'LUNAR Sport'];
  const genderImages = images[gender] || images.men;

  return Array.from({ length: 8 }, (_, i) => ({
    id: `${gender}-${subcategory || 'all'}-${i + 1}`,
    name: `${subcategory?.charAt(0).toUpperCase()}${subcategory?.slice(1) || 'Product'} Item ${i + 1}`,
    brand: brands[i % brands.length],
    price: 50 + Math.floor(Math.random() * 150),
    originalPrice: Math.random() > 0.5 ? 80 + Math.floor(Math.random() * 150) : undefined,
    description: 'Premium quality item',
    image: genderImages[i % genderImages.length],
    gender: gender as 'men' | 'women' | 'kids',
    category: subcategory || 'all',
    subcategory: subcategory || 'all',
    inStock: true,
  }));
};

const ProductList: React.FC<ProductListProps> = ({ gender, subcategory }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  const products = generateMockProducts(gender, subcategory);
  const isKids = gender === 'kids';
  const title = subcategory 
    ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
    : gender.charAt(0).toUpperCase() + gender.slice(1);

  return (
    <div className={cn(
      "lunar-container py-8 animate-fade-in",
      isKids && "bg-gradient-to-b from-kids-sky/5 to-transparent"
    )}>
      {/* Breadcrumb */}
      {subcategory && (
        <Link
          to={`/${gender}`}
          className={cn(
            "inline-flex items-center gap-2 text-sm mb-6 transition-colors",
            isKids 
              ? "text-kids-coral hover:text-kids-coral/80"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </Link>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className={cn(
            "text-3xl font-bold mb-1",
            isKids && "text-kids-coral"
          )}>
            {title}
          </h1>
          <p className="text-muted-foreground">{products.length} products</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Grid Toggle - Desktop */}
          <div className="hidden md:flex items-center border rounded-md">
            <button
              onClick={() => setGridCols(2)}
              className={cn(
                "p-2 transition-colors",
                gridCols === 2 ? "bg-accent" : "hover:bg-accent"
              )}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={cn(
                "p-2 transition-colors",
                gridCols === 3 ? "bg-accent" : "hover:bg-accent"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
          </div>

          {/* Filter */}
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className={cn(
          "grid gap-4 md:gap-6",
          gridCols === 2 ? "grid-cols-2" : gridCols === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"
        )}>
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} variant={isKids ? 'kids' : 'default'} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState type="products" variant={isKids ? 'kids' : 'default'} />
      ) : (
        <div className={cn(
          "grid gap-4 md:gap-6",
          gridCols === 2 ? "grid-cols-2" : gridCols === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"
        )}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              variant={isKids ? 'kids' : 'default'} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
