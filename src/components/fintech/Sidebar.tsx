import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ArrowLeftRight, CheckSquare, Wallet, Users,
  Building2, BarChart3, Settings, LogOut, ChevronRight,
  ShieldCheck, Menu, X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useApp } from '../../store/AppContext';
import { hasPermission } from '../../types';
import { Button } from '../ui/button';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: null },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight, permission: 'view_all_transactions' as const },
  { path: '/approvals', label: 'Approvals', icon: CheckSquare, permission: 'approve_expenses' as const },
  { path: '/settlements', label: 'Advances & Settlements', icon: Wallet, permission: null },
  { path: '/employees', label: 'Employees', icon: Users, permission: 'manage_employees' as const },
  { path: '/budgets', label: 'Budgets', icon: BarChart3, permission: null },
  { path: '/reports', label: 'Reports & Audit', icon: ShieldCheck, permission: 'access_audit_logs' as const },
  { path: '/settings', label: 'Settings', icon: Settings, permission: null },
];

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-red-100 text-red-700',
  accountant: 'bg-blue-100 text-blue-700',
  manager: 'bg-green-100 text-green-700',
  cash_controller: 'bg-yellow-100 text-yellow-700',
  viewer: 'bg-gray-100 text-gray-700',
};

export function Sidebar() {
  const location = useLocation();
  const { currentUser, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleItems = NAV_ITEMS.filter(item =>
    !item.permission || (currentUser && hasPermission(currentUser.role, item.permission))
  );

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm leading-tight">FinFlow</p>
          <p className="text-xs text-slate-500">SaaS Platform</p>
        </div>
      </div>

      {/* User info */}
      {currentUser && (
        <div className="px-4 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-700 text-sm">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{currentUser.name}</p>
              <span className={cn('text-xs px-1.5 py-0.5 rounded font-medium', ROLE_COLORS[currentUser.role])}>
                {currentUser.role.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {visibleItems.map(item => {
          const active = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
                active
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <item.icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600')} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3 h-3 text-indigo-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(v => !v)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-200 lg:hidden',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
}
