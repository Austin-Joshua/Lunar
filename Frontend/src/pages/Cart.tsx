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
        <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-10 lunar-container">
          <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center">
             <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-20" />
          </div>
          <div className="text-center space-y-4">
             <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Your Archive is Empty</h1>
             <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Discover our latest editorial collections to begin your journey.</p>
          </div>
          <Link to="/" className="btn-luxury px-12 py-5">
             START EXPLORING
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
      <div className="bg-background min-h-screen pt-32 pb-40 selection:bg-primary/20">
        <div className="lunar-container">
          
          {/* CART HEADER */}
          <div className="mb-20 flex flex-col items-end justify-between gap-8 border-b border-border pb-10 dark:border-white/10 md:flex-row">
            <div className="space-y-4">
              <span className="luxury-subheading">SELECTION REVIEW</span>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Shopping <br />Archive<span className="text-primary not-italic">.</span>
              </h1>
            </div>
            <div className="flex items-center gap-8">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{itemCount} PIECES COLLECTED</span>
               <button 
                onClick={clearCart}
                className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-destructive hover:opacity-70 transition-opacity"
               >
                 <Trash2 className="h-4 w-4" /> PURGE ARCHIVE
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* LEFT: CART ITEMS */}
            <div className="lg:col-span-8 space-y-12">
               <div className="space-y-8">
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

               <Link to="/" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-colors mt-12">
                  <ArrowLeft className="h-4 w-4" /> RETURN TO COLLECTIONS
               </Link>
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="lg:col-span-4">
               <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-32 space-y-10"
               >
                  <div className="space-y-10 rounded-[2.5rem] border border-border bg-secondary/20 p-10 dark:border-white/10">
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
                        onClick={() => navigate('/shop/checkout')}
                        className="btn-luxury w-full py-8 flex items-center justify-center gap-4 text-sm shadow-2xl"
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
                  <div className="px-10 space-y-4">
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
