import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ChevronLeft, ChevronRight, Clock, MapPin, Tag } from 'lucide-react';
import type { CalendarEvent, CalendarEventType } from '@/data/calendar';

interface CalendarViewProps {
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarView({ events, onSelectEvent }: CalendarViewProps) {
  // Fixed to Sep 2026 for consistent seed view, with navigation
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 8 = September (0-indexed)
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-14');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // Days in month calculation
  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((e) => (typeFilter === 'All' ? true : e.type === typeFilter));
  }, [events, typeFilter]);

  const getEventsForDay = (day: number) => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter((e) => e.date === formattedDate);
  };

  const selectedDateEvents = useMemo(() => {
    return filteredEvents.filter((e) => e.date === selectedDate);
  }, [filteredEvents, selectedDate]);

  const getEventTypeTone = (type: CalendarEventType) => {
    switch (type) {
      case 'Pickup':
        return 'purple';
      case 'Delivery':
        return 'green';
      case 'Customs':
        return 'red';
      case 'Maintenance':
        return 'yellow';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Main Calendar Grid (8 cols) */}
      <Card className="lg:col-span-8 p-0 overflow-hidden">
        {/* Navigation Toolbar */}
        <div className="p-4 sm:p-5 border-b border-surface-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-ink-900">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h3>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded-lg text-ink-600 hover:bg-surface-muted transition"
                title="Previous Month"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded-lg text-ink-600 hover:bg-surface-muted transition"
                title="Next Month"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentYear(2026);
                setCurrentMonth(8);
                setSelectedDate('2026-09-14');
              }}
              className="text-xs font-semibold text-brand-600 hover:underline px-2"
            >
              Today
            </button>
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none]">
            {(['All', 'Pickup', 'Delivery', 'Customs', 'Maintenance'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  typeFilter === t
                    ? 'bg-ink-900 text-white'
                    : 'text-ink-500 hover:bg-surface-muted hover:text-ink-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-surface-border bg-surface-muted/60 text-center text-xs font-semibold text-ink-500 py-2.5">
          {DAYS_OF_WEEK.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Month Day Cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-surface-border">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-24 bg-surface-muted/20 p-2 opacity-30" />
          ))}

          {/* Month days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const dayEvents = getEventsForDay(dayNum);
            const isSelected = selectedDate === dateStr;
            const isToday = dateStr === '2026-09-14';

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`min-h-24 p-2 cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                  isSelected ? 'bg-brand-50/50 ring-2 ring-inset ring-brand-500' : 'hover:bg-surface-muted/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      isToday
                        ? 'bg-brand-500 text-white shadow-xs'
                        : isSelected
                        ? 'bg-ink-900 text-white'
                        : 'text-ink-700'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-[10px] font-bold text-ink-400 font-mono">
                      {dayEvents.length}
                    </span>
                  )}
                </div>

                {/* Event Pills */}
                <div className="mt-1 space-y-1 overflow-hidden">
                  {dayEvents.slice(0, 2).map((ev) => (
                    <div
                      key={ev.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(ev);
                      }}
                      className="truncate px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white border border-surface-border hover:border-brand-500 shadow-2xs transition"
                      title={ev.title}
                    >
                      <span className="text-ink-900">{ev.title}</span>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <p className="text-[9px] font-semibold text-brand-600 px-1">
                      +{dayEvents.length - 2} more
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Selected Date Detail Sidebar (4 cols) */}
      <Card className="lg:col-span-4 p-5 space-y-4">
        <div className="pb-3 border-b border-surface-border">
          <p className="text-xs font-medium text-ink-500">Selected Schedule Date</p>
          <h4 className="text-base font-bold text-ink-900 mt-0.5">
            {new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </h4>
          <p className="text-xs text-brand-600 font-semibold mt-1">
            {selectedDateEvents.length} operations scheduled
          </p>
        </div>

        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {selectedDateEvents.length === 0 ? (
            <div className="py-12 text-center text-ink-400">
              <Clock size={28} className="mx-auto mb-2 opacity-40" />
              <p className="text-xs font-medium text-ink-600">No events for this date</p>
              <p className="text-[11px] text-ink-400 mt-0.5">Click "Schedule Event" above to create one</p>
            </div>
          ) : (
            selectedDateEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => onSelectEvent(ev)}
                className="p-3.5 rounded-xl border border-surface-border hover:border-brand-400 bg-surface-muted/30 cursor-pointer transition space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <Badge tone={getEventTypeTone(ev.type)}>{ev.type}</Badge>
                  <span className="text-[11px] font-semibold text-ink-500 flex items-center gap-1">
                    <Clock size={11} />
                    {ev.time}
                  </span>
                </div>

                <h5 className="text-xs font-bold text-ink-900 leading-snug">{ev.title}</h5>

                <div className="flex items-center gap-1.5 text-[11px] text-ink-500">
                  <MapPin size={12} className="shrink-0 text-ink-400" />
                  <span className="truncate">{ev.location}</span>
                </div>

                <div className="pt-2 border-t border-surface-border/60 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-ink-600 flex items-center gap-1">
                    <Tag size={11} />
                    {ev.relatedId}
                  </span>
                  <span
                    className={`font-semibold ${
                      ev.status === 'Urgent'
                        ? 'text-red-600'
                        : ev.status === 'In Progress'
                        ? 'text-brand-600'
                        : 'text-ink-600'
                    }`}
                  >
                    {ev.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
