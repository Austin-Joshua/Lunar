import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc, icon: Icon, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="premium-card group bg-card border-white/5"
    >
      <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-700 shadow-2xl">
        <Icon className="h-8 w-8 stroke-[1.5px]" />
      </div>
      <h3 className="text-2xl font-black tracking-tight mb-5 text-white italic group-hover:text-primary transition-colors uppercase">{title}</h3>
      <p className="text-white/40 leading-relaxed font-medium tracking-wide uppercase text-[10px]">
        {desc}
      </p>
    </motion.div>
  );
};
