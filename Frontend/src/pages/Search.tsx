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
      <div className="min-h-screen bg-background pt-32 pb-40 text-foreground selection:bg-primary/20">
        <div className="lunar-container">
          <div className="mx-auto mb-24 max-w-5xl space-y-12">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary">
              <Fingerprint className="h-4 w-4" />
              QUERY PROTOCOL
            </div>

            <form onSubmit={onSearchSubmit} className="group relative">
              <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 opacity-20 transition-opacity group-focus-within:opacity-100">
                <Command className="h-8 w-8 text-primary" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ACCESS THE ARCHIVE..."
                className="w-full border-b border-border bg-transparent py-10 pl-16 pr-20 text-3xl font-black uppercase italic tracking-tighter placeholder:text-muted-foreground/35 focus:border-primary focus:outline-none md:text-7xl dark:border-white/10"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-muted-foreground transition-all hover:text-primary group-hover:scale-110 active:scale-95"
              >
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : <SearchIcon className="h-8 w-8" />}
              </button>
            </form>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                <span className="text-primary">{products.length}</span> PIECES EXTRACTED FOR{' '}
                <span className="text-foreground">&quot;{query || 'IDENTITY'}&quot;</span>
              </div>
              <button
                type="button"
                className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-muted-foreground transition-colors hover:text-primary"
              >
                <SlidersHorizontal className="h-4 w-4 transition-transform duration-700 group-hover:rotate-180" />
                SORT PROTOCOL
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {products.length > 0 ? (
              <motion.div
                key={query}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-x-12 gap-y-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
              !isLoading &&
              query && (
                <div className="rounded-[4rem] border border-dashed border-border/80 bg-muted/10 py-60 text-center dark:border-white/10 dark:bg-white/[0.02]">
                  <div className="flex justify-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted/40 text-muted-foreground/40 dark:bg-white/5">
                      <Sparkles className="h-12 w-12" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter text-foreground">No Pieces Extracted</h3>
                    <p className="mx-auto max-w-sm text-[10px] font-bold uppercase leading-loose tracking-[0.4em] text-muted-foreground">
                      THE ARCHIVE SEARCH RETURNED NO MATCHES FOR YOUR CURRENT SELECTION.
                    </p>
                  </div>
                  <div className="pt-8">
                    <Link to="/" className="btn-luxury inline-flex items-center gap-2 px-16 py-6">
                      RETURN TO COLLECTIONS <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default SearchPage;
