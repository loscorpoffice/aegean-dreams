// ============================================================
// Core Domain Types - Fintech SaaS Platform
// ============================================================

export type UUID = string;

// ── Users & Auth ──────────────────────────────────────────

export type Role =
  | 'admin'
  | 'accountant'
  | 'manager'
  | 'cash_controller'
  | 'viewer';

export interface User {
  id: UUID;
  business_id: UUID;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  business: Business | null;
  isAuthenticated: boolean;
}

// ── Business / Tenant ─────────────────────────────────────

export type CountryCode = 'IN' | 'US' | 'UK' | 'AU';
export type TaxRegime = 'GST' | 'VAT' | 'Sales_Tax';
export type Currency = 'INR' | 'USD' | 'GBP' | 'AUD';

export interface Business {
  id: UUID;
  name: string;
  country_code: CountryCode;
  base_currency: Currency;
  tax_regime: TaxRegime;
  fiscal_year_start: string; // 'MM-DD'
  gstin?: string;
  logo?: string;
  created_at: string;
}

// ── Categories & Vendors ──────────────────────────────────

export interface Category {
  id: UUID;
  business_id: UUID;
  name: string;
  type: 'expense' | 'income' | 'both';
  color: string;
  icon: string;
}

export interface Vendor {
  id: UUID;
  business_id: UUID;
  name: string;
  email?: string;
  phone?: string;
  gstin?: string;
  address?: string;
}

// ── Transactions ──────────────────────────────────────────

export type TransactionStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'rejected'
  | 'posted';

export type TransactionType = 'expense' | 'income' | 'transfer' | 'advance';
export type PaymentMode = 'cash' | 'bank_transfer' | 'card' | 'upi' | 'cheque';

export interface Transaction {
  id: UUID;
  business_id: UUID;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: Currency;
  transaction_date: string;
  description: string;
  vendor_id?: UUID;
  vendor_name?: string;
  category_id?: UUID;
  category_name?: string;
  payment_mode: PaymentMode;
  invoice_number?: string;
  tax_amount?: number;
  tax_rate?: number;
  created_by: UUID;
  created_by_name?: string;
  approved_by?: UUID;
  approved_by_name?: string;
  approved_at?: string;
  is_duplicate_flagged: boolean;
  version: number;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
}

// ── Approval Workflow ─────────────────────────────────────

export type ApprovalAction = 'approved' | 'rejected' | 'delegated';

export interface ApprovalActionLog {
  id: UUID;
  request_id: UUID;
  approver_id: UUID;
  approver_name: string;
  action: ApprovalAction;
  comment?: string;
  timestamp: string;
}

export interface ApprovalChainStep {
  order: number;
  approvers: { type: 'role' | 'user'; value: string }[];
  parallel: boolean;
  timeout_hours: number;
}

export interface ApprovalChain {
  id: UUID;
  business_id: UUID;
  name: string;
  trigger_conditions: {
    amount_min?: number;
    amount_max?: number;
    categories?: UUID[];
    transaction_types?: TransactionType[];
  };
  steps: ApprovalChainStep[];
  is_active: boolean;
}

// ── Advance Requests & Settlements ───────────────────────

export type AdvanceStatus =
  | 'pending_approval'
  | 'approved'
  | 'rejected'
  | 'partially_settled'
  | 'fully_settled';

export interface AdvanceRequest {
  id: UUID;
  business_id: UUID;
  employee_id?: UUID;
  user_id: UUID;
  user_name: string;
  requested_amount: number;
  approved_amount?: number;
  settled_amount: number;
  purpose: string;
  status: AdvanceStatus;
  required_approvers: UUID[];
  approval_actions: ApprovalActionLog[];
  created_at: string;
  approved_at?: string;
  due_date?: string;
}

export interface SettlementEntry {
  id: UUID;
  advance_request_id: UUID;
  settlement_amount: number;
  settlement_date: string;
  remaining_balance: number;
  notes?: string;
  created_by: UUID;
}

// ── Bank Accounts & Cash ──────────────────────────────────

export type AccountType = 'bank' | 'petty_cash' | 'credit_card';

export interface BankAccount {
  id: UUID;
  business_id: UUID;
  name: string;
  account_number_masked: string;
  bank_name: string;
  type: AccountType;
  balance: number;
  currency: Currency;
  last_synced?: string;
  is_active: boolean;
}

