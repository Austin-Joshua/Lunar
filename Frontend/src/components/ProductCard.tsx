import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-transparent"
    >
      {/* Visual Asset Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-card transition-all duration-700 shadow-soft group-hover:shadow-deep ring-1 ring-white/5 group-hover:ring-primary/20">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
        />
        
        {/* Interaction Interface Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-t from-card/80 via-card/40 to-transparent backdrop-blur-sm flex flex-col gap-4 z-10">
           <button 
             onClick={(e) => { e.preventDefault(); addToCart(product); }}
             className="w-full py-5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 rounded-2xl shadow-xl"
           >
             <Plus className="h-4 w-4" />
             ACQUIRE PIECE
           </button>
           <Link 
             to={`/shop/product/${product.id}`}
             className="w-full py-5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all duration-500 text-center rounded-2xl"
           >
             EXAMINE DETAILS
           </Link>
        </div>

        {/* Status Indicators */}
        <div className="absolute top-8 left-0 px-6 py-2 bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-[0.5em] leading-none shadow-2xl">
           {product.category || 'ARCHIVE'}
        </div>

        {/* Global Access Flag - Heart icon */}
        <button className="absolute top-8 right-8 p-3 rounded-full bg-black/20 backdrop-blur-3xl border border-white/5 opacity-0 group-hover:opacity-100 text-white hover:text-primary transition-all duration-500 translate-y-4 group-hover:translate-y-0">
           <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Editorial Metadata */}
      <div className="mt-10 space-y-4 px-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block leading-none mb-2">
              {product.brand || 'LUNAR EDIT'}
            </span>
            <Link to={`/shop/product/${product.id}`}>
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-foreground hover:text-primary transition-colors leading-none truncate max-w-[200px]">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="text-right">
             <span className="text-lg font-black italic tracking-tighter text-foreground whitespace-nowrap">
                {formatPrice(product.price)}
             </span>
             <p className="text-[8px] font-bold text-foreground/20 tracking-[0.3em] uppercase mt-1">VALUATION</p>
          </div>
        </div>
        
        {/* Architectural Progress Indicator */}
        <div className="w-8 h-1 bg-foreground/5 group-hover:w-full transition-all duration-1000 group-hover:bg-primary/40 rounded-full" />
      </div>
    </motion.div>
  );
};
