import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight, Loader2, SlidersHorizontal, Fingerprint, Command, Sparkles } from 'lucide-react';
import { productsApi } from '@/services/api';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { PageTransition } from '@/components/PageTransition';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const results = await productsApi.search(searchTerm);
      setProducts(results);
    } catch (error) {
      console.error('Search extraction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput });
    }
  };

  return (
    <PageTransition>
      <div className="bg-[#050505] min-h-screen pt-32 pb-40 selection:bg-primary/20">
        <div className="lunar-container">
          
          {/* ARCHITECTURAL SEARCH HEADER */}
          <div className="max-w-5xl mx-auto mb-24 space-y-12">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary">
               <Fingerprint className="h-4 w-4" />
               QUERY PROTOCOL
            </div>
            
            <form onSubmit={onSearchSubmit} className="relative group">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
                 <Command className="h-8 w-8 text-primary" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ACCESS THE ARCHIVE..."
                className="w-full bg-transparent border-b border-white/5 py-10 pl-16 pr-20 text-3xl md:text-7xl font-black italic tracking-tighter focus:outline-none focus:border-primary transition-all uppercase placeholder:text-white/5"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-primary transition-all group-hover:scale-110 active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <SearchIcon className="h-8 w-8" />
                )}
              </button>
            </form>
            
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                  <span className="text-primary">{products.length}</span> PIECES EXTRACTED FOR <span className="text-white">"{query || 'IDENTITY'}"</span>
               </div>
               <button className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-white/40 hover:text-primary transition-colors group">
                  <SlidersHorizontal className="h-4 w-4 group-hover:rotate-180 transition-transform duration-700" />
                  SORT PROTOCOL
               </button>
            </div>
          </div>

          {/* DYNAMIC EXTRACTION GRID */}
          <AnimatePresence mode="wait">
            {products.length > 0 ? (
              <motion.div 
                key={query}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24"
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
            ) : !isLoading && query && (
              <div className="py-60 text-center space-y-12 border border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]">
                <div className="flex justify-center">
                   <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center text-white/10">
                      <Sparkles className="h-12 w-12" />
                   </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">No Pieces Extracted</h3>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em] max-w-sm mx-auto leading-loose">
                    THE ARCHIVE SEARCH RETURNED NO MATCHES FOR YOUR CURRENT SELECTION.
                  </p>
                </div>
                <div className="pt-8">
                  <Link 
                    to="/shop" 
                    className="btn-luxury px-16 py-6"
                  >
                    RETURN TO COLLECTIONS
                  </Link>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default SearchPage;
