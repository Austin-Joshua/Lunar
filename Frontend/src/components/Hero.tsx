import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { BRAND } from '@/config/brand';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="apple-section-dark relative flex min-h-[85dvh] flex-col items-center justify-center px-4 pb-14 pt-[calc(env(safe-area-inset-top,0px)+4.5rem)] sm:min-h-[88dvh] sm:pb-16 md:min-h-[90dvh] lg:min-h-[min(92dvh,820px)] lg:pb-20 lg:pt-[calc(env(safe-area-inset-top,0px)+5rem)]"
    >
      <div className="lunar-container z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5 sm:space-y-6"
        >
          <p className="text-xs font-medium tracking-tight text-white/65 sm:text-sm">
            <span className="font-bold tracking-tight">{BRAND.name}</span>
            <span className="text-white/50"> · Spring 2026</span>
          </p>
          <h1 className="text-[2.25rem] font-semibold leading-[1.07] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-[3.35rem]">
            Wardrobe staples,
            <br />
            <span className="text-primary">elevated.</span>
          </h1>
          <p className="mx-auto max-w-md text-[15px] font-normal leading-[1.5] tracking-[-0.01em] text-white/78 sm:text-[17px]">
            {BRAND.tagline} Fewer pieces, better fabric, honest pricing—so you reach for Lunar every week.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 sm:pt-6">
            <Link to="/men" className="btn-apple-primary min-h-[44px] px-6 sm:px-7">
              Shop men
            </Link>
            <Link to="/women" className="btn-apple-pill min-h-[44px] px-6 sm:px-7">
              Shop women
            </Link>
          </div>

          <div className="pt-12 sm:pt-16">
            <button
              type="button"
              onClick={() => document.getElementById('season-announcement')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="group flex min-h-[44px] flex-col items-center gap-2 text-sm font-medium text-primary"
            >
              <span>New season preview</span>
              <ChevronDown className="h-5 w-5 opacity-80 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
