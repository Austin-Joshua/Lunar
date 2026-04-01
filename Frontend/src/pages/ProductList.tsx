import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowRight, LayoutGrid, Grid, ChevronDown, Sparkles, Fingerprint } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { PageLoader } from '@/components/Loader';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/services/firebase';

interface ProductListProps {
  gender: 'men' | 'women' | 'kids';
  subcategory?: string;
}

const ProductList: React.FC<ProductListProps> = ({ gender, subcategory }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const q = query(
      collection(db, 'products'),
      where('gender', '==', gender),
      ...(subcategory ? [where('subcategory', '==', subcategory)] : [])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(docs);
      setIsLoading(false);
    }, (error) => {
      console.error("Acquisition Error:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [gender, subcategory]);

  const title = subcategory ? subcategory.replace(/-/g, ' ') : gender;

  if (isLoading) return <PageLoader />;

  return (
    <PageTransition>
      <div className="bg-[#050505] min-h-screen pt-32 pb-40 selection:bg-primary/20">
        <div className="lunar-container">
          
          {/* EDITORIAL HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/5 pb-16 mb-20">
             <div className="space-y-6">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                   <Fingerprint className="h-4 w-4" />
                   THE {gender.toUpperCase()} ARCHIVE
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter leading-[0.85] text-white">
                  {title} <br />
                  <span className="text-primary font-light not-italic">Archive.</span>
                </h1>
                <p className="text-lg text-white/30 font-medium uppercase tracking-tight max-w-xl leading-relaxed">
                   A curated collection of architectural pieces defining the modern {gender} silhouette. Engineered for endurance and refined expression.
                </p>
             </div>

             {/* FILTERS & LAYOUT CONTROLS */}
             <div className="flex flex-wrap items-center gap-10">
                <div className="hidden lg:flex items-center gap-6">
                   <span className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase">LAYOUT VIEW</span>
                   <div className="flex items-center gap-4">
                      {[2, 3, 4].map(cols => (
                        <button 
                          key={cols}
                          onClick={() => setGridCols(cols as any)}
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border border-white/5",
                            gridCols === cols ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-white/40 hover:bg-white/10"
                          )}
                        >
                          <span className="text-[10px] font-black">{cols}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="h-10 w-px bg-white/5 hidden md:block" />

                <button className="btn-luxury px-8 py-4 flex items-center gap-4 group">
                   <SlidersHorizontal className="h-4 w-4 group-hover:rotate-180 transition-transform duration-700" />
                   REFINE SELECTION
                </button>
             </div>
          </div>

          {/* DYNAMIC PRODUCT GRID */}
          <AnimatePresence mode="wait">
            {products.length > 0 ? (
              <motion.div 
                key={`${gender}-${subcategory}-${gridCols}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "grid gap-x-12 gap-y-24",
                  gridCols === 2 ? "grid-cols-1 md:grid-cols-2" : gridCols === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"
                )}
              >
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-60 text-center space-y-10 border border-white/5 rounded-[3rem] bg-white/[0.01]">
                 <div className="flex justify-center">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-white/10">
                       <Sparkles className="h-10 w-10 rotate-12" />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Selection Unavailable</h3>
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em] max-w-sm mx-auto leading-loose">
                       WE ARE CURRENTLY CURATING THIS ARCHIVE. PLEASE CHECK BACK SHORTLY OR EXPLORE OTHER COLLECTIONS.
                    </p>
                 </div>
                 <Link to="/" className="btn-luxury inline-block px-12 mt-8">CONTINUE EXPLORING</Link>
              </div>
            )}
          </AnimatePresence>

          {/* EDITORIAL PROMO SECTION */}
          <section className="mt-60 py-40 border-t border-white/5">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                   <span className="luxury-subheading">THE LUNAR DIFFERENCE</span>
                   <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">Sustainable <br />Bespoke<span className="text-primary not-italic">.</span></h2>
                   <p className="text-xl text-white/30 font-medium uppercase tracking-tight leading-loose max-w-lg">
                      Every piece in our archive is verified for architectural integrity and sustainable provenance. We believe in high-fidelity fashion that transcends seasonal cycles.
                   </p>
                   <div className="pt-8">
                      <button className="flex items-center gap-6 group text-[10px] font-black uppercase tracking-[0.6em] text-primary">
                         READ OUR MANIFESTO <ArrowRight className="h-5 w-5 group-hover:translate-x-4 transition-all duration-700" />
                      </button>
                   </div>
                </div>
                <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-[4rem] group shadow-deep">
                   <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1000&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="Sustainability" />
                   <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-16">
                      <span className="text-[10px] font-bold tracking-[0.5em] text-white/60 mb-2 block uppercase">COLLECTION v2.6</span>
                      <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none">Organic Cotton & <br />Refined Wool</h4>
                   </div>
                </div>
             </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductList;
