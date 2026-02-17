import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Plus, Filter, Download, Search, ChevronDown,
  ArrowUpRight, ArrowDownRight, Edit2, CheckCircle, XCircle,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { StatusBadge } from '../../components/fintech/StatusBadge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { formatCurrency, formatDate } from '../../lib/formatters';
import { MOCK_CATEGORIES, MOCK_VENDORS } from '../../store/mockData';
import { hasPermission } from '../../types';
import type { Transaction, TransactionType, PaymentMode } from '../../types';

function NewTransactionDialog({
  open,
  onClose,
  defaultType,
}: {
  open: boolean;
  onClose: () => void;
  defaultType?: TransactionType;
}) {
  const { addTransaction, currentUser, business } = useApp();
  const [form, setForm] = useState({
    type: defaultType ?? 'expense' as TransactionType,
    amount: '',
    description: '',
    transaction_date: new Date().toISOString().split('T')[0],
    vendor_id: '',
    category_id: '',
    payment_mode: 'bank_transfer' as PaymentMode,
    invoice_number: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const vendor = MOCK_VENDORS.find(v => v.id === form.vendor_id);
    const category = MOCK_CATEGORIES.find(c => c.id === form.category_id);
    const amount = parseFloat(form.amount);

    addTransaction({
      business_id: business.id,
      type: form.type,
      status: amount >= 10000 ? 'pending_approval' : 'approved',
      amount,
      currency: business.base_currency,
      transaction_date: form.transaction_date,
      description: form.description,
      vendor_id: form.vendor_id || undefined,
      vendor_name: vendor?.name,
      category_id: form.category_id || undefined,
      category_name: category?.name,
      payment_mode: form.payment_mode,
      invoice_number: form.invoice_number || undefined,
      created_by: currentUser.id,
      created_by_name: currentUser.name,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Type</Label>
              <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as TransactionType }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="advance">Advance</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={form.transaction_date}
                onChange={e => setForm(f => ({ ...f, transaction_date: e.target.value }))}
                className="mt-1"
                required
              />
            </div>
          </div>

          <div>
            <Label>Amount (INR) *</Label>
            <Input
              type="number"
              placeholder="0"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              className="mt-1"
              required
            />
            {parseFloat(form.amount) >= 10000 && (
              <p className="text-xs text-amber-600 mt-1">Amount ≥ ₹10,000 will require approval</p>
            )}
          </div>

          <div>
            <Label>Description *</Label>
            <Input
              placeholder="Brief description of the transaction"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Vendor</Label>
              <Select value={form.vendor_id} onValueChange={v => setForm(f => ({ ...f, vendor_id: v }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_VENDORS.map(v => (
                    <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={form.category_id} onValueChange={v => setForm(f => ({ ...f, category_id: v }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CATEGORIES.filter(c => c.type === form.type || c.type === 'both').map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Payment Mode</Label>
              <Select value={form.payment_mode} onValueChange={v => setForm(f => ({ ...f, payment_mode: v as PaymentMode }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Invoice / Ref #</Label>
              <Input
                placeholder="INV-001"
                value={form.invoice_number}
                onChange={e => setForm(f => ({ ...f, invoice_number: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Create Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { transactions, approveTransaction, rejectTransaction, currentUser } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showNew, setShowNew] = useState(searchParams.get('new') !== null);
  const [defaultType] = useState<TransactionType>(
    (searchParams.get('new') as TransactionType) ?? 'expense'
  );

  const canApprove = currentUser && hasPermission(currentUser.role, 'approve_expenses');
  const canCreate = currentUser && hasPermission(currentUser.role, 'create_expense');

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = !search || [t.description, t.vendor_name, t.invoice_number, t.category_name]
        .some(v => v?.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchType = typeFilter === 'all' || t.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [transactions, search, statusFilter, typeFilter]);

  const totalIncome = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <NewTransactionDialog
        open={showNew}
        onClose={() => setShowNew(false)}
        defaultType={defaultType}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-500 text-sm">{filtered.length} transactions</p>
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-4 h-4" />
            Export
          </Button>
          {canCreate && (
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
              onClick={() => setShowNew(true)}
            >
              <Plus className="w-4 h-4" />
              New Transaction
            </Button>
          )}
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-white rounded-lg border border-slate-200 p-3 text-center">
          <p className="text-xs text-slate-500">Total Income</p>
          <p className="text-base font-bold text-emerald-600">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-3 text-center">
          <p className="text-xs text-slate-500">Total Expense</p>
          <p className="text-base font-bold text-red-600">{formatCurrency(totalExpense)}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-3 text-center">
          <p className="text-xs text-slate-500">Pending</p>
          <p className="text-base font-bold text-amber-600">{transactions.filter(t => t.status === 'pending_approval').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-3 text-center">
          <p className="text-xs text-slate-500">Net</p>
          <p className={`text-base font-bold ${totalIncome - totalExpense >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {formatCurrency(totalIncome - totalExpense)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by description, vendor, invoice..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-36 h-9 text-sm">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="advance">Advance</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
              <ChevronDown className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending_approval">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="posted">Posted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Vendor</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filtered.map((txn: Transaction) => (
                  <tr
                    key={txn.id}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/transactions/${txn.id}`)}
                  >
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{formatDate(txn.transaction_date)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${txn.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                          {txn.type === 'income'
                            ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                            : <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 line-clamp-1">{txn.description}</p>
                          <p className="text-xs text-slate-400 hidden sm:block">{txn.created_by_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600">
                        {txn.category_name ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{txn.vendor_name ?? '—'}</td>
                    <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">
                      <span className={txn.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}>
                        {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={txn.status} />
                    </td>
                    <td className="px-4 py-3 text-center" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => navigate(`/transactions/${txn.id}`)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                          title="View details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {canApprove && txn.status === 'pending_approval' && (
                          <>
                            <button
                              onClick={() => approveTransaction(txn.id)}
                              className="p-1.5 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => rejectTransaction(txn.id)}
                              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
