import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, subtitle, products }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Editorial Header Protocol */}
      <div className="lunar-container mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-6">
          <span className="text-[10px] font-black tracking-[0.8em] text-primary uppercase bg-primary/5 px-6 py-2.5 rounded-full inline-block mb-4">{subtitle}</span>
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-foreground">
            {title}<span className="text-primary not-italic font-light">.</span>
          </h2>
        </div>

        <div className="flex gap-6 pb-2">
          <button 
            onClick={scrollLeft}
            className="w-16 h-16 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-700 group shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={scrollRight}
            className="w-16 h-16 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-700 group shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Horizontal Archive Ledger */}
      <div className="relative">
        <div 
          ref={containerRef}
          className="flex gap-12 overflow-x-auto px-[calc((100vw-min(1280px,90vw))/2)] pb-40 no-scrollbar snap-x snap-mandatory mask-ledger"
        >
          {products.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-[320px] md:min-w-[480px] snap-center first:snap-start py-4"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
          {/* Spacer to allow final item centering */}
          <div className="min-w-[20vw]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
