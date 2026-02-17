import { useState } from 'react';
import {
  Building2, Users, Shield, Bell, Database, CreditCard,
  ChevronRight, Check,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { formatCurrency } from '../../lib/formatters';
import { MOCK_USERS } from '../../store/mockData';
import { hasPermission } from '../../types';

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-red-100 text-red-700',
  accountant: 'bg-blue-100 text-blue-700',
  manager: 'bg-green-100 text-green-700',
  cash_controller: 'bg-yellow-100 text-yellow-700',
  viewer: 'bg-gray-100 text-gray-600',
};

type SettingsSection = 'business' | 'users' | 'security' | 'notifications' | 'data';

const SECTIONS: { key: SettingsSection; label: string; icon: React.ElementType }[] = [
  { key: 'business', label: 'Business Profile', icon: Building2 },
  { key: 'users', label: 'Users & Permissions', icon: Users },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'data', label: 'Data & Storage', icon: Database },
];

export default function SettingsPage() {
  const { business, currentUser, bankAccounts } = useApp();
  const [section, setSection] = useState<SettingsSection>('business');
  const [saved, setSaved] = useState(false);

  const canManageUsers = currentUser && hasPermission(currentUser.role, 'manage_users');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account and business settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar nav */}
        <div className="lg:w-52 flex-shrink-0">
          <nav className="bg-white rounded-xl border border-slate-200 p-2 space-y-0.5">
            {SECTIONS.map(s => (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  section === s.key
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <s.icon className="w-4 h-4 flex-shrink-0" />
                {s.label}
                {section === s.key && <ChevronRight className="w-3 h-3 ml-auto text-indigo-400" />}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {section === 'business' && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-base font-semibold text-slate-900 mb-4">Business Profile</h2>
              <div className="space-y-4">
                <div>
                  <Label>Business Name</Label>
                  <Input defaultValue={business.name} className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Country</Label>
                    <Input defaultValue={business.country_code} className="mt-1" disabled />
                  </div>
                  <div>
                    <Label>Base Currency</Label>
                    <Input defaultValue={business.base_currency} className="mt-1" disabled />
                  </div>
                </div>
                <div>
                  <Label>GSTIN</Label>
                  <Input defaultValue={business.gstin ?? ''} className="mt-1" placeholder="29ABCDE1234F1Z5" />
                </div>
                <div>
                  <Label>Fiscal Year Start</Label>
                  <Input defaultValue="1st April" className="mt-1" disabled />
                </div>
                <Button
                  className={saved ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}
                  onClick={handleSave}
                >
                  {saved ? (
                    <><Check className="w-4 h-4 mr-2" /> Saved!</>
                  ) : 'Save Changes'}
                </Button>
              </div>
            </div>
          )}

          {section === 'users' && (
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Users & Permissions</h2>
                {canManageUsers && (
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    + Invite User
                  </Button>
                )}
              </div>
              <div className="divide-y divide-slate-100">
                {MOCK_USERS.map(user => (
                  <div key={user.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-700 text-sm flex-shrink-0">
                      {user.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        {user.name}
                        {user.id === currentUser?.id && (
                          <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">You</span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${ROLE_COLORS[user.role]}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                    {canManageUsers && user.id !== currentUser?.id && (
                      <Button size="sm" variant="ghost" className="text-xs">Edit</Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'security' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Security Settings</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Row-Level Security (RLS)', desc: 'Database-level tenant isolation enforced', enabled: true },
                    { label: 'JWT Authentication', desc: 'RS256 signing with 1h expiry', enabled: true },
                    { label: 'Audit Logging', desc: 'All financial mutations logged', enabled: true },
                    { label: 'Two-Factor Authentication', desc: 'TOTP-based 2FA for admin accounts', enabled: false },
                    { label: 'IP Whitelisting', desc: 'Restrict access by IP range', enabled: false },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${item.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                        {item.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === 'notifications' && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-base font-semibold text-slate-900 mb-4">Notification Preferences</h2>
              <div className="space-y-3">
                {[
                  { label: 'Approval Requests', desc: 'When a transaction needs your approval' },
                  { label: 'Approvals Resolved', desc: 'When your submitted transactions are approved/rejected' },
                  { label: 'Advance Due Reminders', desc: 'Weekly reminder for unsettled advances' },
                  { label: 'Budget Alerts', desc: 'When budget utilization exceeds threshold' },
                  { label: 'Task Assignments', desc: 'When a task is assigned to you' },
                ].map((item, i) => (
                  <label key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg cursor-pointer hover:bg-slate-50">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" />
                  </label>
                ))}
              </div>
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSave}>
                {saved ? <><Check className="w-4 h-4 mr-2" />Saved!</> : 'Save Preferences'}
              </Button>
            </div>
          )}

          {section === 'data' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Bank Accounts</h2>
                <div className="space-y-2">
                  {bankAccounts.map(acc => (
                    <div key={acc.id} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg">
                      <CreditCard className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{acc.name}</p>
                        <p className="text-xs text-slate-500">{acc.bank_name} · {acc.account_number_masked}</p>
                      </div>
                      <p className="font-semibold text-sm text-slate-900">{formatCurrency(acc.balance)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Data Retention</h2>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span>Hot storage (queryable)</span>
                    <span className="font-medium">12 months</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span>Warm storage</span>
                    <span className="font-medium">13–36 months</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Cold storage (WORM)</span>
                    <span className="font-medium">37+ months (7yr compliance)</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">Export All Data (JSON)</Button>
                  <Button size="sm" variant="outline">Request Deletion</Button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
