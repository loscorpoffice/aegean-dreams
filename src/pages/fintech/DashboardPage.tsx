import { useNavigate } from 'react-router-dom';
import {
  IndianRupee, Clock, AlertTriangle, Wallet, CheckSquare,
  TrendingUp, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend,
} from 'recharts';
import { useApp } from '../../store/AppContext';
import { MetricCard } from '../../components/fintech/MetricCard';
import { StatusBadge } from '../../components/fintech/StatusBadge';
import { MOCK_DASHBOARD_METRICS } from '../../store/mockData';
import { formatCurrency } from '../../lib/formatters';

function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      {action && (
        <button onClick={onAction} className="text-xs text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
          {action} →
        </button>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { transactions, advanceRequests, bankAccounts, currentUser } = useApp();
  const metrics = MOCK_DASHBOARD_METRICS;

  const pendingApprovals = transactions.filter(t => t.status === 'pending_approval');
  const totalBalance = bankAccounts.reduce((sum, a) => sum + a.balance, 0);
  const pendingAdvances = advanceRequests.filter(r => r.status === 'partially_settled' || r.status === 'approved');
  const pendingAdvanceAmount = pendingAdvances.reduce((sum, a) => sum + ((a.approved_amount ?? 0) - a.settled_amount), 0);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">
          Good morning, {currentUser?.name.split(' ')[0]}
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">Here's your financial overview for today</p>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Cash Position"
          value={formatCurrency(totalBalance)}
          change={metrics.cash_position_change}
          changeLabel="this month"
          icon={IndianRupee}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          onClick={() => navigate('/settings')}
        />
        <MetricCard
          label="Pending Approvals"
          value={pendingApprovals.length}
          subValue={`${formatCurrency(pendingApprovals.reduce((s, t) => s + t.amount, 0))} total`}
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          onClick={() => navigate('/approvals')}
        />
        <MetricCard
          label="Advances Due"
          value={formatCurrency(pendingAdvanceAmount)}
          subValue={`${pendingAdvances.length} open advance(s)`}
          icon={Wallet}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          onClick={() => navigate('/settlements')}
        />
        <MetricCard
          label="Unverified Expenses"
          value={metrics.unverified_expenses_count}
          subValue="Require verification"
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBg="bg-red-50"
          onClick={() => navigate('/transactions')}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Cash flow */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <SectionTitle title="Cash Flow (4 Months)" action="Full Report" onAction={() => navigate('/reports')} />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={metrics.cash_flow} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="inflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="outflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                formatter={(value: number, name: string) => [formatCurrency(value), name === 'inflow' ? 'Inflow' : 'Outflow']}
                contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="inflow" stroke="#22c55e" strokeWidth={2} fill="url(#inflow)" />
              <Area type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={2} fill="url(#outflow)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top categories */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <SectionTitle title="Expense by Category" />
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={metrics.top_categories}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                strokeWidth={2}
              >
                {metrics.top_categories.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), 'Amount']}
                contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense trend + Recent transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Expense trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <SectionTitle title="Expense Trend" />
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={metrics.expense_trend} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), 'Expenses']}
                contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <SectionTitle title="Recent Transactions" action="View All" onAction={() => navigate('/transactions')} />
          <div className="space-y-2">
            {metrics.recent_transactions.map(txn => (
              <div
                key={txn.id}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/transactions/${txn.id}`)}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${txn.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  {txn.type === 'income'
                    ? <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    : <ArrowDownRight className="w-4 h-4 text-red-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{txn.description}</p>
                  <p className="text-xs text-slate-500">{txn.vendor_name ?? txn.category_name} &bull; {txn.transaction_date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-semibold ${txn.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                  </p>
                  <StatusBadge status={txn.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bank accounts */}
      <div className="mt-4 bg-white rounded-xl border border-slate-200 p-5">
        <SectionTitle title="Bank Accounts & Cash" action="Manage" onAction={() => navigate('/settings')} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {bankAccounts.map(acc => (
            <div key={acc.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                <IndianRupee className="w-4 h-4 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-700 truncate">{acc.name}</p>
                <p className="text-sm font-bold text-slate-900">{formatCurrency(acc.balance)}</p>
              </div>
              {acc.type === 'petty_cash' && (
                <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-medium">Cash</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-5">
        <SectionTitle title="Quick Actions" />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/transactions?new=expense')}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-indigo-300 transition-colors shadow-sm"
          >
            + New Expense
          </button>
          <button
            onClick={() => navigate('/transactions?new=income')}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-indigo-300 transition-colors shadow-sm"
          >
            + Record Income
          </button>
          <button
            onClick={() => navigate('/settlements?new=true')}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-indigo-300 transition-colors shadow-sm"
          >
            + Request Advance
          </button>
          <button
            onClick={() => navigate('/approvals')}
            className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <CheckSquare className="w-4 h-4" />
            Review Approvals
            {pendingApprovals.length > 0 && (
              <span className="bg-white text-indigo-700 text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                {pendingApprovals.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
