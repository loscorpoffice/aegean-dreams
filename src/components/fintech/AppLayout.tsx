import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useApp } from '../../store/AppContext';
import { Bell, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useApp as useAppHook } from '../../store/AppContext';

function TopBar() {
  const { business, transactions } = useAppHook();
  const pendingCount = transactions.filter(t => t.status === 'pending_approval').length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center gap-4">
      <div className="flex-1 max-w-md ml-12 lg:ml-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search transactions, vendors..."
            className="pl-9 h-9 text-sm bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <span className="hidden sm:inline text-xs text-slate-500 font-medium">
          {business.name}
        </span>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}

export function AppLayout() {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
