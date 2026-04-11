import React, { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, Clock, ArrowRight, ShieldCheck, Search, Calendar, Hash } from 'lucide-react';
import { ordersApi } from '@/services/api';
import { useCurrency } from '@/context/CurrencyContext';
import { PageTransition } from '@/components/PageTransition';
import { PageLoader } from '@/components/Loader';
import type { Order } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const statusConfig = {
  pending: { icon: Clock, label: 'PENDING ARCHIVE', color: 'text-yellow-500/80', bg: 'bg-yellow-500/5' },
  processing: { icon: Package, label: 'IN ATELIER', color: 'text-blue-500/80', bg: 'bg-blue-500/5' },
  shipped: { icon: Truck, label: 'IN TRANSIT', color: 'text-primary', bg: 'bg-primary/5' },
  delivered: { icon: CheckCircle, label: 'ARCHIVED', color: 'text-emerald-500/80', bg: 'bg-emerald-500/5' },
  cancelled: { icon: Clock, label: 'RECLAIMED', color: 'text-destructive/80', bg: 'bg-destructive/5' },
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersApi.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) return <PageLoader />;

  if (orders.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-10 lunar-container">
          <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center">
             <Package className="h-10 w-10 text-muted-foreground opacity-20" />
          </div>
          <div className="text-center space-y-4">
             <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-foreground">No Order History</h1>
             <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Your acquisitions will appear here once confirmed.</p>
          </div>
          <Link to="/shop" className="btn-luxury px-12 py-5">
             START COLLECTION
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="bg-background min-h-screen pt-32 pb-40">
        <div className="lunar-container">
          
          {/* ORDERS HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-border pb-10">
            <div className="space-y-4">
              <span className="luxury-subheading">ACQUISITION HISTORY</span>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none text-foreground">
                The <br />Archive<span className="text-primary not-italic">.</span>
              </h1>
            </div>
            <div className="flex items-center gap-8">
               <div className="relative group">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{orders.length} ACQUISITIONS FOUND</span>
               </div>
            </div>
          </div>

          <div className="space-y-24">
            <AnimatePresence mode="popLayout">
              {orders.map((order, idx) => {
                const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
                const StatusIcon = status.icon;

                return (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                       {/* LEFT: Metadata */}
                       <div className="lg:col-span-3 space-y-8">
                          <div className={cn("inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-[9px] font-black tracking-[0.2em] transition-all duration-700", status.bg, status.color)}>
                             <StatusIcon className="h-4 w-4" />
                             {status.label}
                          </div>
                          
                          <div className="space-y-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                             <div className="flex items-center gap-4">
                                <Hash className="h-4 w-4 text-primary/40" />
                                <span className="text-foreground">{order.id}</span>
                             </div>
                             <div className="flex items-center gap-4">
                                <Calendar className="h-4 w-4 text-primary/40" />
                                <span className="text-foreground">
                                   {new Date(order.createdAt).toLocaleDateString('en-US', {
                                      month: 'long', day: 'numeric', year: 'numeric'
                                   })}
                                </span>
                             </div>
                             <div className="flex items-center gap-4">
                                <ShieldCheck className="h-4 w-4 text-primary/40" />
                                <span className="text-foreground">INSURED DELIVERY</span>
                             </div>
                          </div>

                          <div className="pt-8 border-t border-border mt-auto">
                             <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40 mb-2">INVESTMENT</div>
                             <div className="text-3xl font-black italic tracking-tighter text-primary">{formatPrice(order.total)}</div>
                          </div>
                       </div>

                       {/* RIGHT: Items Grid */}
                       <div className="lg:col-span-9 space-y-10">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                             {order.items.map((item, i) => (
                               <div key={i} className="flex gap-8 group/item">
                                  <div className="relative flex-shrink-0 w-24 h-32 overflow-hidden rounded-2xl bg-secondary">
                                     <img 
                                        src={item.product.image} 
                                        className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-700" 
                                        alt={item.product.name} 
                                     />
                                  </div>
                                  <div className="flex flex-col justify-center space-y-3">
                                     <span className="text-[9px] font-bold text-primary uppercase tracking-[0.3em]">{item.product.brand || 'LUNAR'}</span>
                                     <h3 className="text-sm font-black uppercase tracking-widest text-foreground leading-tight">{item.product.name}</h3>
                                     <div className="flex gap-4 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                        {item.size && <span>SIZE: {item.size}</span>}
                                        <span>UNIT: {item.quantity}</span>
                                     </div>
                                     <span className="text-xs font-black italic tracking-tighter text-muted-foreground">{formatPrice(item.product.price)}</span>
                                  </div>
                               </div>
                             ))}
                          </div>
                          
                          <div className="pt-10 flex justify-end">
                             <button type="button" className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/70 hover:text-primary transition-all group-hover:gap-6">
                                TRACK SHIPMENT <ArrowRight className="h-4 w-4" />
                             </button>
                          </div>
                       </div>
                    </div>
                    <div className="mt-20 h-px w-full bg-border" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Orders;
