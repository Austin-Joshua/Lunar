import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { PLACEHOLDER_IMAGE } from '@/utils/constants';
import type { CartItem as CartItemType } from '@/types';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();
  const { product, quantity, size, color } = item;

  return (
    <div className="group flex flex-col sm:flex-row gap-10 py-10 border-b border-white/5 transition-all duration-700 hover:bg-white/[0.01] px-4 md:px-0">
      {/* Visual Asset Container */}
      <Link 
        to={`/product/${product.id}`} 
        className="relative flex-shrink-0 w-full sm:w-40 aspect-[3/4] overflow-hidden rounded-3xl bg-secondary"
      >
        <img
          src={product.image || PLACEHOLDER_IMAGE}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
      </Link>

      {/* Editorial Information */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-2">
        <div className="space-y-6">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
                {product.brand || 'LUNAR ARCHIVE'}
              </p>
              <Link to={`/product/${product.id}`}>
                <h4 className="text-2xl font-black italic uppercase tracking-tighter hover:text-primary transition-colors leading-none">
                  {product.name}
                </h4>
              </Link>
            </div>
            
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-muted-foreground hover:text-destructive transition-colors p-2"
              aria-label="Remove Piece"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
            {size && (
              <div className="flex items-center gap-2">
                <span className="opacity-40">DIMENSION:</span>
                <span className="text-foreground">{size}</span>
              </div>
            )}
            {color && (
              <div className="flex items-center gap-2">
                <span className="opacity-40">PALETTE:</span>
                <span className="text-foreground">{color}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quantity and Value Synchronization */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center border border-white/10 rounded-full px-4 py-2 bg-white/5">
            <button
              onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors hover:scale-110"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-sm font-black tracking-widest leading-none">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors hover:scale-110"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="text-right space-y-1">
             <div className="text-xl font-black tracking-tighter italic text-foreground">
                {formatPrice(product.price * quantity)}
             </div>
             {quantity > 1 && (
               <div className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase">
                  {formatPrice(product.price)} PER UNIT
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
