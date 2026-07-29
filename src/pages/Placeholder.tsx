import { DashboardLayout } from '@/layouts/DashboardLayout';

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <DashboardLayout pageTitle={title}>
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-surface-border text-sm text-ink-500">
        {title} screen coming soon
      </div>
    </DashboardLayout>
  );
}
