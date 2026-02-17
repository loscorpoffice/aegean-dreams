import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Wallet, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { StatusBadge } from '../../components/fintech/StatusBadge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { formatCurrency, formatDate } from '../../lib/formatters';

function NewAdvanceDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addAdvanceRequest, currentUser, business } = useApp();
  const [form, setForm] = useState({ amount: '', purpose: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    addAdvanceRequest({
      business_id: business.id,
      user_id: currentUser.id,
      user_name: currentUser.name,
      requested_amount: parseFloat(form.amount),
      purpose: form.purpose,
      status: 'pending_approval',
      required_approvers: [],
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Advance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Amount (INR) *</Label>
            <Input
              type="number"
              placeholder="0"
              min="1"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label>Purpose *</Label>
            <Input
              placeholder="Describe the purpose of this advance"
              value={form.purpose}
              onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
              className="mt-1"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SettlementDialog({
  advanceId,
  maxAmount,
  open,
  onClose,
}: {
  advanceId: string;
  maxAmount: number;
  open: boolean;
  onClose: () => void;
}) {
  const { addSettlement, currentUser } = useApp();
  const [form, setForm] = useState({ amount: '', notes: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (amount > maxAmount) return;
    addSettlement({
      advance_request_id: advanceId,
      settlement_amount: amount,
      settlement_date: new Date().toISOString().split('T')[0],
      remaining_balance: maxAmount - amount,
      notes: form.notes,
      created_by: currentUser?.id ?? '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Settlement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-slate-50 rounded-lg text-sm">
            <span className="text-slate-600">Outstanding balance: </span>
            <span className="font-bold text-slate-900">{formatCurrency(maxAmount)}</span>
          </div>
          <div>
            <Label>Settlement Amount (INR) *</Label>
            <Input
              type="number"
              placeholder="0"
              min="1"
              max={maxAmount}
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              className="mt-1"
              required
            />
            {parseFloat(form.amount) > maxAmount && (
              <p className="text-xs text-red-500 mt-1">Cannot exceed outstanding balance</p>
            )}
          </div>
          <div>
            <Label>Notes</Label>
            <Input
              placeholder="Optional notes"
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              className="mt-1"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={parseFloat(form.amount) > maxAmount}
            >
              Record Settlement
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function SettlementsPage() {
  const [searchParams] = useSearchParams();
  const { advanceRequests, settlements } = useApp();
  const [showNew, setShowNew] = useState(searchParams.get('new') === 'true');
  const [settlingAdvanceId, setSettlingAdvanceId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = advanceRequests.filter(r =>
    statusFilter === 'all' || r.status === statusFilter
  );

  const settlingAdvance = advanceRequests.find(r => r.id === settlingAdvanceId);
  const outstanding = settlingAdvance
    ? (settlingAdvance.approved_amount ?? 0) - settlingAdvance.settled_amount
    : 0;

  const totalApproved = advanceRequests
    .filter(r => r.approved_amount !== undefined)
    .reduce((s, r) => s + (r.approved_amount ?? 0), 0);

  const totalSettled = advanceRequests.reduce((s, r) => s + r.settled_amount, 0);
  const totalOutstanding = totalApproved - totalSettled;

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <NewAdvanceDialog open={showNew} onClose={() => setShowNew(false)} />
      {settlingAdvanceId && settlingAdvance && (
        <SettlementDialog
          advanceId={settlingAdvanceId}
          maxAmount={outstanding}
          open={true}
          onClose={() => setSettlingAdvanceId(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Advances & Settlements</h1>
          <p className="text-slate-500 text-sm">{advanceRequests.length} total advance requests</p>
        </div>
        <Button
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
          onClick={() => setShowNew(true)}
        >
          <Plus className="w-4 h-4" />
          Request Advance
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <Wallet className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <p className="text-xs text-slate-500">Total Disbursed</p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(totalApproved)}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <p className="text-xs text-slate-500">Total Settled</p>
          <p className="text-lg font-bold text-emerald-600">{formatCurrency(totalSettled)}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <AlertTriangle className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <p className="text-xs text-slate-500">Outstanding</p>
          <p className="text-lg font-bold text-amber-600">{formatCurrency(totalOutstanding)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44 h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="pending_approval">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="partially_settled">Part. Settled</SelectItem>
            <SelectItem value="fully_settled">Settled</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Advance requests */}
      <div className="space-y-4">
        {filtered.map(req => {
          const reqSettlements = settlements.filter(s => s.advance_request_id === req.id);
          const outstanding = (req.approved_amount ?? req.requested_amount) - req.settled_amount;
          const pct = req.approved_amount
            ? Math.min(100, (req.settled_amount / req.approved_amount) * 100)
            : 0;

          return (
            <div key={req.id} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-slate-900">{req.purpose}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {req.user_name} &bull; {formatDate(req.created_at)}
                    {req.due_date && ` · Due: ${formatDate(req.due_date)}`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-lg font-bold text-slate-900">{formatCurrency(req.requested_amount)}</span>
                  <StatusBadge status={req.status} />
                </div>
              </div>

              {req.approved_amount !== undefined && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Settled: {formatCurrency(req.settled_amount)}</span>
                    <span>Remaining: {formatCurrency(outstanding)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${pct >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{pct.toFixed(0)}% settled</p>
                </div>
              )}

              {/* Settlement history */}
              {reqSettlements.length > 0 && (
                <div className="border-t border-slate-100 pt-3 mb-3">
                  <p className="text-xs font-medium text-slate-500 mb-2">Settlement History</p>
                  <div className="space-y-1.5">
                    {reqSettlements.map(s => (
                      <div key={s.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          <span className="text-slate-600">{formatDate(s.settlement_date)}</span>
                          {s.notes && <span className="text-slate-400 italic">— {s.notes}</span>}
                        </div>
                        <span className="font-semibold text-emerald-600">{formatCurrency(s.settlement_amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              {(req.status === 'approved' || req.status === 'partially_settled') && outstanding > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => setSettlingAdvanceId(req.id)}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Settlement
                </Button>
              )}

              {req.status === 'pending_approval' && (
                <div className="flex items-center gap-2 text-xs text-amber-600">
                  <Clock className="w-3.5 h-3.5" />
                  Waiting for approval from {req.required_approvers.length > 0 ? `${req.required_approvers.length} approver(s)` : 'manager'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
