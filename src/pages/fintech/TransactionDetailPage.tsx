import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, User, Calendar, Tag, CreditCard, Hash } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { StatusBadge } from '../../components/fintech/StatusBadge';
import { Button } from '../../components/ui/button';
import { formatCurrency, formatDateTime } from '../../lib/formatters';
import { hasPermission } from '../../types';

function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ElementType }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      {Icon && <Icon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-sm text-slate-900 font-medium mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );
}

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { transactions, approveTransaction, rejectTransaction, currentUser, auditLogs } = useApp();

  const txn = transactions.find(t => t.id === id);
  const canApprove = currentUser && hasPermission(currentUser.role, 'approve_expenses');
  const txnAuditLogs = auditLogs.filter(l => l.resource_id === id);

  if (!txn) {
    return (
      <div className="p-6 text-center text-slate-500">
        Transaction not found.
        <Button variant="link" onClick={() => navigate('/transactions')}>Go back</Button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('/transactions')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Transactions
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h1 className="text-lg font-bold text-slate-900">{txn.description}</h1>
                <p className="text-sm text-slate-500 mt-0.5">ID: {txn.id}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-2xl font-bold ${txn.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                </span>
                <StatusBadge status={txn.status} />
              </div>
            </div>

            {txn.tax_amount && txn.tax_amount > 0 && (
              <div className="bg-slate-50 rounded-lg p-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Base Amount</span>
                  <span>{formatCurrency(txn.amount - txn.tax_amount)}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-slate-600">GST ({txn.tax_rate}%)</span>
                  <span>{formatCurrency(txn.tax_amount)}</span>
                </div>
                <div className="flex justify-between mt-1 font-semibold border-t border-slate-200 pt-1">
                  <span>Total</span>
                  <span>{formatCurrency(txn.amount)}</span>
                </div>
              </div>
            )}

            <div>
              <InfoRow label="Date" value={txn.transaction_date} icon={Calendar} />
              <InfoRow label="Type" value={txn.type.charAt(0).toUpperCase() + txn.type.slice(1)} icon={Tag} />
              <InfoRow label="Category" value={txn.category_name ?? 'Uncategorized'} icon={Tag} />
              <InfoRow label="Vendor" value={txn.vendor_name ?? '—'} icon={User} />
              <InfoRow label="Payment Mode" value={txn.payment_mode.replace('_', ' ')} icon={CreditCard} />
              {txn.invoice_number && (
                <InfoRow label="Invoice #" value={txn.invoice_number} icon={Hash} />
              )}
            </div>
          </div>

          {/* Approval actions */}
          {canApprove && txn.status === 'pending_approval' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-amber-600" />
                <h2 className="text-sm font-semibold text-amber-800">Action Required</h2>
              </div>
              <p className="text-sm text-amber-700 mb-4">
                This transaction is pending your approval. Please review the details and take action.
              </p>
              <div className="flex gap-3">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                  onClick={() => { approveTransaction(txn.id); navigate('/transactions'); }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 gap-2"
                  onClick={() => { rejectTransaction(txn.id); navigate('/transactions'); }}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Created by */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Meta</h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-xs text-slate-500">Created by</p>
                <p className="font-medium text-slate-900">{txn.created_by_name ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Created at</p>
                <p className="font-medium text-slate-900">{formatDateTime(txn.created_at)}</p>
              </div>
              {txn.approved_by_name && (
                <div>
                  <p className="text-xs text-slate-500">Approved by</p>
                  <p className="font-medium text-slate-900">{txn.approved_by_name}</p>
                </div>
              )}
              {txn.approved_at && (
                <div>
                  <p className="text-xs text-slate-500">Approved at</p>
                  <p className="font-medium text-slate-900">{formatDateTime(txn.approved_at)}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500">Version</p>
                <p className="font-medium text-slate-900">v{txn.version}</p>
              </div>
            </div>
          </div>

          {/* Audit trail */}
          {txnAuditLogs.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Audit Trail</h2>
              <div className="space-y-3">
                {txnAuditLogs.map(log => (
                  <div key={log.id} className="flex gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-800">
                        {log.user_name} <span className="text-slate-500 font-normal">{log.action}d this</span>
                      </p>
                      <p className="text-[11px] text-slate-400">{formatDateTime(log.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
