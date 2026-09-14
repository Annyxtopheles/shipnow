import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Info,
  Check,
  ArrowRight,
  BellOff,
} from 'lucide-react';
import type { AppNotification, NotificationType } from '@/data/notifications';

interface NotificationListProps {
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onToggleRead: (id: string) => void;
}

export function NotificationList({
  notifications,
  onMarkAllRead,
  onToggleRead,
}: NotificationListProps) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');

  const filtered = notifications.filter((n) => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'delay':
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <AlertTriangle size={18} />
          </div>
        );
      case 'customs':
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <ShieldAlert size={18} />
          </div>
        );
      case 'delivery':
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={18} />
          </div>
        );
      case 'system':
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <Info size={18} />
          </div>
        );
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      {/* Header Toolbar */}
      <div className="p-4 sm:p-5 border-b border-surface-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-ink-900">Operations Feed & Alerts</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-100 text-brand-700">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-ink-500 mt-0.5">
            Real-time updates on freight transit, weather hazards, and facility events
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="secondary"
              className="!px-3 !py-1.5 text-xs flex items-center gap-1.5"
              onClick={onMarkAllRead}
            >
              <Check size={13} />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 sm:px-5 py-2.5 bg-surface-muted/40 border-b border-surface-border flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none]">
        {(['All', 'Unread', 'delay', 'customs', 'delivery', 'system'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition capitalize ${
              filter === t
                ? 'bg-ink-900 text-white'
                : 'text-ink-500 hover:bg-surface-muted hover:text-ink-900'
            }`}
          >
            {t === 'delay' ? 'Delays & Weather' : t === 'system' ? 'System & Hubs' : t}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-surface-border">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-ink-400">
            <BellOff size={32} className="mx-auto mb-2 opacity-40" />
            <p className="font-semibold text-sm text-ink-700">No alerts in this category</p>
            <p className="text-xs text-ink-400 mt-0.5">All fleet systems operating normally</p>
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={`p-4 sm:p-5 transition-colors flex items-start gap-3.5 ${
                n.read ? 'bg-white hover:bg-surface-muted/40' : 'bg-brand-50/30 hover:bg-brand-50/50'
              }`}
            >
              {getIcon(n.type)}

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-ink-900 leading-snug">
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-ink-400 shrink-0">
                    {n.timestamp}
                  </span>
                </div>

                <p className="text-xs text-ink-600 mt-1 leading-relaxed">{n.description}</p>

                <div className="mt-3 flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-3">
                    {n.actionLabel && n.actionUrl && (
                      <button
                        type="button"
                        onClick={() => navigate(n.actionUrl!)}
                        className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
                      >
                        <span>{n.actionLabel}</span>
                        <ArrowRight size={12} />
                      </button>
                    )}
                    {n.relatedId && (
                      <span className="font-mono text-[11px] text-ink-400">
                        Ref: {n.relatedId}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleRead(n.id)}
                    className="text-[11px] font-medium text-ink-400 hover:text-ink-700 transition"
                  >
                    {n.read ? 'Mark unread' : 'Mark as read'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