// ── Budget ────────────────────────────────────────────────

export interface Budget {
  id: UUID;
  business_id: UUID;
  name: string;
  category_id: UUID;
  category_name?: string;
  department?: string;
  amount: number;
  period_start: string;
  period_end: string;
  alert_threshold: number; // 0-100 (%)
  spent?: number;
  remaining?: number;
  utilization_pct?: number;
}

// ── Employees ─────────────────────────────────────────────

export interface Employee {
  id: UUID;
  business_id: UUID;
  employee_code: string;
  name: string;
  mobile: string;
  department?: string;
  designation?: string;
  is_active: boolean;
  created_at: string;
}

export type TaskStatus =
  | 'pending'
  | 'in_progress'
  | 'verification_pending'
  | 'completed'
  | 'rejected';

export interface ChecklistItem {
  id: string;
  text: string;
  is_mandatory: boolean;
}

export interface TaskTemplate {
  id: UUID;
  business_id: UUID;
  title: string;
  description: string;
  category: string;
  estimated_minutes: number;
  checklist_items: ChecklistItem[];
  verification_required: boolean;
}

export interface DailyTask {
  id: UUID;
  business_id: UUID;
  template_id: UUID;
  template?: TaskTemplate;
  assigned_to: UUID;
  assigned_to_name?: string;
  assigned_by: UUID;
  assigned_by_name?: string;
  assigned_date: string;
  due_date: string;
  status: TaskStatus;
  started_at?: string;
  completed_at?: string;
  verified_at?: string;
  verified_by?: UUID;
  rejection_reason?: string;
}

// ── Audit Logs ────────────────────────────────────────────

export type AuditAction = 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'login' | 'export';

export interface AuditLog {
  id: UUID;
  business_id: UUID;
  user_id: UUID;
  user_name: string;
  action: AuditAction;
  resource_type: string;
  resource_id: UUID;
  changes?: { before?: unknown; after?: unknown };
  ip_address?: string;
  timestamp: string;
}

// ── Dashboard Metrics ─────────────────────────────────────

export interface DashboardMetrics {
  cash_position: number;
  cash_position_change: number;
  pending_approvals_count: number;
  pending_approvals_amount: number;
  unverified_expenses_count: number;
  advance_due_amount: number;
  bank_recon_pending: number;
  expense_trend: { month: string; amount: number }[];
  cash_flow: { month: string; inflow: number; outflow: number }[];
  top_categories: { name: string; amount: number; color: string }[];
  recent_transactions: Transaction[];
}

// ── Export Jobs ───────────────────────────────────────────

export type ExportStatus = 'queued' | 'processing' | 'completed' | 'failed';
export type ExportFormat = 'csv' | 'excel' | 'pdf';

export interface ExportJob {
  id: UUID;
  business_id: UUID;
  format: ExportFormat;
  filters: Record<string, unknown>;
  status: ExportStatus;
  file_url?: string;
  created_by: UUID;
  created_at: string;
  completed_at?: string;
}

// ── Permission Matrix ─────────────────────────────────────

export type Permission =
  | 'view_all_transactions'
  | 'create_expense'
  | 'create_sales'
  | 'approve_expenses'
  | 'manage_bank_accounts'
  | 'manage_users'
  | 'export_reports'
  | 'access_audit_logs'
  | 'manage_categories'
  | 'manage_budgets'
  | 'manage_employees';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'view_all_transactions',
    'create_expense',
    'create_sales',
    'approve_expenses',
    'manage_bank_accounts',
    'manage_users',
    'export_reports',
    'access_audit_logs',
    'manage_categories',
    'manage_budgets',
    'manage_employees',
  ],
  accountant: [
    'view_all_transactions',
    'create_expense',
    'create_sales',
    'approve_expenses',
    'manage_bank_accounts',
    'export_reports',
    'access_audit_logs',
    'manage_categories',
    'manage_budgets',
  ],
  manager: [
    'view_all_transactions',
    'create_expense',
    'create_sales',
    'approve_expenses',
    'export_reports',
    'manage_employees',
  ],
  cash_controller: [
    'view_all_transactions',
    'create_expense',
    'manage_bank_accounts',
  ],
  viewer: ['view_all_transactions'],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
