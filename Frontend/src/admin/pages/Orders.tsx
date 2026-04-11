import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, RefreshCw, Package, Truck, CheckCircle, Clock, Hash, User, Mail, MapPin, ExternalLink, ShieldCheck, Activity } from 'lucide-react';
import { PageLoader, AdminLoader } from '@/admin/components/AdminLoader';
import { formatCurrency, formatDateTime } from '@/admin/utils/constants';
import type { AdminOrder } from '@/admin/types';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig = {
  pending: { icon: Clock, label: 'PENDING ARCHIVE', color: 'text-yellow-500/80', bg: 'bg-yellow-500/5' },
  processing: { icon: Package, label: 'IN ATELIER', color: 'text-blue-500/80', bg: 'bg-blue-500/5' },
  shipped: { icon: Truck, label: 'IN TRANSIT', color: 'text-primary', bg: 'bg-primary/5' },
  delivered: { icon: CheckCircle, label: 'ARCHIVED', color: 'text-emerald-500/80', bg: 'bg-emerald-500/5' },
  cancelled: { icon: Clock, label: 'RECLAIMED', color: 'text-destructive/80', bg: 'bg-destructive/5' },
};

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    // Integration Hook: Replace with adminApi.getOrders()
    setTimeout(() => {
      // Mock data populated for high-end preview
      setOrders([
        {
          id: 'L-AQ-00165',
          userId: '1',
          customerName: 'Alexander Vance',
          customerEmail: 'vance@architect.com',
          items: [
            { productId: '1', productName: 'Premium Linen Oxford Shirt', productImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100', quantity: 2, price: 890.00, size: 'M' },
          ],
          total: 1780.00,
          status: 'shipped',
          shippingAddress: { fullName: 'Alexander Vance', street: '12 ARCHITECTURAL PLAZA', city: 'Tokyo', state: 'JP', zipCode: '100-0001', country: 'JAPAN', phone: '+81 90-1234-5678' },
          createdAt: '2026-04-01T10:30:00Z',
          updatedAt: '2026-04-01T14:00:00Z',
        },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus as AdminOrder['status'] } : order
      )
    );
    if (selectedOrder?.id === orderId) {
       setSelectedOrder(prev => prev ? { ...prev, status: newStatus as AdminOrder['status'] } : null);
    }
    setUpdatingStatus(null);
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="animate-fade-in space-y-12 text-foreground">
      
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col items-end justify-between gap-8 border-b border-border pb-10 dark:border-white/10 md:flex-row">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase leading-none">LOGISTICS CONTROL</span>
           </div>
           <h1 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-foreground md:text-7xl">Acquisition <br />Ledger<span className="text-primary not-italic">.</span></h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
           <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                 type="text" 
                 placeholder="SEARCH ARCHIVE..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full rounded-2xl border border-border bg-muted/40 py-4 pl-14 pr-8 text-[10px] font-black uppercase tracking-widest focus:border-primary/25 focus:outline-none sm:w-64 dark:border-white/10 dark:bg-white/5"
              />
           </div>
           <select 
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
             className="cursor-pointer appearance-none rounded-2xl border border-border bg-muted/40 px-8 py-4 text-[10px] font-black uppercase tracking-widest focus:border-primary/25 focus:outline-none dark:border-white/10 dark:bg-white/5"
           >
              <option value="">ALL STATUSES</option>
              {Object.entries(statusConfig).map(([val, cfg]) => (
                <option key={val} value={val}>{cfg.label}</option>
              ))}
           </select>
        </div>
      </div>

      {/* ACQUISITION DATA TABLE */}
      <div className="rounded-[2.5rem] border border-border bg-card dark:border-white/10 overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-border bg-muted/20 dark:border-white/5 dark:bg-white/[0.02]">
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">ID PROTOCOL</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">ACQUISITION AGENT</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">INVESTMENT</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">STATUS</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">CHRONOS</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
                    return (
                      <motion.tr 
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-3">
                               <Hash className="h-4 w-4 text-primary/40" />
                               <span className="text-[11px] font-black tracking-widest text-foreground">{order.id}</span>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <div className="space-y-1">
                               <p className="text-[11px] font-black uppercase tracking-widest text-foreground">{order.customerName}</p>
                               <p className="text-[9px] font-bold text-muted-foreground tracking-tighter uppercase">{order.customerEmail}</p>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <span className="text-sm font-black italic tracking-tighter text-primary">{formatCurrency(order.total)}</span>
                         </td>
                         <td className="px-10 py-8">
                            <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black tracking-widest", status.bg, status.color)}>
                               <status.icon className="h-3.5 w-3.5" />
                               {status.label}
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <span className="text-[10px] font-black text-muted-foreground tracking-widest">{formatDateTime(order.createdAt)}</span>
                         </td>
                         <td className="px-10 py-8 text-right">
                            <button className="p-3 rounded-xl bg-white/5 text-muted-foreground group-hover:text-primary transition-all group-hover:bg-primary/10">
                               <Eye className="h-5 w-5" />
                            </button>
                         </td>
                      </motion.tr>
                    );
                  })}
               </tbody>
            </table>
         </div>
      </div>

      {/* ACQUISITION DETAIL PROTOCOL (MODAL) */}
      <AnimatePresence>
         {selectedOrder && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-6 backdrop-blur-3xl"
           >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="flex max-h-[90vh] h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[3.5rem] border border-border bg-card shadow-full md:h-auto md:flex-row dark:border-white/10"
              >
                 {/* LEFT: Items & Summary */}
                 <div className="flex-1 p-10 md:p-16 space-y-12 overflow-y-auto no-scrollbar">
                    <div className="flex justify-between items-start">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-primary">
                             <Package className="h-4 w-4" /> ACQUISITION MANIFEST
                          </div>
                          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-foreground">ID: {selectedOrder.id}</h2>
                       </div>
                       <button 
                         onClick={() => setSelectedOrder(null)}
                         className="rounded-2xl bg-muted/40 p-4 text-muted-foreground transition-all hover:bg-muted/60 dark:bg-white/5 dark:hover:bg-white/10"
                       >
                          <RefreshCw className="h-6 w-6" />
                       </button>
                    </div>

                    <div className="space-y-8">
                       {selectedOrder.items.map((item, i) => (
                         <div key={i} className="flex gap-8 group">
                            <div className="w-24 h-32 rounded-2xl bg-white/5 overflow-hidden ring-1 ring-white/10">
                               <img src={item.productImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={item.productName} />
                            </div>
                            <div className="flex flex-col justify-center space-y-3">
                               <p className="text-[10px] font-black text-primary tracking-widest uppercase">LUNAR PIECE</p>
                               <h3 className="max-w-[250px] truncate text-sm font-black uppercase tracking-widest text-foreground">{item.productName}</h3>
                               <div className="flex gap-6 text-[9px] font-black text-muted-foreground tracking-widest uppercase">
                                  <span>VALUATION: {formatCurrency(item.price)}</span>
                                  <span>UNIT: {item.quantity}</span>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="flex items-end justify-between border-t border-border pt-12 dark:border-white/10">
                       <div className="space-y-2">
                          <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">TOTAL INVESTMENT</p>
                          <p className="text-4xl font-black italic tracking-tighter text-primary">{formatCurrency(selectedOrder.total)}</p>
                       </div>
                       <div className="flex gap-4">
                          <button className="btn-luxury px-10 py-5 text-[10px]">AUTHENTICATE PIECE</button>
                       </div>
                    </div>
                 </div>

                 {/* RIGHT: Logistics & Status */}
                 <div className="flex w-full flex-col space-y-12 border-l border-border bg-muted/15 p-10 md:w-[400px] md:p-16 dark:border-white/10 dark:bg-white/[0.02]">
                    <section className="space-y-10">
                       <div className="flex items-center gap-4 border-b border-border pb-4 dark:border-white/10">
                          <MapPin className="h-4 w-4 text-primary" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">TRANSIT COORDINATES</h3>
                       </div>
                       <div className="space-y-6 text-[10px] font-bold uppercase leading-loose tracking-[0.2em] text-muted-foreground">
                          <div className="flex gap-4">
                             <User className="h-4 w-4 text-primary opacity-40" />
                             <span className="text-foreground">{selectedOrder.customerName}</span>
                          </div>
                          <div className="flex gap-4">
                             <Mail className="h-4 w-4 text-primary opacity-40" />
                             <span className="lowercase text-foreground">{selectedOrder.customerEmail}</span>
                          </div>
                          <div className="flex gap-4">
                             <MapPin className="h-4 w-4 text-primary opacity-40 shrink-0" />
                             <span className="text-foreground">
                                {selectedOrder.shippingAddress.street}<br />
                                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}<br />
                                {selectedOrder.shippingAddress.country}
                             </span>
                          </div>
                       </div>
                    </section>

                    <section className="space-y-10 mt-auto">
                       <div className="flex items-center gap-4 border-b border-border pb-4 dark:border-white/10">
                          <Activity className="h-4 w-4 text-primary" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">PROTOCOL STATUS</h3>
                       </div>
                       
                       <div className="space-y-6">
                          <select 
                            value={selectedOrder.status}
                            onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
                            disabled={updatingStatus === selectedOrder.id}
                            className="w-full cursor-pointer appearance-none rounded-2xl border border-border bg-muted/40 px-8 py-5 text-[10px] font-black uppercase tracking-widest focus:border-primary/25 focus:outline-none disabled:opacity-50 dark:border-white/10 dark:bg-white/5"
                          >
                             {Object.entries(statusConfig).map(([val, cfg]) => (
                               <option key={val} value={val}>{cfg.label}</option>
                             ))}
                          </select>
                          
                          <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 flex items-center gap-6">
                             <ShieldCheck className="h-6 w-6 text-primary" />
                             <div className="text-[8px] font-black tracking-[0.2em] text-primary uppercase">VERIFIED SECURE TRANSIT v2.6</div>
                          </div>
                       </div>
                    </section>
                 </div>
              </motion.div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;
