import React, { createContext, useContext, useState, useCallback } from 'react';
import type {
  User, Business, Transaction, AdvanceRequest, SettlementEntry,
  BankAccount, Budget, Employee, DailyTask, AuditLog,
} from '../types';
import {
  MOCK_USERS, MOCK_BUSINESS, MOCK_TRANSACTIONS, MOCK_ADVANCE_REQUESTS,
  MOCK_SETTLEMENTS, MOCK_BANK_ACCOUNTS, MOCK_BUDGETS, MOCK_EMPLOYEES,
  MOCK_DAILY_TASKS, MOCK_AUDIT_LOGS,
} from './mockData';

interface AppState {
  // Auth
  currentUser: User | null;
  business: Business;
  isAuthenticated: boolean;

  // Data
  transactions: Transaction[];
  advanceRequests: AdvanceRequest[];
  settlements: SettlementEntry[];
  bankAccounts: BankAccount[];
  budgets: Budget[];
  employees: Employee[];
  dailyTasks: DailyTask[];
  auditLogs: AuditLog[];
}

interface AppActions {
  login: (email: string, _password: string) => boolean;
  logout: () => void;
  addTransaction: (txn: Omit<Transaction, 'id' | 'created_at' | 'updated_at' | 'version' | 'is_duplicate_flagged'>) => Transaction;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  approveTransaction: (id: string) => void;
  rejectTransaction: (id: string) => void;
  addAdvanceRequest: (req: Omit<AdvanceRequest, 'id' | 'created_at' | 'settled_amount' | 'approval_actions'>) => AdvanceRequest;
  approveAdvanceRequest: (id: string, approverId: string) => void;
  rejectAdvanceRequest: (id: string, approverId: string) => void;
  addSettlement: (settlement: Omit<SettlementEntry, 'id'>) => void;
  updateTask: (id: string, updates: Partial<DailyTask>) => void;
}

