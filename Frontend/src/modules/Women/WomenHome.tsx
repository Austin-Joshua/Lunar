import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MoveRight, Scissors, Origami } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { productsApi } from '@/services/api';
import { PageTransition } from '@/components/PageTransition';
import { PageLoader } from '@/components/Loader';
import type { Product } from '@/types';
import { motion } from 'framer-motion';

const WomenHome: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getByGender('women');
        setProducts(data.slice(0, 8)); // Get first 8 for featured
      } catch (error) {
        console.error("Failed to fetch women's products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <PageTransition>
      <div className="bg-background min-h-screen pb-40">
        {/* HERO - Architectural & Minimalist */}
        <section className="relative flex h-[80vh] items-center overflow-hidden bg-neutral-950">
          <div className="absolute inset-0">
             <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
              alt="Women's Editorial"
              className="w-full h-full object-cover grayscale opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
          </div>

          <div className="lunar-container relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl space-y-10"
            >
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.6em] text-primary">
                 <Origami className="h-4 w-4" />
                 THE WOMENSWEAR EDIT
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic text-white">
                Elegance <br />
                <span className="text-primary font-light not-italic">Redefined.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/40 font-medium tracking-tight max-w-md uppercase leading-relaxed">
                Celebrating the intersection of fluid movement and architectural precision. Curated for the modern silhouette.
              </p>
              <div className="pt-8">
                <button className="btn-luxury px-12 py-5 flex items-center gap-4">
                   VIEW COLLECTIONS <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BRUTALIST GRID - Collections */}
        <section className="py-40">
           <div className="lunar-container">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                 {/* Compact Card - Left */}
                 <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="md:col-span-4 group relative aspect-square md:aspect-auto overflow-hidden rounded-[2.5rem] bg-secondary"
                 >
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="" />
                    <div className="absolute inset-0 bg-black/10 p-10 flex flex-col justify-between">
                       <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                          <Scissors className="h-5 w-5 text-white" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none">Midi <br />Movements</h3>
                       </div>
                    </div>
                 </motion.div>

                 {/* Large Card - Right */}
                 <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-8 group relative aspect-[16/9] overflow-hidden rounded-[2.5rem] bg-secondary"
                 >
                    <img src="https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=1200&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-12 flex flex-col justify-end">
                       <span className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-2">LIMITED EDIT</span>
                       <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">Silk & Structure</h3>
                       <Link to="/women/tops" className="mt-6 flex items-center gap-2 text-white text-[10px] font-bold tracking-widest group-hover:gap-4 transition-all uppercase">
                          EXPLORE PIECES <MoveRight className="h-4 w-4" />
                       </Link>
                    </div>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* DYNAMIC PRODUCT GRID */}
        <section className="py-20">
          <div className="lunar-container">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <span className="luxury-subheading">CURATED SELECTION</span>
                <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                  The <br />Women's Edit<span className="text-primary not-italic">.</span>
                </h2>
              </div>
              <div className="flex items-center gap-8 text-[11px] font-bold tracking-widest text-white/40 uppercase">
                 <button className="hover:text-primary transition-colors">NEW ARRIVALS</button>
                 <button className="hover:text-primary transition-colors">ACCESSORIES</button>
                 <button className="text-white border-b border-primary pb-1">ALL COLLECTIONS</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                [1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-3xl" />)
              )}
            </div>
          </div>
        </section>

        {/* EDITORIAL PROMO */}
        <section className="py-40 bg-secondary/10">
          <div className="lunar-container flex flex-col items-center">
             <div className="max-w-4xl text-center space-y-10">
                <div className="flex justify-center mb-10">
                   <div className="w-20 h-20 border border-primary/20 rounded-full flex items-center justify-center p-2">
                      <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center">
                         <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                   </div>
                </div>
                <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
                   Architecture <br />
                   in Motion.
                </h2>
                <p className="text-xl text-muted-foreground font-medium uppercase tracking-tight leading-relaxed mx-auto max-w-2xl px-4">
                   The Lunar Women's society offers private access to seasonal atelier sessions and limited colorway archives.
                </p>
                <div className="pt-10">
                   <Link to="/signup" className="btn-luxury px-16 py-6 inline-block shadow-2xl">
                      ENROLL IN THE ARCHIVE
                   </Link>
                </div>
             </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default WomenHome;
