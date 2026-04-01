import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'kids';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  variant = 'default',
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "rounded-full animate-spin",
          sizeClasses[size],
          variant === 'kids' 
            ? "border-kids-sky border-t-kids-coral" 
            : "border-muted border-t-primary"
        )}
      />
    </div>
  );
};

// Full page loader
export const PageLoader: React.FC<{ variant?: 'default' | 'kids' }> = ({ variant = 'default' }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader size="lg" variant={variant} />
      <p className={cn(
        "text-sm animate-pulse",
        variant === 'kids' ? "text-kids-coral" : "text-muted-foreground"
      )}>
        Loading...
      </p>
    </div>
  );
};

// Skeleton loader for product cards
export const ProductCardSkeleton: React.FC<{ variant?: 'default' | 'kids' }> = ({ variant = 'default' }) => {
  const isKids = variant === 'kids';
  
  return (
    <div className={cn(
      "animate-pulse",
      isKids ? "kids-card p-3" : "lunar-card overflow-hidden"
    )}>
      <div className={cn(
        "aspect-[3/4] bg-muted",
        isKids ? "rounded-xl" : "rounded-t-lg"
      )} />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-5 bg-muted rounded w-1/4" />
      </div>
    </div>
  );
};