type AppContextType = AppState & AppActions;

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [advanceRequests, setAdvanceRequests] = useState<AdvanceRequest[]>(MOCK_ADVANCE_REQUESTS);
  const [settlements, setSettlements] = useState<SettlementEntry[]>(MOCK_SETTLEMENTS);
  const [bankAccounts] = useState<BankAccount[]>(MOCK_BANK_ACCOUNTS);
  const [budgets] = useState<Budget[]>(MOCK_BUDGETS);
  const [employees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(MOCK_DAILY_TASKS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);

  const login = useCallback((email: string, _password: string): boolean => {
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const addTransaction = useCallback((txn: Omit<Transaction, 'id' | 'created_at' | 'updated_at' | 'version' | 'is_duplicate_flagged'>): Transaction => {
    const newTxn: Transaction = {
      ...txn,
      id: `txn-${Date.now()}`,
      is_duplicate_flagged: false,
      version: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTransactions(prev => [newTxn, ...prev]);

    setAuditLogs(prev => [{
      id: `aud-${Date.now()}`,
      business_id: txn.business_id,
      user_id: txn.created_by,
      user_name: txn.created_by_name ?? '',
      action: 'create',
      resource_type: 'transaction',
      resource_id: newTxn.id,
      changes: { after: { amount: txn.amount, status: txn.status } },
      timestamp: new Date().toISOString(),
    }, ...prev]);

    return newTxn;
  }, []);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(t => t.id === id
        ? { ...t, ...updates, version: t.version + 1, updated_at: new Date().toISOString() }
        : t
      )
    );
  }, []);

  const approveTransaction = useCallback((id: string) => {
    if (!currentUser) return;
    updateTransaction(id, {
      status: 'approved',
      approved_by: currentUser.id,
      approved_by_name: currentUser.name,
      approved_at: new Date().toISOString(),
    });
    setAuditLogs(prev => [{
      id: `aud-${Date.now()}`,
      business_id: MOCK_BUSINESS.id,
      user_id: currentUser.id,
      user_name: currentUser.name,
      action: 'approve',
      resource_type: 'transaction',
      resource_id: id,
      changes: { before: { status: 'pending_approval' }, after: { status: 'approved' } },
      timestamp: new Date().toISOString(),
    }, ...prev]);
  }, [currentUser, updateTransaction]);

  const rejectTransaction = useCallback((id: string) => {
    if (!currentUser) return;
    updateTransaction(id, { status: 'rejected' });
    setAuditLogs(prev => [{
      id: `aud-${Date.now()}`,
      business_id: MOCK_BUSINESS.id,
      user_id: currentUser.id,
      user_name: currentUser.name,
      action: 'reject',
      resource_type: 'transaction',
      resource_id: id,
      changes: { before: { status: 'pending_approval' }, after: { status: 'rejected' } },
      timestamp: new Date().toISOString(),
    }, ...prev]);
  }, [currentUser, updateTransaction]);

  const addAdvanceRequest = useCallback((req: Omit<AdvanceRequest, 'id' | 'created_at' | 'settled_amount' | 'approval_actions'>): AdvanceRequest => {
    const newReq: AdvanceRequest = {
      ...req,
      id: `adv-${Date.now()}`,
      settled_amount: 0,
      approval_actions: [],
      created_at: new Date().toISOString(),
    };
    setAdvanceRequests(prev => [newReq, ...prev]);
    return newReq;
  }, []);

  const approveAdvanceRequest = useCallback((id: string, approverId: string) => {
    const approver = MOCK_USERS.find(u => u.id === approverId) ?? currentUser;
    setAdvanceRequests(prev =>
      prev.map(r => r.id === id
        ? {
            ...r,
            status: 'approved' as const,
            approved_amount: r.requested_amount,
            approved_at: new Date().toISOString(),
            approval_actions: [...r.approval_actions, {
              id: `apr-${Date.now()}`,
              request_id: id,
              approver_id: approverId,
              approver_name: approver?.name ?? 'Unknown',
              action: 'approved' as const,
              timestamp: new Date().toISOString(),
            }],
          }
        : r
      )
    );
  }, [currentUser]);

  const rejectAdvanceRequest = useCallback((id: string, approverId: string) => {
    const approver = MOCK_USERS.find(u => u.id === approverId) ?? currentUser;
    setAdvanceRequests(prev =>
      prev.map(r => r.id === id
        ? {
            ...r,
            status: 'rejected' as const,
            approval_actions: [...r.approval_actions, {
              id: `apr-${Date.now()}`,
              request_id: id,
              approver_id: approverId,
              approver_name: approver?.name ?? 'Unknown',
              action: 'rejected' as const,
              timestamp: new Date().toISOString(),
            }],
          }
        : r
      )
    );
  }, [currentUser]);

  const addSettlement = useCallback((settlement: Omit<SettlementEntry, 'id'>) => {
    const newSettlement: SettlementEntry = {
      ...settlement,
      id: `set-${Date.now()}`,
    };
    setSettlements(prev => [...prev, newSettlement]);

    // Update the advance request
    setAdvanceRequests(prev =>
      prev.map(r => {
        if (r.id !== settlement.advance_request_id) return r;
        const newSettled = r.settled_amount + settlement.settlement_amount;
        const newStatus = newSettled >= (r.approved_amount ?? 0)
          ? 'fully_settled' as const
          : 'partially_settled' as const;
        return { ...r, settled_amount: newSettled, status: newStatus };
      })
    );
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<DailyTask>) => {
    setDailyTasks(prev =>
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    );
  }, []);

  return (
    <AppContext.Provider value={{
      currentUser,
      business: MOCK_BUSINESS,
      isAuthenticated: currentUser !== null,
      transactions,
      advanceRequests,
      settlements,
      bankAccounts,
      budgets,
      employees,
      dailyTasks,
      auditLogs,
      login,
      logout,
      addTransaction,
      updateTransaction,
      approveTransaction,
      rejectTransaction,
      addAdvanceRequest,
      approveAdvanceRequest,
      rejectAdvanceRequest,
      addSettlement,
      updateTask,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
