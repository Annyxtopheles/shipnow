import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { seedCalendarEvents, type CalendarEvent } from '@/data/calendar';
import { CalendarView } from '@/components/calendar/CalendarView';
import { ScheduleEventModal } from '@/components/calendar/ScheduleEventModal';

export function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(seedCalendarEvents);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddEvent = (newEvent: CalendarEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Dispatch Schedule']}
      pageTitle="Logistics Dispatch Calendar"
      mobileTitle="Calendar"
      headerAction={
        <Button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-1.5 !px-4 !py-2.5 text-sm transition active:scale-95"
        >
          <Plus size={16} /> <span className="hidden sm:inline">Schedule Event</span>
        </Button>
      }
    >
      <div className="space-y-6">
        <CalendarView
          events={events}
          onSelectEvent={() => {
            // Can open inspection or filter
          }}
        />
      </div>

      <ScheduleEventModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </DashboardLayout>
  );
}
