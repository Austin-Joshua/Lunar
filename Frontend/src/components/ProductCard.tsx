import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Zap, Leaf, Truck, Star } from 'lucide-react';
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
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.originalPrice && (
            <span className={cn(
              "px-2 py-1 text-xs font-medium rounded-full",
              isKids 
                ? "bg-kids-coral text-white" 
                : "bg-destructive text-destructive-foreground"
            )}>
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
          {product.isNew && (
            <span className={cn(
              "px-2 py-1 text-xs font-medium rounded-full",
              isKids ? "bg-kids-mint text-white" : "bg-emerald-500 text-white"
            )}>
              New
            </span>
          )}
          {product.tags?.includes('bestseller') && (
            <span className={cn(
              "px-2 py-1 text-xs font-medium rounded-full",
              isKids ? "bg-kids-lavender text-white" : "bg-amber-500 text-white"
            )}>
              Bestseller
            </span>
          )}
          {product.stock && product.stock < 5 && product.stock > 0 && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-500 text-white">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-500 text-white">
              Out of Stock
            </span>
          )}
        </div>

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
        "p-4 space-y-3",
        isKids && "text-center"
      )}>
        {/* Brand */}
        <p className={cn(
          "text-xs uppercase tracking-wider",
          isKids ? "text-kids-coral font-medium" : "text-muted-foreground"
        )}>
          {product.brand}
        </p>

        {/* Title */}
        <h3 className={cn(
          "font-medium line-clamp-2",
          isKids ? "text-base" : "text-sm"
        )}>
          {product.name}
        </h3>

        {/* Rating if available */}
        {product.rating && (
          <div className={cn(
            "flex items-center gap-1 text-xs",
            isKids && "justify-center"
          )}>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            {product.reviewCount && (
              <span className="text-muted-foreground">({product.reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className={cn(
          "flex items-center gap-2",
          isKids && "justify-center"
        )}>
          <span className={cn(
            "font-bold text-lg",
            isKids ? "text-kids-coral" : "text-primary"
          )}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Features & Shipping */}
        <div className="flex flex-wrap gap-2">
          {product.shippingInfo?.freeShipping && (
            <div className="flex items-center gap-1 text-xs bg-accent rounded px-2 py-1">
              <Truck className="h-3 w-3" />
              <span>Free Shipping</span>
            </div>
          )}
          {product.tags?.includes('sustainable') && (
            <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 rounded px-2 py-1">
              <Leaf className="h-3 w-3" />
              <span>Eco-Friendly</span>
            </div>
          )}
          {product.shippingInfo?.cod && (
            <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 rounded px-2 py-1">
              <span>COD Available</span>
            </div>
          )}
        </div>

        {/* Color/Size Options */}
        {(product.colors || product.sizes) && (
          <div className="text-xs text-muted-foreground pt-1">
            {product.colors && <p>{product.colors.length} Colors</p>}
            {product.sizes && <p>{product.sizes.length} Sizes</p>}
          </div>
        )}
      </div>
    </Link>
  );
};
