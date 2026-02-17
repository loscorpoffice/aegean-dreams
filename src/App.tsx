import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Fintech SaaS Platform
import { AppProvider } from "./store/AppContext";
import { AppLayout } from "./components/fintech/AppLayout";
import LoginPage from "./pages/fintech/LoginPage";
import DashboardPage from "./pages/fintech/DashboardPage";
import TransactionsPage from "./pages/fintech/TransactionsPage";
import TransactionDetailPage from "./pages/fintech/TransactionDetailPage";
import ApprovalsPage from "./pages/fintech/ApprovalsPage";
import SettlementsPage from "./pages/fintech/SettlementsPage";
import EmployeesPage from "./pages/fintech/EmployeesPage";
import BudgetsPage from "./pages/fintech/BudgetsPage";
import ReportsPage from "./pages/fintech/ReportsPage";
import SettingsPage from "./pages/fintech/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected app routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/transactions/:id" element={<TransactionDetailPage />} />
              <Route path="/approvals" element={<ApprovalsPage />} />
              <Route path="/settlements" element={<SettlementsPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/budgets" element={<BudgetsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Redirect root to dashboard (or login if not authenticated) */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
