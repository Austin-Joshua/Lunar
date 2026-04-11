import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { CartItem } from '@/components/CartItem';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const { items, total, itemCount, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="lunar-container flex min-h-[100dvh] flex-col items-center justify-center space-y-8 px-safe pb-12 pt-safe text-center sm:space-y-10 sm:pb-16">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary/50">
             <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-20" />
          </div>
          <div className="max-w-md space-y-3 sm:space-y-4">
             <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground sm:text-4xl md:text-6xl">Your archive is empty</h1>
             <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Browse collections and add pieces to continue.</p>
          </div>
          <Link to="/shop" className="btn-luxury min-h-11 px-10 py-4 sm:px-12 sm:py-5">
             Explore the shop
          </Link>
        </div>
      </PageTransition>
    );
  }

  const shipping = total >= 5000 ? 0 : 500;
  const tax = total * 0.12; // 12% Luxury Tax
  const orderTotal = total + shipping + tax;

  return (
    <PageTransition>
      <div className="min-h-[100dvh] bg-background pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] selection:bg-primary/20 sm:pt-28 md:pb-32 md:pt-32 lg:pb-40">
        <div className="lunar-container">
          
          {/* CART HEADER */}
          <div className="mb-10 flex flex-col items-stretch justify-between gap-6 border-b border-border pb-8 dark:border-white/10 sm:mb-14 sm:items-end sm:gap-8 md:mb-16 md:flex-row md:pb-10">
            <div className="space-y-3 sm:space-y-4">
              <span className="luxury-subheading">SELECTION REVIEW</span>
              <h1 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-foreground sm:text-5xl md:text-7xl">
                Shopping <br />Archive<span className="text-primary not-italic">.</span>
              </h1>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end sm:gap-8">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{itemCount} PIECES COLLECTED</span>
               <button 
                type="button"
                onClick={clearCart}
                className="flex min-h-11 items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-destructive transition-opacity hover:opacity-70"
               >
                 <Trash2 className="h-4 w-4" /> PURGE ARCHIVE
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            
            {/* LEFT: CART ITEMS */}
            <div className="space-y-8 lg:col-span-8 sm:space-y-10 lg:space-y-12">
               <div className="space-y-6 sm:space-y-8">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, idx) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <CartItem item={item} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>

               <Link to="/shop" className="mt-8 inline-flex min-h-11 items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground transition-colors hover:text-primary sm:mt-12">
                  <ArrowLeft className="h-4 w-4" /> RETURN TO COLLECTIONS
               </Link>
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="lg:col-span-4">
               <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 space-y-8 sm:top-28 md:top-32 md:space-y-10 lg:top-32"
               >
                  <div className="space-y-8 rounded-3xl border border-border bg-secondary/20 p-6 dark:border-white/10 sm:space-y-10 sm:rounded-[2.5rem] sm:p-8 md:p-10">
                     <h2 className="text-xl font-black italic uppercase tracking-tighter">Investment Summary</h2>
                     
                     <div className="space-y-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        <div className="flex justify-between items-center">
                           <span>Collection Value</span>
                           <span className="text-foreground">{formatPrice(total)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span>White-Glove Shipping</span>
                           <span className="text-foreground">{shipping === 0 ? 'COMPLIMENTARY' : formatPrice(shipping)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span>Estimated Duties (12%)</span>
                           <span className="text-foreground">{formatPrice(tax)}</span>
                        </div>
                        
                        <div className="mt-6 border-t border-border pt-6 dark:border-white/10">
                           <div className="flex justify-between items-end">
                              <span className="text-xs font-black">Total Investment</span>
                              <span className="text-2xl font-black text-primary tracking-tighter">{formatPrice(orderTotal)}</span>
                           </div>
                        </div>
                     </div>

                     <button 
                        type="button"
                        onClick={() => navigate('/shop/checkout')}
                        className="btn-luxury flex min-h-[3.25rem] w-full items-center justify-center gap-3 py-6 text-sm shadow-2xl sm:min-h-[3.5rem] sm:py-8"
                     >
                        PROCEED TO CHECKOUT <ArrowRight className="h-5 w-5" />
                     </button>

                     <div className="flex flex-col gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                        <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> SECURED BY LUNAR ENCRYPTION</div>
                        <div className="flex items-center gap-3"><Truck className="h-4 w-4 text-primary" /> INSURED GLOBAL LOGISTICS</div>
                        <div className="flex items-center gap-3"><RefreshCcw className="h-4 w-4 text-primary" /> 14-DAY BESPOKE RETURNS</div>
                     </div>
                  </div>

                  {/* PROMO FIELD */}
                  <div className="space-y-4 px-0 sm:px-6 md:px-10">
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">DISCOUNT ARCHIVE CODE</span>
                     <div className="relative">
                        <input 
                          type="text" 
                          placeholder="ENTER CODE" 
                          className="lunar-field-underline py-4 text-xs font-black uppercase tracking-widest"
                        />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary font-black text-[9px] tracking-widest hover:opacity-70 transition-opacity">APPLY</button>
                     </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
