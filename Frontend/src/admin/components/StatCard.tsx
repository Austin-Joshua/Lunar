import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = 'bg-primary/10',
}) => {
  const iconMuted = iconColor.includes('muted') || iconColor.includes('white/5');
  return (
    <div className="rounded-[2rem] border border-border bg-card p-8 transition-colors hover:border-primary/25 dark:border-white/10 dark:hover:border-white/15">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 space-y-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-muted-foreground">{title}</p>
          <p className="text-3xl font-black tabular-nums tracking-tighter text-foreground">{value}</p>
          {trend && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {trend.isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400/90" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-destructive" />
              )}
              <span
                className={cn(
                  'text-[10px] font-black uppercase tracking-widest',
                  trend.isPositive ? 'text-emerald-600 dark:text-emerald-400/90' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn('shrink-0 rounded-2xl p-4', iconColor)}>
          <Icon className={cn('h-6 w-6', iconMuted ? 'text-muted-foreground' : 'text-primary')} />
        </div>
      </div>
    </div>
  );
};
