import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/CartItem';
import { EmptyState } from '@/components/EmptyState';
import { formatPrice } from '@/utils/constants';

const Cart: React.FC = () => {
  const { items, total, itemCount, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="lunar-container py-12">
        <EmptyState type="cart" />
      </div>
    );
  }

  const shipping = total >= 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  return (
    <div className="lunar-container py-8 md:py-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Shopping Cart</h1>
          <p className="text-muted-foreground">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-muted-foreground hover:text-destructive transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="lunar-card p-4 md:p-6">
            {items.map((item) => (
              <CartItem key={`${item.product.id}-${item.size}-${item.color}`} item={item} />
            ))}
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="lunar-card p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground bg-secondary p-2 rounded">
                  Add {formatPrice(100 - total)} more for free shipping!
                </p>
              )}
              
              <div className="pt-3 border-t">
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="px-4 py-2 border rounded-md font-medium text-sm hover:bg-accent transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full mt-6 py-3 lunar-btn-primary">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Proceed to Checkout
            </button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
