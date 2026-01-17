import React from 'react';
import { cn } from '@/lib/utils';

interface AdminLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AdminLoader: React.FC<AdminLoaderProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "rounded-full animate-spin border-admin-sidebar border-t-admin-sidebar-active",
          sizeClasses[size]
        )}
      />
    </div>
  );
};

export const PageLoader: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <AdminLoader size="lg" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};
