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
        <div className="min-h-[90vh] flex flex-col items-center justify-center space-y-12 lunar-container">
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
             <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">Acquisition <br />Confirmed<span className="text-primary not-italic">.</span></h1>
             <p className="text-muted-foreground font-medium uppercase tracking-[0.4em] text-[10px] leading-loose">
                Your selection has been securely archived and moved to our atelier for global transit. You will receive a bespoke notification shortly.
             </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
             <Link to="/shop/orders" className="btn-luxury px-12 py-5">VIEW ARCHIVE</Link>
             <Link to="/" className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:text-primary transition-all p-5">CONTINUE EXPLORING <ArrowLeft className="h-4 w-4" /></Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="bg-background min-h-screen pt-32 pb-40 relative">
        <div className="absolute top-10 right-10 z-50">
           <ThemeToggle />
        </div>

        <div className="lunar-container">
          <div className="mb-20 space-y-4">
             <div className="flex items-center gap-4">
                <Link to="/shop/cart" className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-foreground hover:text-background transition-all">
                   <ArrowLeft className="h-4 w-4" />
                </Link>
                <span className="luxury-subheading">SECURE ACQUISITION</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">The Final <br />Protocol<span className="text-primary not-italic">.</span></h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
             
             {/* LEFT: Shipping & Payment (Stripe Style) */}
             <div className="lg:col-span-7 space-y-12">
                
                {/* 1. SHIPPING INFO */}
                <div className="space-y-8 bg-foreground/5 p-8 md:p-12 rounded-[2.5rem] border border-white/5">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                         <MapPin className="h-5 w-5" />
                      </div>
                      <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">I. TRANSIT COORDINATES</h2>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                      <div className="md:col-span-2 space-y-3">
                        <label className="text-[9px] font-black text-muted-foreground tracking-[0.2em] uppercase">Bespoke Atelier Address</label>
                        <input required name="street" value={formData.street} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-all placeholder:text-white/5" placeholder="E.G. 12 ARCHITECTURAL PLAZA" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-muted-foreground tracking-[0.2em] uppercase">Metropolis</label>
                        <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-all placeholder:text-white/5" placeholder="CITY" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-muted-foreground tracking-[0.2em] uppercase">Country Protocol</label>
                        <input required name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-all placeholder:text-white/5" placeholder="INDIA" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-muted-foreground tracking-[0.2em] uppercase">Archive Zip Code</label>
                        <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-all placeholder:text-white/5" placeholder="PIN CODE" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-muted-foreground tracking-[0.2em] uppercase">Comm Profile (Phone)</label>
                        <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-all placeholder:text-white/5" placeholder="+91 XXXX XXX XXX" />
                      </div>
                   </div>
                </div>

                {/* 2. PAYMENT METHOD SELECTION */}
                <div className="space-y-8 bg-foreground/5 p-8 md:p-12 rounded-[2.5rem] border border-white/5">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <ShieldCheck className="h-5 w-5" />
                         </div>
                         <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">II. PAYMENT PROTOCOL</h2>
                      </div>
                      <div className="flex items-center gap-2 text-[8px] font-black tracking-widest text-emerald-500/60 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/20">
                         <Lock className="h-3 w-3" /> SSL ENCRYPTED
                      </div>
                   </div>

                   {/* METHOD TOGGLE (STRIPE STYLE) */}
                   <div className="grid grid-cols-2 gap-4 p-2 bg-background/50 rounded-2xl border border-white/5">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={cn(
                          "flex items-center justify-center gap-3 py-4 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all",
                          paymentMethod === 'card' ? "bg-white/5 text-primary shadow-xl scale-[1.02] border border-white/5" : "text-white/30 hover:text-white/60"
                        )}
                      >
                         <CreditCard className="h-4 w-4" /> CREDIT/DEBIT
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={cn(
                          "flex items-center justify-center gap-3 py-4 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all",
                          paymentMethod === 'upi' ? "bg-white/5 text-primary shadow-xl scale-[1.02] border border-white/5" : "text-white/30 hover:text-white/60"
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
                              <div className="flex items-center gap-4 bg-background/30 border border-white/10 p-5 rounded-2xl">
                                 <CreditCard className="h-5 w-5 text-white/20" />
                                 <input disabled className="bg-transparent text-sm font-mono tracking-widest text-white/40 focus:outline-none w-full" placeholder="4242 4242 4242 4242" />
                                 <div className="flex gap-4">
                                    <span className="text-[10px] font-mono text-white/20">MM/YY</span>
                                    <span className="text-[10px] font-mono text-white/20">CVC</span>
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 text-[8px] font-bold text-white/20 tracking-widest uppercase">
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
                           <div className="text-center space-y-2">
                              <h3 className="text-[10px] font-black text-white tracking-[0.3em] uppercase">SCAN TO ARCHIVE</h3>
                              <p className="text-[9px] font-bold text-white/20 uppercase">Scan with any UPI app to confirm acquisition</p>
                           </div>
                           
                           {/* UPI QR SIMULATION */}
                           <div className="relative group">
                              <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
                              <div className="relative w-56 h-56 bg-white rounded-[2.5rem] p-6 shadow-2xl overflow-hidden border-4 border-white">
                                 <img 
                                   src="/C:\Users\austi\.gemini\antigravity\brain\20f88f05-327e-4352-969e-1299d04dde5a\lunar_upi_qr_mockup_1775058758083.png" 
                                   className="w-full h-full object-contain" 
                                   alt="UPI QR Code" 
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                              </div>
                              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-full text-[8px] font-black tracking-widest border border-white/10 shadow-xl flex items-center gap-2">
                                 <QrCode className="h-3 w-3" /> LUNAR SECURE UPI
                              </div>
                           </div>

                           <div className="w-full space-y-3 pt-4">
                              <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest text-center block">Or enter UPI ID</label>
                              <div className="flex items-center gap-4 bg-background/30 border border-white/10 p-5 rounded-2xl">
                                 <Smartphone className="h-5 w-5 text-white/20" />
                                 <input className="bg-transparent text-sm font-bold tracking-widest text-white focus:outline-none w-full uppercase placeholder:text-white/5" placeholder="username@lunar" />
                              </div>
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             </div>

             {/* RIGHT: Investment Summary (Stripe Style) */}
             <div className="lg:col-span-5">
                <div className="sticky top-32 space-y-12 bg-foreground/5 p-10 md:p-14 rounded-[3.5rem] border border-white/5">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">INVESTMENT SUMMARY</p>
                      <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">The Collection</h2>
                   </div>
                   
                   <div className="space-y-8 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                      {items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center gap-6 group">
                           <div className="flex items-center gap-6">
                              <div className="w-16 h-20 bg-background/50 rounded-xl overflow-hidden border border-white/5 group-hover:border-primary/30 transition-all">
                                 <img src={item.product.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.product.name} />
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-white tracking-widest uppercase truncate max-w-[140px]">{item.product.name}</p>
                                 <p className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase">UNIT x{item.quantity} · {item.size || 'OS'}</p>
                              </div>
                           </div>
                           <span className="text-[10px] font-black text-white/60 tracking-widest">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      ))}
                   </div>

                   <div className="space-y-6 pt-10 border-t border-white/10 uppercase tracking-[0.2em] text-[10px] font-bold text-muted-foreground/40">
                      <div className="flex justify-between">
                         <span>Subtotal</span>
                         <span className="text-white/60">{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between">
                         <span>Global Transit (Insured)</span>
                         <span className="text-white/60">{shipping === 0 ? 'COMPLIMENTARY' : formatPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between">
                         <span>Governance Tax (12%)</span>
                         <span className="text-white/60">{formatPrice(tax)}</span>
                      </div>
                      <div className="pt-8 flex justify-between items-end border-t border-white/5">
                         <span className="text-xs font-black text-white/40 leading-none">TOTAL INVESTMENT</span>
                         <span className="text-4xl font-black italic tracking-tighter text-primary leading-none">{formatPrice(orderTotal)}</span>
                      </div>
                   </div>

                   <button 
                      disabled={isSubmitting}
                      type="submit"
                      className="btn-luxury w-full py-8 flex items-center justify-center gap-4 text-xs group disabled:opacity-50 relative overflow-hidden"
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
                         <div className="w-10 h-0.5 bg-white/20" />
                         <span className="text-[8px] font-black tracking-[0.5em] text-white uppercase group-hover:text-primary transition-colors">POWERED BY LUNAR SECURE</span>
                         <div className="w-10 h-0.5 bg-white/20" />
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
