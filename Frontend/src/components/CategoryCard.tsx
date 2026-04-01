import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  href: string;
  image: string;
  variant?: 'default' | 'featured' | 'kids';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  subtitle,
  href,
  image,
  variant = 'default',
}) => {
  const isFeatured = variant === 'featured';
  const isKids = variant === 'kids';

  return (
    <Link
      to={href}
      className={cn(
        "group relative block overflow-hidden",
        isFeatured 
          ? "aspect-[16/10] md:aspect-[16/9]" 
          : isKids 
            ? "aspect-square rounded-2xl border-4 border-kids-sky"
            : "aspect-[4/5] rounded-lg"
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isKids 
            ? "bg-gradient-to-t from-kids-lavender/80 via-transparent to-transparent"
            : "bg-gradient-to-t from-primary/80 via-primary/20 to-transparent group-hover:from-primary/90"
        )} />
      </div>

      {/* Content */}
      <div className={cn(
        "relative h-full flex flex-col justify-end p-6",
        isFeatured && "md:p-8 lg:p-10"
      )}>
        {subtitle && (
          <p className={cn(
            "text-sm uppercase tracking-wider mb-1",
            isKids ? "text-white font-medium" : "text-primary-foreground/80"
          )}>
            {subtitle}
          </p>
        )}
        <h3 className={cn(
          "font-bold transition-transform duration-300 group-hover:translate-x-2",
          isFeatured 
            ? "text-3xl md:text-4xl text-primary-foreground" 
            : isKids
              ? "text-2xl text-white"
              : "text-xl md:text-2xl text-primary-foreground"
        )}>
          {title}
        </h3>
        
        <div className={cn(
          "flex items-center gap-2 mt-3 transition-all duration-300",
          "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        )}>
          <span className={cn(
            "text-sm font-medium",
            isKids ? "text-white" : "text-primary-foreground"
          )}>
            Explore Collection
          </span>
          <ArrowRight className={cn(
            "h-4 w-4",
            isKids ? "text-white" : "text-primary-foreground"
          )} />
        </div>
      </div>
    </Link>
  );
};
