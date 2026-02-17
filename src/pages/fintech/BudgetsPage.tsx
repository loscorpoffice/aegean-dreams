import { AlertTriangle, TrendingUp, BarChart2 } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { formatCurrency } from '../../lib/formatters';
import { cn } from '../../lib/utils';

function BudgetBar({ pct, threshold }: { pct: number; threshold: number }) {
  const color = pct >= 100 ? 'bg-red-500' : pct >= threshold ? 'bg-amber-500' : 'bg-indigo-500';
  return (
    <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
      <div
        className={cn('h-2.5 rounded-full transition-all', color)}
        style={{ width: `${Math.min(100, pct)}%` }}
      />
    </div>
  );
}

export default function BudgetsPage() {
  const { budgets } = useApp();

  const alertedBudgets = budgets.filter(b => (b.utilization_pct ?? 0) >= b.alert_threshold);

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Budget Management</h1>
        <p className="text-slate-500 text-sm">{budgets.length} active budgets</p>
      </div>

      {alertedBudgets.length > 0 && (
        <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4 text-sm text-amber-800">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <strong>{alertedBudgets.length} budget(s) nearing limit:</strong>{' '}
            {alertedBudgets.map(b => b.name).join(', ')}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map(budget => {
          const pct = budget.utilization_pct ?? 0;
          const isOver = pct >= 100;
          const isNear = pct >= budget.alert_threshold && !isOver;

          return (
            <div key={budget.id} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-semibold text-slate-900">{budget.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {budget.category_name}
                    </span>
                    {budget.department && (
                      <span className="text-xs text-slate-400">{budget.department}</span>
                    )}
                  </div>
                </div>
                {isOver && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">Over Budget</span>
                )}
                {isNear && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Alert
                  </span>
                )}
              </div>

              <div className="flex justify-between text-sm mt-3">
                <div>
                  <p className="text-xs text-slate-500">Allocated</p>
                  <p className="font-bold text-slate-900">{formatCurrency(budget.amount)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500">Spent</p>
                  <p className={cn('font-bold', isOver ? 'text-red-600' : 'text-slate-900')}>
                    {formatCurrency(budget.spent ?? 0)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Remaining</p>
                  <p className={cn('font-bold', (budget.remaining ?? 0) < 0 ? 'text-red-600' : 'text-emerald-600')}>
                    {formatCurrency(budget.remaining ?? 0)}
                  </p>
                </div>
              </div>

              <BudgetBar pct={pct} threshold={budget.alert_threshold} />

              <div className="flex justify-between mt-1.5">
                <span className="text-xs text-slate-400">
                  {budget.period_start} – {budget.period_end}
                </span>
                <span className={cn('text-xs font-semibold', isOver ? 'text-red-600' : isNear ? 'text-amber-600' : 'text-slate-600')}>
                  {pct.toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Budget summary */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm font-semibold text-slate-900">Budget Summary</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Total Allocated</p>
            <p className="text-lg font-bold text-slate-900">
              {formatCurrency(budgets.reduce((s, b) => s + b.amount, 0))}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Total Spent</p>
            <p className="text-lg font-bold text-slate-900">
              {formatCurrency(budgets.reduce((s, b) => s + (b.spent ?? 0), 0))}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Avg Utilization</p>
            <p className="text-lg font-bold text-indigo-600">
              {(budgets.reduce((s, b) => s + (b.utilization_pct ?? 0), 0) / budgets.length).toFixed(0)}%
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
          <span>Alert threshold: notify when utilization ≥ threshold %</span>
        </div>
      </div>
    </div>
  );
}
