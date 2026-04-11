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
      <div className="min-h-screen bg-background pt-32 pb-40 text-foreground selection:bg-primary/20">
        <div className="lunar-container">
          
          {/* EDITORIAL HEADER */}
          <div className="mb-20 flex flex-col items-end justify-between gap-12 border-b border-border/80 pb-16 dark:border-white/10 md:flex-row">
             <div className="space-y-6">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                   <Fingerprint className="h-4 w-4" />
                   THE {gender.toUpperCase()} ARCHIVE
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter leading-[0.85] text-foreground">
                  {title} <br />
                  <span className="text-primary font-light not-italic">Archive.</span>
                </h1>
                <p className="text-lg font-medium uppercase tracking-tight max-w-xl leading-relaxed text-muted-foreground">
                   A curated collection of architectural pieces defining the modern {gender} silhouette. Engineered for endurance and refined expression.
                </p>
             </div>

             {/* FILTERS & LAYOUT CONTROLS */}
             <div className="flex flex-wrap items-center gap-10">
                <div className="hidden lg:flex items-center gap-6">
                   <span className="text-[9px] font-black tracking-[0.4em] uppercase text-muted-foreground/70">LAYOUT VIEW</span>
                   <div className="flex items-center gap-4">
                      {[2, 3, 4].map(cols => (
                        <button 
                          key={cols}
                          type="button"
                          onClick={() => setGridCols(cols as any)}
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-all duration-500",
                            gridCols === cols ? "bg-primary/10 text-primary border-primary/20" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          )}
                        >
                          <span className="text-[10px] font-black">{cols}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="hidden h-10 w-px bg-border md:block" />

                <button type="button" className="btn-luxury flex items-center gap-4 px-8 py-4 group">
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
              <div className="space-y-10 rounded-[3rem] border border-border bg-muted/20 py-60 text-center dark:bg-white/[0.02]">
                 <div className="flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted text-muted-foreground/30">
                       <Sparkles className="h-10 w-10 rotate-12" />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-foreground">Selection Unavailable</h3>
                    <p className="mx-auto max-w-sm text-[10px] font-bold uppercase leading-loose tracking-[0.4em] text-muted-foreground">
                       WE ARE CURRENTLY CURATING THIS ARCHIVE. PLEASE CHECK BACK SHORTLY OR EXPLORE OTHER COLLECTIONS.
                    </p>
                 </div>
                 <Link to="/shop" className="btn-luxury mt-8 inline-block px-12">CONTINUE EXPLORING</Link>
              </div>
            )}
          </AnimatePresence>

          {/* EDITORIAL PROMO SECTION */}
          <section className="mt-60 border-t border-border py-40">
             <div className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
                <div className="space-y-12">
                   <span className="luxury-subheading">THE LUNAR DIFFERENCE</span>
                   <h2 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-foreground md:text-7xl">Sustainable <br />Bespoke<span className="text-primary not-italic">.</span></h2>
                   <p className="max-w-lg text-xl font-medium uppercase leading-loose tracking-tight text-muted-foreground">
                      Every piece in our archive is verified for architectural integrity and sustainable provenance. We believe in high-fidelity fashion that transcends seasonal cycles.
                   </p>
                   <div className="pt-8">
                      <button type="button" className="group flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.6em] text-primary">
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
