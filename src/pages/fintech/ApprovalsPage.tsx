import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, XCircle, Clock, ArrowUpRight, ArrowDownRight,
  Filter, AlertCircle,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { StatusBadge } from '../../components/fintech/StatusBadge';
import { Button } from '../../components/ui/button';
import { formatCurrency, formatDate, formatRelativeTime } from '../../lib/formatters';
import { hasPermission } from '../../types';
import { MOCK_APPROVAL_CHAINS } from '../../store/mockData';

type FilterTab = 'transactions' | 'advances' | 'chains';

export default function ApprovalsPage() {
  const navigate = useNavigate();
  const { transactions, advanceRequests, approveTransaction, rejectTransaction,
    approveAdvanceRequest, rejectAdvanceRequest, currentUser } = useApp();
  const [tab, setTab] = useState<FilterTab>('transactions');

  const canApprove = currentUser && hasPermission(currentUser.role, 'approve_expenses');

  const pendingTxns = useMemo(() =>
    transactions.filter(t => t.status === 'pending_approval'), [transactions]);

  const pendingAdvances = useMemo(() =>
    advanceRequests.filter(r => r.status === 'pending_approval'), [advanceRequests]);

  const TABS: { key: FilterTab; label: string; count: number }[] = [
    { key: 'transactions', label: 'Transactions', count: pendingTxns.length },
    { key: 'advances', label: 'Advances', count: pendingAdvances.length },
    { key: 'chains', label: 'Approval Rules', count: MOCK_APPROVAL_CHAINS.length },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Approvals</h1>
        <p className="text-slate-500 text-sm">
          {pendingTxns.length + pendingAdvances.length} items awaiting your action
        </p>
      </div>

      {!canApprove && (
        <div className="flex items-center gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4 text-sm text-amber-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          You don't have approval permissions. Contact your admin.
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 bg-white rounded-xl border border-slate-200 p-1 w-fit">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                tab === t.key ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Transaction approvals */}
      {tab === 'transactions' && (
        <div className="space-y-3">
          {pendingTxns.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">All caught up!</p>
              <p className="text-slate-400 text-sm">No pending transaction approvals</p>
            </div>
          ) : (
            pendingTxns.map(txn => (
              <div key={txn.id} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${txn.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                      {txn.type === 'income'
                        ? <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        : <ArrowDownRight className="w-4 h-4 text-red-500" />
                      }
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{txn.description}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">{txn.created_by_name}</span>
                        <span className="text-xs text-slate-400">&bull;</span>
                        <span className="text-xs text-slate-500">{formatDate(txn.transaction_date)}</span>
                        <span className="text-xs text-slate-400">&bull;</span>
                        <span className="text-xs text-slate-500">{formatRelativeTime(txn.created_at)}</span>
                        {txn.category_name && (
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {txn.category_name}
                          </span>
                        )}
                      </div>
                      {txn.invoice_number && (
                        <p className="text-xs text-slate-400 mt-1">Invoice: {txn.invoice_number}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-lg font-bold text-slate-900">{formatCurrency(txn.amount)}</span>
                    {txn.tax_amount && txn.tax_amount > 0 && (
                      <span className="text-xs text-slate-400">incl. GST {formatCurrency(txn.tax_amount)}</span>
                    )}
                  </div>
                </div>

                {canApprove && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                      onClick={() => approveTransaction(txn.id)}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 gap-1.5"
                      onClick={() => rejectTransaction(txn.id)}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/transactions/${txn.id}`)}
                    >
                      View Details →
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Advance approvals */}
      {tab === 'advances' && (
        <div className="space-y-3">
          {pendingAdvances.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">No pending advance requests</p>
            </div>
          ) : (
            pendingAdvances.map(req => (
              <div key={req.id} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{req.purpose}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{req.user_name}</span>
                      <span className="text-xs text-slate-400">&bull;</span>
                      <span className="text-xs text-slate-500">{formatRelativeTime(req.created_at)}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Requires {req.required_approvers.length} approver(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-slate-900">{formatCurrency(req.requested_amount)}</span>
                    <div className="mt-1">
                      <StatusBadge status={req.status} />
                    </div>
                  </div>
                </div>

                {canApprove && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                      onClick={() => approveAdvanceRequest(req.id, currentUser!.id)}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 gap-1.5"
                      onClick={() => rejectAdvanceRequest(req.id, currentUser!.id)}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Approval chains */}
      {tab === 'chains' && (
        <div className="space-y-3">
          {MOCK_APPROVAL_CHAINS.map(chain => (
            <div key={chain.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-slate-900">{chain.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">
                      {chain.trigger_conditions.amount_min !== undefined && `Min: ${formatCurrency(chain.trigger_conditions.amount_min)}`}
                      {chain.trigger_conditions.amount_max !== undefined && ` · Max: ${formatCurrency(chain.trigger_conditions.amount_max)}`}
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-medium ${chain.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                  {chain.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-2">
                {chain.steps.map(step => (
                  <div key={step.order} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {step.order}
                    </div>
                    <div className="flex-1 text-sm">
                      <span className="text-slate-700">
                        {step.approvers.map(a => a.value).join(step.parallel ? ' + ' : ' → ')}
                      </span>
                      {step.parallel && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Parallel</span>
                      )}
                      <span className="ml-2 text-xs text-slate-400">{step.timeout_hours}h timeout</span>
                    </div>
                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
