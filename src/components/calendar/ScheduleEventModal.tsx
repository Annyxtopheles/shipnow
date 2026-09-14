import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { CalendarEvent, CalendarEventType, CalendarEventStatus } from '@/data/calendar';

interface ScheduleEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: CalendarEvent) => void;
}

export function ScheduleEventModal({ isOpen, onClose, onAddEvent }: ScheduleEventModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CalendarEventType>('Pickup');
  const [date, setDate] = useState('2026-09-17');
  const [time, setTime] = useState('09:00 AM');
  const [location, setLocation] = useState('Chicago Hub ORD-02');
  const [relatedId, setRelatedId] = useState('#SH9482710');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    const newEvent: CalendarEvent = {
      id: `EV-${Math.floor(100 + Math.random() * 900)}`,
      title,
      type,
      date,
      time,
      location,
      relatedId: relatedId.trim() || '#SH-NEW',
      status: 'Scheduled' as CalendarEventStatus,
      description: description.trim() || undefined,
    };

    setSuccess(true);
    setTimeout(() => {
      onAddEvent(newEvent);
      setSuccess(false);
      setTitle('');
      setDescription('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div>
            <h2 className="text-base font-bold text-ink-900">Schedule Logistics Event</h2>
            <p className="text-xs text-ink-500">Plan pickups, deliveries, customs checkpoints, or maintenance</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-ink-500 hover:bg-surface-muted hover:text-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check size={24} />
            </div>
            <p className="mt-3 font-bold text-ink-900">Event Scheduled!</p>
            <p className="text-xs text-ink-500 mt-1">Calendar timetable and dispatch alerts updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div>
              <label className="mb-1 block font-semibold text-ink-700">Event Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Express Electronics Depot Transfer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Event Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as CalendarEventType)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  <option value="Pickup">Pickup</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Customs">Customs</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Scheduled Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Scheduled Time</label>
                <input
                  type="text"
                  placeholder="e.g. 10:30 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Related ID (Shipment / Unit)</label>
                <input
                  type="text"
                  placeholder="e.g. #SH9482710"
                  value={relatedId}
                  onChange={(e) => setRelatedId(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-semibold text-ink-700">Location / Terminal</label>
              <input
                type="text"
                required
                placeholder="e.g. Port of Long Beach / LAX-01"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-ink-700">Operational Notes</label>
              <textarea
                rows={2}
                placeholder="Details, cargo manifests, special handling..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-3 border-t border-surface-border pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-surface-border px-4 py-2 font-semibold text-ink-700 hover:bg-surface-muted text-xs"
              >
                Cancel
              </button>
              <Button type="submit" className="!px-5 !py-2 text-xs">
                Confirm & Add Event
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
