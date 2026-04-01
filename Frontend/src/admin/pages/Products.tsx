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
    <div className="space-y-12 animate-fade-in p-2 md:p-6 lg:p-10 bg-[#050505] min-h-screen text-white">
      
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-10 border-b border-white/5">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Archive className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase leading-none">INVENTORY CONTROL</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">Archive <br />Assets<span className="text-primary not-italic">.</span></h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
           <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-primary transition-colors" />
              <input 
                 type="text" 
                 placeholder="SEARCH ARCHIVE..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-14 pr-8 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/20 focus:outline-none text-[10px] font-black tracking-widest uppercase w-full sm:w-64 transition-all"
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
      <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">VISUAL ASSET</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">METADATA</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">CLASSIFICATION</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">VALUATION</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">STOCK LEVEL</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">ACTIONS</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((product) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                       <td className="px-10 py-8">
                          <div className="w-16 h-20 rounded-2xl bg-white/5 overflow-hidden ring-1 ring-white/10 group-hover:ring-primary/20 transition-all duration-700">
                             <img src={product.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={product.name} />
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="space-y-1">
                             <p className="text-[11px] font-black text-white uppercase tracking-widest">{product.name}</p>
                             <p className="text-[9px] font-bold text-primary tracking-widest uppercase">{product.brand}</p>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{product.gender}</span>
                             <span className="text-[8px] font-bold text-white/10 uppercase tracking-[0.3em]">{product.category}</span>
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
                              className="p-3 rounded-xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all"
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
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 space-y-12 shadow-full"
            >
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                   <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center text-destructive">
                      <Trash2 className="h-8 w-8" />
                   </div>
                </div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Purge Asset?</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose">
                  ARE YOU ABSOLUTELY CERTAIN YOU WANT TO PERMANENTLY PURGE <span className="text-white">"{deleteModal.product?.name.toUpperCase()}"</span> FROM THE LUNAR ARCHIVE?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setDeleteModal({ open: false, product: null })}
                  className="py-5 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-white/5 transition-colors"
                >
                  ABORT
                </button>
                <button
                  onClick={handleDelete}
                  className="py-5 rounded-2xl bg-destructive text-white text-[10px] font-black uppercase tracking-widest hover:bg-destructive/80 transition-all shadow-xl"
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
