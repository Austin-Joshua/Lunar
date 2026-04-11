import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pb-20 pt-32 md:min-h-screen">
      <div className="lunar-container z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <span className="inline-block text-[10px] font-bold tracking-[0.6em] text-primary uppercase bg-primary/5 px-6 py-2.5 rounded-full mb-4 animate-slide-up-fade">
            LUNAR SPRING 2026
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] animate-slide-up-fade uppercase" style={{ animationDelay: '0.1s' }}>
            The <br />
            <span className="text-foreground/90 font-light italic">Archive.</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-medium tracking-[0.2em] uppercase max-w-xl mx-auto pt-10 animate-slide-up-fade leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Experimental Essentials. Engineered for the modern individual. Experience the heritage of cutting-edge design.
          </p>
          
          <div className="flex justify-center pt-20 animate-slide-up-fade" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={() => document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center gap-6"
            >
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary transition-all group-hover:tracking-[0.6em]">EXPLORE PIECES</span>
              <div className="h-10 w-[1px] bg-primary/40 group-hover:h-16 transition-all duration-700" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground/40">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
};
