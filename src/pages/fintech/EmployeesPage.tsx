import { useState } from 'react';
import {
  Users, CheckCircle, Clock, XCircle, Eye, PlayCircle,
  StopCircle, AlertCircle,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { StatusBadge } from '../../components/fintech/StatusBadge';
import { Button } from '../../components/ui/button';
import { formatDateTime } from '../../lib/formatters';
import type { DailyTask } from '../../types';

type EmployeeTabKey = 'employees' | 'tasks';

function TaskCard({
  task,
  onStart,
  onComplete,
  onApprove,
  onReject,
  canVerify,
}: {
  task: DailyTask;
  onStart: () => void;
  onComplete: () => void;
  onApprove: () => void;
  onReject: () => void;
  canVerify: boolean;
}) {
  const [showChecklist, setShowChecklist] = useState(false);

  const statusIcon = {
    pending: <Clock className="w-4 h-4 text-slate-400" />,
    in_progress: <PlayCircle className="w-4 h-4 text-blue-500" />,
    verification_pending: <AlertCircle className="w-4 h-4 text-orange-500" />,
    completed: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    rejected: <XCircle className="w-4 h-4 text-red-500" />,
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{statusIcon[task.status]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-900">{task.template?.title ?? 'Task'}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Assigned to: <span className="font-medium text-slate-700">{task.assigned_to_name}</span>
                {' '}&bull; Due: {task.due_date}
              </p>
            </div>
            <StatusBadge status={task.status} />
          </div>

          {task.template?.description && (
            <p className="text-sm text-slate-600 mt-1">{task.template.description}</p>
          )}

          {task.template?.checklist_items && task.template.checklist_items.length > 0 && (
            <button
              onClick={() => setShowChecklist(v => !v)}
              className="text-xs text-indigo-600 hover:text-indigo-800 mt-1 flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              {showChecklist ? 'Hide' : 'View'} checklist ({task.template.checklist_items.length} items)
            </button>
          )}

          {showChecklist && task.template?.checklist_items && (
            <div className="mt-2 space-y-1 p-3 bg-slate-50 rounded-lg">
              {task.template.checklist_items.map(item => (
                <div key={item.id} className="flex items-center gap-2 text-xs">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                    task.status === 'completed' || task.status === 'verification_pending'
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-300'
                  }`}>
                    {(task.status === 'completed' || task.status === 'verification_pending') && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-slate-700">{item.text}</span>
                  {item.is_mandatory && (
                    <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">Required</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {(task.started_at || task.completed_at) && (
            <div className="mt-2 flex gap-3 text-xs text-slate-400">
              {task.started_at && <span>Started: {formatDateTime(task.started_at)}</span>}
              {task.completed_at && <span>Completed: {formatDateTime(task.completed_at)}</span>}
            </div>
          )}

          {task.rejection_reason && (
            <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded text-xs text-red-700">
              Rejected: {task.rejection_reason}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            {task.status === 'pending' && (
              <Button size="sm" variant="outline" className="gap-1.5 text-xs h-7" onClick={onStart}>
                <PlayCircle className="w-3.5 h-3.5" />
                Start Task
              </Button>
            )}
            {task.status === 'in_progress' && (
              <Button size="sm" variant="outline" className="gap-1.5 text-xs h-7" onClick={onComplete}>
                <StopCircle className="w-3.5 h-3.5" />
                Submit for Review
              </Button>
            )}
            {task.status === 'verification_pending' && canVerify && (
              <>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 text-xs h-7"
                  onClick={onApprove}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 gap-1.5 text-xs h-7"
                  onClick={onReject}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmployeesPage() {
  const { employees, dailyTasks, updateTask, currentUser } = useApp();
  const [tab, setTab] = useState<EmployeeTabKey>('tasks');
  const [taskFilter, setTaskFilter] = useState('all');

  const canVerify = currentUser?.role === 'admin' || currentUser?.role === 'manager';

  const filteredTasks = dailyTasks.filter(t =>
    taskFilter === 'all' || t.status === taskFilter
  );

  const taskStats = {
    total: dailyTasks.length,
    pending: dailyTasks.filter(t => t.status === 'pending').length,
    in_progress: dailyTasks.filter(t => t.status === 'in_progress').length,
    review: dailyTasks.filter(t => t.status === 'verification_pending').length,
    completed: dailyTasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Employees</h1>
        <p className="text-slate-500 text-sm">{employees.length} active employees</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 bg-white rounded-xl border border-slate-200 p-1 w-fit">
        {([
          { key: 'tasks', label: 'Daily Tasks' },
          { key: 'employees', label: 'Employee List' },
        ] as { key: EmployeeTabKey; label: string }[]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tasks tab */}
      {tab === 'tasks' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Pending', value: taskStats.pending, color: 'text-slate-600' },
              { label: 'In Progress', value: taskStats.in_progress, color: 'text-blue-600' },
              { label: 'Review', value: taskStats.review, color: 'text-orange-600' },
              { label: 'Completed', value: taskStats.completed, color: 'text-emerald-600' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="flex gap-1 mb-4">
            {['all', 'pending', 'in_progress', 'verification_pending', 'completed', 'rejected'].map(f => (
              <button
                key={f}
                onClick={() => setTaskFilter(f)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  taskFilter === f ? 'bg-indigo-100 text-indigo-700' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f === 'all' ? 'All' : f.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-400">
                No tasks found
              </div>
            ) : (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  canVerify={canVerify}
                  onStart={() => updateTask(task.id, {
                    status: 'in_progress',
                    started_at: new Date().toISOString(),
                  })}
                  onComplete={() => updateTask(task.id, {
                    status: 'verification_pending',
                    completed_at: new Date().toISOString(),
                  })}
                  onApprove={() => updateTask(task.id, {
                    status: 'completed',
                    verified_at: new Date().toISOString(),
                    verified_by: currentUser?.id,
                  })}
                  onReject={() => updateTask(task.id, {
                    status: 'rejected',
                    rejection_reason: 'Does not meet quality standards',
                  })}
                />
              ))
            )}
          </div>
        </>
      )}

      {/* Employees tab */}
      {tab === 'employees' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Employee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Code</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Designation</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Mobile</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map(emp => {
                const empTasks = dailyTasks.filter(t => t.assigned_to === emp.id);
                const completedTasks = empTasks.filter(t => t.status === 'completed').length;
                const completionRate = empTasks.length > 0
                  ? Math.round((completedTasks / empTasks.length) * 100)
                  : null;

                return (
                  <tr key={emp.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs flex-shrink-0">
                          {emp.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <p className="font-medium text-slate-900">{emp.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{emp.employee_code}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{emp.department ?? '—'}</td>
                    <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{emp.designation ?? '—'}</td>
                    <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{emp.mobile}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${emp.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                          {emp.is_active ? 'Active' : 'Inactive'}
                        </span>
                        {completionRate !== null && (
                          <span className="text-[10px] text-slate-400">{completionRate}% tasks done</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
