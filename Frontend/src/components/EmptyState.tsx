import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, Search, Sparkles, ArrowRight, Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  type: 'cart' | 'orders' | 'products';
  title?: string;
  description?: string;
}

const icons = {
  cart: ShoppingBag,
  orders: Package,
  products: Search,
};

const defaults = {
  cart: {
    title: 'Archive is Empty',
    description: 'Your collective selection is currently unpopulated. Discover our latest editorial pieces to begin your journey.',
  },
  orders: {
    title: 'No Acquisitions Found',
    description: 'Your acquisition history is currently empty. Confirmed selections will be documented here for your review.',
  },
  products: {
    title: 'Extraction Failed',
    description: 'The LUNAR archive contains no pieces matching your current query parameters. Please refine your selection protocol.',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
}) => {
  const Icon = icons[type];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-40 px-6 text-center space-y-12 bg-white/[0.01] border border-white/5 rounded-[4rem] shadow-deep"
    >
      <div className="relative">
         <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center group">
            <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-700" />
         </div>
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute -inset-4 border border-dashed border-primary/20 rounded-full"
         />
      </div>
      
      <div className="space-y-4 max-w-md">
         <div className="flex justify-center mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">LUNAR PROTOCOL</span>
         </div>
         <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">
           {title || defaults[type].title}
         </h3>
         <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 leading-loose">
           {description || defaults[type].description}
         </p>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row gap-6">
         <Link
           to="/"
           className="btn-luxury px-12 py-5 flex items-center justify-center gap-4 group"
         >
           EXPLORE ARCHIVE <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform shadow-xl" />
         </Link>
         {type === 'products' && (
           <button 
             onClick={() => window.location.reload()}
             className="px-12 py-5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-white/5 transition-all"
           >
             RESET PROTOCOL
           </button>
         )}
      </div>

      <div className="absolute bottom-10 flex items-center gap-4 text-[8px] font-black tracking-[0.4em] text-white/10 uppercase">
         <Fingerprint className="h-3 w-3" />
         SECURE SESSION v2.6
      </div>
    </motion.div>
  );
};
