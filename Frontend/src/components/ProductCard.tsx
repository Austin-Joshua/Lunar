import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, PLACEHOLDER_IMAGE } from '@/utils/constants';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'kids';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default' }) => {
  const { addToCart, isInCart } = useCart();
  const isKids = variant === 'kids';
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group block",
        isKids ? "kids-card p-3" : "lunar-card overflow-hidden"
      )}
    >
      {/* Image Container */}
      <div className={cn(
        "relative aspect-[3/4] overflow-hidden",
        isKids ? "rounded-xl" : "rounded-t-lg"
      )}>
        <img
          src={product.image || PLACEHOLDER_IMAGE}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {product.originalPrice && (
          <span className={cn(
            "absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full",
            isKids 
              ? "bg-kids-coral text-white" 
              : "bg-destructive text-destructive-foreground"
          )}>
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-full shadow-lunar-md transition-colors",
              isKids 
                ? "bg-white hover:bg-kids-lavender" 
                : "bg-white hover:bg-accent"
            )}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToCart}
            disabled={inCart}
            className={cn(
              "w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium rounded-md transition-colors",
              inCart
                ? "bg-muted text-muted-foreground cursor-default"
                : isKids
                  ? "bg-kids-sky text-primary hover:bg-kids-mint"
                  : "bg-primary text-primary-foreground hover:bg-lunar-charcoal"
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            {inCart ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className={cn(
        "p-4",
        isKids && "text-center"
      )}>
        <p className={cn(
          "text-xs uppercase tracking-wider mb-1",
          isKids ? "text-kids-coral font-medium" : "text-muted-foreground"
        )}>
          {product.brand}
        </p>
        <h3 className={cn(
          "font-medium line-clamp-2 mb-2",
          isKids ? "text-base" : "text-sm"
        )}>
          {product.name}
        </h3>
        <div className={cn(
          "flex items-center gap-2",
          isKids && "justify-center"
        )}>
          <span className={cn(
            "font-semibold",
            isKids ? "text-lg text-kids-coral" : ""
          )}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
