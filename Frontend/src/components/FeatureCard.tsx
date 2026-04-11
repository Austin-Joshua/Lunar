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
      className="premium-card group border border-border/80 bg-card dark:border-white/10"
    >
      <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-8 w-8 stroke-[1.5px]" />
      </div>
      <h3 className="mb-5 text-2xl font-black uppercase italic tracking-tight text-foreground transition-colors group-hover:text-primary">{title}</h3>
      <p className="text-[10px] font-medium uppercase leading-relaxed tracking-wide text-muted-foreground">
        {desc}
      </p>
    </motion.div>
  );
};
