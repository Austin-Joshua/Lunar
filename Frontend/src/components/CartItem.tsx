import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, PLACEHOLDER_IMAGE } from '@/utils/constants';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, size, color } = item;

  return (
    <div className="flex gap-4 py-4 border-b border-border animate-fade-in">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        <img
          src={product.image || PLACEHOLDER_IMAGE}
          alt={product.name}
          className="w-24 h-32 object-cover rounded-md"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </p>
            <Link to={`/product/${product.id}`}>
              <h4 className="font-medium line-clamp-2 hover:underline">
                {product.name}
              </h4>
            </Link>
            {(size || color) && (
              <p className="text-sm text-muted-foreground mt-1">
                {size && <span>Size: {size}</span>}
                {size && color && <span className="mx-2">•</span>}
                {color && <span>Color: {color}</span>}
              </p>
            )}
          </div>
          
          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(product.id)}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quantity & Price */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-10 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-semibold">{formatPrice(product.price * quantity)}</p>
            {quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                {formatPrice(product.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
