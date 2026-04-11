import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter, Fingerprint, Archive, Tag, Layers, Activity, MoreHorizontal, ChevronRight, Sparkles } from 'lucide-react';
import { PageLoader } from '@/admin/components/AdminLoader';
import { formatCurrency } from '@/admin/utils/constants';
import type { AdminProduct } from '@/admin/types';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; product: AdminProduct | null }>({
    open: false,
    product: null,
  });

  useEffect(() => {
    // Integration Hook: Replace with productsApi.getAll() for Admin
    setTimeout(() => {
      setProducts([
        {
          id: 'L-AQ-001',
          name: 'Premium Linen Oxford Shirt',
          brand: 'LUNAR ARCHIVE',
          gender: 'men',
          category: 'shirts',
          subcategory: 'shirts',
          price: 890.00,
          stock: 45,
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop',
          description: 'Architectural linen composition for the modern silhouette.',
          inStock: true,
          createdAt: '2026-03-01T10:00:00Z',
          updatedAt: '2026-04-01T14:30:00Z',
        },
        {
          id: 'L-AQ-002',
          name: 'Silk Blend Blouse',
          brand: 'LUNAR ARCHIVE',
          gender: 'women',
          category: 'tops',
          subcategory: 'tops',
          price: 1450.00,
          stock: 28,
          image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=100&h=100&fit=crop',
          description: 'High-fidelity silk blend for refined fluid expression.',
          inStock: true,
          createdAt: '2026-03-08T10:00:00Z',
          updatedAt: '2026-03-24T11:00:00Z',
        },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteModal.product) {
      setProducts(products.filter((p) => p.id !== deleteModal.product?.id));
      setDeleteModal({ open: false, product: null });
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="animate-fade-in space-y-12 text-foreground">
      
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col items-end justify-between gap-8 border-b border-border pb-10 dark:border-white/10 md:flex-row">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Archive className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase leading-none">INVENTORY CONTROL</span>
           </div>
           <h1 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-foreground md:text-7xl">Archive <br />Assets<span className="text-primary not-italic">.</span></h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
           <div className="relative group">
              <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input 
                 type="text" 
                 placeholder="SEARCH ARCHIVE..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full rounded-2xl border border-border bg-muted/40 py-4 pl-14 pr-8 text-[10px] font-black uppercase tracking-widest transition-all focus:border-primary/25 focus:outline-none sm:w-64 dark:border-white/10 dark:bg-white/5"
              />
           </div>
           <Link
             to="/admin/products/add"
             className="btn-luxury px-10 py-4 flex items-center gap-4 group"
           >
             <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-500" />
             CATALOG PIECE
           </Link>
        </div>
      </div>

      {/* ASSET LEDGER */}
      <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl dark:border-white/10">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-border bg-muted/20 dark:border-white/5 dark:bg-white/[0.02]">
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">VISUAL ASSET</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">METADATA</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">CLASSIFICATION</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">VALUATION</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">STOCK LEVEL</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase whitespace-nowrap">ACTIONS</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((product) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group transition-colors hover:bg-muted/30 dark:hover:bg-white/[0.02]"
                    >
                       <td className="px-10 py-8">
                          <div className="h-20 w-16 overflow-hidden rounded-2xl bg-muted/40 ring-1 ring-border transition-all duration-700 group-hover:ring-primary/20 dark:bg-white/5 dark:ring-white/10">
                             <img src={product.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={product.name} />
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="space-y-1">
                             <p className="text-[11px] font-black uppercase tracking-widest text-foreground">{product.name}</p>
                             <p className="text-[9px] font-bold text-primary tracking-widest uppercase">{product.brand}</p>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{product.gender}</span>
                             <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-muted-foreground/70">{product.category}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className="text-sm font-black italic tracking-tighter text-primary">{formatCurrency(product.price)}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                             <div className={cn("px-4 py-2 rounded-full text-[9px] font-black tracking-widest uppercase", product.stock > 10 ? "bg-primary/5 text-primary" : "bg-destructive/5 text-destructive")}>
                                {product.stock} IN ARCHIVE
                             </div>
                             {product.stock <= 5 && <Activity className="h-4 w-4 text-destructive animate-pulse" />}
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                              className="rounded-xl bg-muted/40 p-3 text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground dark:bg-white/5 dark:hover:bg-white/10"
                            >
                               <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setDeleteModal({ open: true, product })}
                              className="p-3 rounded-xl bg-destructive/5 text-destructive/40 hover:text-destructive hover:bg-destructive/10 transition-all"
                            >
                               <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* DELETE PROTOCOL MODAL */}
      <AnimatePresence>
        {deleteModal.open && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-6 backdrop-blur-3xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full space-y-12 rounded-[3rem] border border-border bg-card p-12 shadow-full dark:border-white/10"
            >
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                   <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center text-destructive">
                      <Trash2 className="h-8 w-8" />
                   </div>
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">Purge Asset?</h3>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] leading-loose">
                  ARE YOU ABSOLUTELY CERTAIN YOU WANT TO PERMANENTLY PURGE <span className="text-foreground">"{deleteModal.product?.name.toUpperCase()}"</span> FROM THE LUNAR ARCHIVE?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setDeleteModal({ open: false, product: null })}
                  className="rounded-2xl border border-border py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/40 dark:border-white/10"
                >
                  ABORT
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-2xl bg-destructive py-5 text-[10px] font-black uppercase tracking-widest text-destructive-foreground shadow-xl transition-all hover:bg-destructive/80"
                >
                  PURGE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
