import { cn } from '../../lib/utils';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  onClick?: () => void;
  className?: string;
}

export function MetricCard({
  label, value, subValue, change, changeLabel,
  icon: Icon, iconColor = 'text-indigo-600', iconBg = 'bg-indigo-50',
  onClick, className,
}: MetricCardProps) {
  const positive = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200 p-5 flex gap-4',
        onClick && 'cursor-pointer hover:border-indigo-200 hover:shadow-sm transition-all',
        className,
      )}
      onClick={onClick}
    >
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', iconBg)}>
        <Icon className={cn('w-5 h-5', iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="text-xl font-bold text-slate-900 mt-0.5 truncate">{value}</p>
        {subValue && <p className="text-xs text-slate-500 mt-0.5">{subValue}</p>}
        {change !== undefined && (
          <div className={cn('flex items-center gap-1 mt-1', positive ? 'text-emerald-600' : 'text-red-500')}>
            {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs font-medium">
              {positive ? '+' : ''}{typeof change === 'number' ? change.toLocaleString('en-IN') : change}
              {changeLabel && ` ${changeLabel}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
