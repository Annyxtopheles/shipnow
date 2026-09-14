import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { seedNotifications, type AppNotification } from '@/data/notifications';
import { NotificationList } from '@/components/notifications/NotificationList';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>(seedNotifications);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Notifications']}
      pageTitle="Operations Alerts & Notifications"
      mobileTitle="Notifications"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <NotificationList
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onToggleRead={handleToggleRead}
        />
      </div>
    </DashboardLayout>
  );
}
