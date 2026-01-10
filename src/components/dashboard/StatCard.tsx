import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  variant?: 'income' | 'expense' | 'balance' | 'default';
  className?: string;
}

const StatCard = ({ title, value, icon, trend, variant = 'default', className }: StatCardProps) => {
  const gradientClass = {
    income: 'gradient-income',
    expense: 'gradient-expense',
    balance: 'gradient-balance',
    default: 'bg-card',
  }[variant];

  const isColored = variant !== 'default';

  return (
    <div
      className={cn(
        'rounded-xl p-5 card-shadow transition-all hover:shadow-card-lg',
        gradientClass,
        isColored ? 'text-white' : 'bg-card',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn(
            'text-sm font-medium',
            isColored ? 'text-white/80' : 'text-muted-foreground'
          )}>
            {title}
          </p>
          <p className={cn(
            'text-2xl font-display font-bold tracking-tight',
            isColored ? 'text-white' : 'text-foreground'
          )}>
            {value}
          </p>
          {trend && (
            <p className={cn(
              'text-xs',
              isColored ? 'text-white/70' : 'text-muted-foreground'
            )}>
              {trend}
            </p>
          )}
        </div>
        <div className={cn(
          'p-2.5 rounded-lg',
          isColored ? 'bg-white/20' : 'bg-primary/10'
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
