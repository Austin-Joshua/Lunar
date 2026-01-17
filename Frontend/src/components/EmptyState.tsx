import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  type: 'cart' | 'orders' | 'products';
  title?: string;
  description?: string;
  variant?: 'default' | 'kids';
}

const icons = {
  cart: ShoppingBag,
  orders: Package,
  products: Search,
};

const defaults = {
  cart: {
    title: 'Your cart is empty',
    description: 'Looks like you haven\'t added anything yet. Start exploring!',
  },
  orders: {
    title: 'No orders yet',
    description: 'When you place an order, it will appear here.',
  },
  products: {
    title: 'No products found',
    description: 'Try adjusting your search or filters.',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  variant = 'default',
}) => {
  const Icon = icons[type];
  const isKids = variant === 'kids';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center mb-6",
        isKids ? "bg-kids-sky/20" : "bg-muted"
      )}>
        <Icon className={cn(
          "w-10 h-10",
          isKids ? "text-kids-coral" : "text-muted-foreground"
        )} />
      </div>
      
      <h3 className={cn(
        "text-xl font-semibold mb-2",
        isKids && "text-kids-coral"
      )}>
        {title || defaults[type].title}
      </h3>
      
      <p className="text-muted-foreground max-w-sm mb-6">
        {description || defaults[type].description}
      </p>

      <Link
        to="/"
        className={cn(
          "inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors",
          isKids 
            ? "bg-kids-coral text-white hover:bg-kids-coral/90"
            : "lunar-btn-primary"
        )}
      >
        Continue Shopping
      </Link>
    </div>
  );
};
