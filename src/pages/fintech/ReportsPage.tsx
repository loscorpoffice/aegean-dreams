import { useState } from 'react';
import { ShieldCheck, Download, Filter } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { StatusBadge } from '../../components/fintech/StatusBadge';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { formatDateTime } from '../../lib/formatters';
import { hasPermission } from '../../types';

const ACTION_COLORS: Record<string, string> = {
  create: 'bg-blue-100 text-blue-700',
  update: 'bg-indigo-100 text-indigo-700',
  delete: 'bg-red-100 text-red-700',
  approve: 'bg-emerald-100 text-emerald-700',
  reject: 'bg-red-100 text-red-700',
  login: 'bg-slate-100 text-slate-600',
  export: 'bg-purple-100 text-purple-700',
};

export default function ReportsPage() {
  const { auditLogs, transactions, currentUser } = useApp();
  const [resourceFilter, setResourceFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  const canViewAudit = currentUser && hasPermission(currentUser.role, 'access_audit_logs');
  const canExport = currentUser && hasPermission(currentUser.role, 'export_reports');

  const filteredLogs = auditLogs.filter(log => {
    const matchResource = resourceFilter === 'all' || log.resource_type === resourceFilter;
    const matchAction = actionFilter === 'all' || log.action === actionFilter;
    return matchResource && matchAction;
  });

  // Financial summary
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const approvedTxns = transactions.filter(t => t.status === 'approved' || t.status === 'posted');
  const pendingTxns = transactions.filter(t => t.status === 'pending_approval');

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Reports & Audit Logs</h1>
          <p className="text-slate-500 text-sm">Comprehensive audit trail for compliance</p>
        </div>
        {canExport && (
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="w-4 h-4" />
            Export Audit Log
          </Button>
        )}
      </div>

      {/* Transaction summary report */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-xs text-slate-500">Total Transactions</p>
          <p className="text-xl font-bold text-slate-900">{transactions.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-xs text-slate-500">Approved</p>
          <p className="text-xl font-bold text-emerald-600">{approvedTxns.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-xs text-slate-500">Pending</p>
          <p className="text-xl font-bold text-amber-600">{pendingTxns.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-xs text-slate-500">Audit Events</p>
          <p className="text-xl font-bold text-indigo-600">{auditLogs.length}</p>
        </div>
      </div>

      {/* GST Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm font-semibold text-slate-900">GST Summary (Current Period)</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-slate-500">Total Taxable Sales</p>
            <p className="text-base font-bold text-slate-900">
              ₹{((totalIncome) / 118 * 100 / 100000).toFixed(2)}L
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">GST Collected (Output)</p>
            <p className="text-base font-bold text-emerald-600">
              ₹{(totalIncome * 18 / 118 / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">GST Paid (Input)</p>
            <p className="text-base font-bold text-red-600">
              ₹{(transactions.filter(t => t.type === 'expense').reduce((s, t) => s + (t.tax_amount ?? 0), 0) / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Data retention: 7 years (compliant with GST Act). Exports available in GSTR-1 JSON format.
        </p>
      </div>

      {/* Audit log */}
      {canViewAudit ? (
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Audit Trail</h2>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <Select value={resourceFilter} onValueChange={setResourceFilter}>
                <SelectTrigger className="w-32 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  <SelectItem value="transaction">Transactions</SelectItem>
                  <SelectItem value="advance_request">Advances</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-28 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredLogs.length === 0 ? (
              <p className="py-8 text-center text-slate-400 text-sm">No audit events found</p>
            ) : (
              filteredLogs.map(log => (
                <div key={log.id} className="flex items-start gap-4 px-5 py-3 hover:bg-slate-50">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${ACTION_COLORS[log.action] ?? 'bg-gray-100 text-gray-600'}`}>
                      {log.action}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900">
                      <span className="font-medium">{log.user_name}</span>
                      {' '}{log.action}d{' '}
                      <span className="font-medium">{log.resource_type}</span>
                      {' '}<span className="font-mono text-xs text-slate-400">{log.resource_id}</span>
                    </p>
                    {log.changes && (
                      <div className="text-xs text-slate-500 mt-0.5">
                        {log.changes.before && (
                          <span className="mr-2">Before: {JSON.stringify(log.changes.before)}</span>
                        )}
                        {log.changes.after && (
                          <span>After: {JSON.stringify(log.changes.after)}</span>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-slate-400 mt-0.5">
                      {formatDateTime(log.timestamp)}
                      {log.ip_address && <span className="ml-2">· IP: {log.ip_address}</span>}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center text-slate-500">
          <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-slate-300" />
          You don't have permission to view audit logs. Contact your admin.
        </div>
      )}
    </div>
  );
}
