import { cn } from '../../lib/utils';
import type { TransactionStatus, AdvanceStatus, TaskStatus } from '../../types';

type AnyStatus = TransactionStatus | AdvanceStatus | TaskStatus | string;

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-gray-100 text-gray-600' },
  pending_approval: { label: 'Pending', className: 'bg-amber-100 text-amber-700' },
  approved: { label: 'Approved', className: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
  posted: { label: 'Posted', className: 'bg-blue-100 text-blue-700' },
  partially_settled: { label: 'Part. Settled', className: 'bg-purple-100 text-purple-700' },
  fully_settled: { label: 'Settled', className: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Pending', className: 'bg-slate-100 text-slate-600' },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700' },
  verification_pending: { label: 'Review', className: 'bg-orange-100 text-orange-700' },
  completed: { label: 'Completed', className: 'bg-green-100 text-green-700' },
};

interface StatusBadgeProps {
  status: AnyStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, className: 'bg-gray-100 text-gray-600' };
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', config.className, className)}>
      {config.label}
    </span>
  );
}
