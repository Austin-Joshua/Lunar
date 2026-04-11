import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  CreditCard, 
  Truck, 
  MapPin, 
  ChevronRight,
  Lock,
  Smartphone,
  QrCode,
  Info
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { ordersApi } from '@/services/api';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

type PaymentMethod = 'card' | 'upi';

const Checkout: React.FC = () => {
  const { items, total, itemCount, clearCart } = useCart();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: ''
  });

  const shipping = total >= 5000 ? 0 : 500;
  const tax = total * 0.12;
  const orderTotal = total + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate Payment Delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const orderData = {
        items,
        total: orderTotal,
        shippingAddress: {
          fullName: user?.name || 'Valued Client',
          ...formData
        }
      };

      await ordersApi.create(orderData);
      setIsSuccess(true);
      clearCart();
      
      // Auto redirect to orders after 6 seconds
      setTimeout(() => navigate('/shop/orders'), 6000);
    } catch (error) {
      console.error("Acquisition failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <PageTransition>
        <div className="lunar-container flex min-h-[100dvh] flex-col items-center justify-center space-y-10 px-safe pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-safe text-center sm:space-y-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center p-4 relative"
          >
             <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
             <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <CheckCircle2 className="h-16 w-16" />
             </div>
          </motion.div>
          <div className="text-center space-y-6 max-w-2xl">
             <h1 className="text-5xl font-black uppercase italic tracking-tighter text-foreground md:text-7xl">Acquisition <br />Confirmed<span className="text-primary not-italic">.</span></h1>
             <p className="text-muted-foreground font-medium uppercase tracking-[0.4em] text-[10px] leading-loose">
                Your selection has been securely archived and moved to our atelier for global transit. You will receive a bespoke notification shortly.
             </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center sm:gap-6">
             <Link to="/shop/orders" className="btn-luxury min-h-11 flex items-center justify-center px-10 py-4 sm:px-12 sm:py-5">VIEW ARCHIVE</Link>
             <Link to="/shop" className="flex min-h-11 items-center justify-center gap-2 p-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary">CONTINUE SHOPPING <ArrowLeft className="h-4 w-4" /></Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="relative min-h-[100dvh] bg-background pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] sm:pt-28 md:pb-32 md:pt-32 lg:pb-40">
        <div className="absolute right-4 top-[calc(env(safe-area-inset-top,0px)+1rem)] z-50 sm:right-6 sm:top-10 md:right-10">
           <ThemeToggle />
        </div>

        <div className="lunar-container">
          <div className="mb-12 space-y-4 sm:mb-16 md:mb-20">
             <div className="flex items-center gap-4">
                <Link to="/shop/cart" className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border transition-all hover:bg-foreground hover:text-background dark:border-white/10 sm:h-12 sm:w-12">
                   <ArrowLeft className="h-4 w-4" />
                </Link>
                <span className="luxury-subheading">SECURE ACQUISITION</span>
             </div>
             <h1 className="text-4xl font-black uppercase italic tracking-tighter text-foreground sm:text-5xl md:text-7xl">The Final <br />Protocol<span className="text-primary not-italic">.</span></h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
             
             {/* LEFT: Shipping & Payment (Stripe Style) */}
             <div className="space-y-10 sm:space-y-12 lg:col-span-7">
                
                {/* 1. SHIPPING INFO */}
                <div className="lunar-glass-panel space-y-6 p-5 sm:space-y-8 sm:p-8 md:p-12">
                   <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                         <MapPin className="h-5 w-5" />
                      </div>
                      <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground">I. TRANSIT COORDINATES</h2>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Bespoke Atelier Address</label>
                        <input required name="street" value={formData.street} onChange={handleInputChange} className="lunar-field-underline" placeholder="E.G. 12 ARCHITECTURAL PLAZA" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Metropolis</label>
                        <input required name="city" value={formData.city} onChange={handleInputChange} className="lunar-field-underline" placeholder="CITY" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Country Protocol</label>
                        <input required name="country" value={formData.country} onChange={handleInputChange} className="lunar-field-underline" placeholder="INDIA" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Archive Zip Code</label>
                        <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="lunar-field-underline" placeholder="PIN CODE" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Comm Profile (Phone)</label>
                        <input required name="phone" value={formData.phone} onChange={handleInputChange} className="lunar-field-underline" placeholder="+91 XXXX XXX XXX" />
                      </div>
                   </div>
                </div>

                {/* 2. PAYMENT METHOD SELECTION */}
                <div className="lunar-glass-panel space-y-6 p-5 sm:space-y-8 sm:p-8 md:p-12">
                   <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <ShieldCheck className="h-5 w-5" />
                         </div>
                         <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground">II. PAYMENT PROTOCOL</h2>
                      </div>
                      <div className="flex items-center gap-2 text-[8px] font-black tracking-widest text-emerald-500/60 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/20">
                         <Lock className="h-3 w-3" /> SSL ENCRYPTED
                      </div>
                   </div>

                   {/* METHOD TOGGLE (STRIPE STYLE) */}
                   <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-background/50 p-2 dark:border-white/10">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={cn(
                          "flex items-center justify-center gap-3 rounded-xl py-4 text-[10px] font-black tracking-[0.2em] transition-all",
                          paymentMethod === 'card' ? "scale-[1.02] border border-border bg-muted/60 text-primary shadow-lg dark:border-white/10 dark:bg-white/5" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                         <CreditCard className="h-4 w-4" /> CREDIT/DEBIT
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={cn(
                          "flex items-center justify-center gap-3 rounded-xl py-4 text-[10px] font-black tracking-[0.2em] transition-all",
                          paymentMethod === 'upi' ? "scale-[1.02] border border-border bg-muted/60 text-primary shadow-lg dark:border-white/10 dark:bg-white/5" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                         <Smartphone className="h-4 w-4" /> UPI GATEWAY
                      </button>
                   </div>

                   <AnimatePresence mode="wait">
                      {paymentMethod === 'card' ? (
                        <motion.div 
                          key="card"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-6 pt-4"
                        >
                           <div className="space-y-3">
                              <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Card Details (Simulated)</label>
                              <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted/30 p-5 dark:border-white/10 dark:bg-background/30">
                                 <CreditCard className="h-5 w-5 text-muted-foreground" />
                                 <input disabled className="w-full bg-transparent font-mono text-sm tracking-widest text-foreground/80 focus:outline-none" placeholder="4242 4242 4242 4242" />
                                 <div className="flex gap-4">
                                    <span className="font-mono text-[10px] text-muted-foreground">MM/YY</span>
                                    <span className="font-mono text-[10px] text-muted-foreground">CVC</span>
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                              <Info className="h-3 w-3" /> Transaction will be processed via LUNAR Secure v2.6
                           </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="upi"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-8 flex flex-col items-center py-6"
                        >
                           <div className="space-y-2 text-center">
                              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">SCAN TO ARCHIVE</h3>
                              <p className="text-[9px] font-bold uppercase text-muted-foreground">Scan with any UPI app to confirm acquisition</p>
                           </div>
                           
                           {/* UPI QR SIMULATION */}
                           <div className="group relative">
                              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl transition-all duration-700 group-hover:bg-primary/20" />
                              <div className="relative h-56 w-56 overflow-hidden rounded-[2.5rem] border-4 border-border bg-card p-4 shadow-2xl dark:border-white/15">
                                 <img
                                   src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi%3A%2F%2Fpay%3Fpa%3Dpay%40lunar%26pn%3DLUNAR%26cu%3DINR"
                                   className="h-full w-full object-contain"
                                   alt="UPI QR code"
                                 />
                                 <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                              </div>
                              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-foreground px-4 py-2 text-[8px] font-black uppercase tracking-widest text-background shadow-xl dark:border-white/10">
                                 <QrCode className="h-3 w-3" /> LUNAR SECURE UPI
                              </div>
                           </div>

                           <div className="w-full space-y-3 pt-4">
                              <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest text-center block">Or enter UPI ID</label>
                              <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted/30 p-5 dark:border-white/10 dark:bg-background/30">
                                 <Smartphone className="h-5 w-5 text-muted-foreground" />
                                 <input className="w-full bg-transparent text-sm font-bold uppercase tracking-widest text-foreground placeholder:text-muted-foreground/40 focus:outline-none" placeholder="username@lunar" />
                              </div>
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             </div>

             {/* RIGHT: Investment Summary (Stripe Style) */}
             <div className="lg:col-span-5">
                <div className="lunar-glass-panel sticky top-24 space-y-8 p-6 sm:top-28 sm:space-y-10 sm:p-8 md:top-32 md:space-y-12 md:p-10 lg:p-14">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">INVESTMENT SUMMARY</p>
                      <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">The Collection</h2>
                   </div>
                   
                   <div className="space-y-8 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                      {items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center gap-6 group">
                           <div className="flex items-center gap-6">
                              <div className="h-20 w-16 overflow-hidden rounded-xl border border-border bg-muted/30 transition-all group-hover:border-primary/30 dark:border-white/10">
                                 <img src={item.product.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.product.name} />
                              </div>
                              <div className="space-y-1">
                                 <p className="max-w-[140px] truncate text-[10px] font-black uppercase tracking-widest text-foreground">{item.product.name}</p>
                                 <p className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase">UNIT x{item.quantity} · {item.size || 'OS'}</p>
                              </div>
                           </div>
                           <span className="text-[10px] font-black tracking-widest text-foreground/90">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      ))}
                   </div>

                   <div className="space-y-6 border-t border-border pt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground dark:border-white/10">
                      <div className="flex justify-between">
                         <span>Subtotal</span>
                         <span className="text-foreground/90">{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between">
                         <span>Global Transit (Insured)</span>
                         <span className="text-foreground/90">{shipping === 0 ? 'COMPLIMENTARY' : formatPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between">
                         <span>Governance Tax (12%)</span>
                         <span className="text-foreground/90">{formatPrice(tax)}</span>
                      </div>
                      <div className="flex items-end justify-between border-t border-border pt-8 dark:border-white/10">
                         <span className="text-xs font-black leading-none text-muted-foreground">TOTAL INVESTMENT</span>
                         <span className="text-4xl font-black italic tracking-tighter text-primary leading-none">{formatPrice(orderTotal)}</span>
                      </div>
                   </div>

                   <button 
                      disabled={isSubmitting}
                      type="submit"
                      className="btn-luxury group relative flex min-h-[3.25rem] w-full items-center justify-center gap-3 overflow-hidden py-6 text-xs disabled:opacity-50 sm:min-h-[3.5rem] sm:py-8"
                   >
                      <AnimatePresence mode="wait">
                         {isSubmitting ? (
                           <motion.div 
                             key="loader"
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             className="flex items-center gap-4"
                           >
                              AUTHENTICATING PROTOCOL <Loader2 className="h-5 w-5 animate-spin" />
                           </motion.div>
                         ) : (
                           <motion.div 
                             key="idle"
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             className="flex items-center gap-4"
                           >
                              {paymentMethod === 'upi' ? 'COMPLETE WITH UPI' : 'CONFIRM ACQUISITION'} 
                              <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                           </motion.div>
                         )}
                      </AnimatePresence>
                   </button>

                   <div className="flex flex-col items-center gap-4 opacity-30 group">
                      <div className="flex items-center gap-4 pt-2">
                         <div className="h-0.5 w-10 bg-border dark:bg-white/20" />
                         <span className="text-[8px] font-black uppercase tracking-[0.5em] text-muted-foreground transition-colors group-hover:text-primary">POWERED BY LUNAR SECURE</span>
                         <div className="h-0.5 w-10 bg-border dark:bg-white/20" />
                      </div>
                   </div>
                </div>
             </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
