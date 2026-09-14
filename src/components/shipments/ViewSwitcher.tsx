import { LayoutGrid, List } from 'lucide-react';

export type ViewMode = 'grid' | 'table';

interface ViewSwitcherProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewSwitcher({ mode, onChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center rounded-lg bg-white p-0.5 shadow-sm ring-1 ring-surface-border">
      <button
        type="button"
        onClick={() => onChange('grid')}
        aria-label="Grid View"
        title="Grid View"
        className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
          mode === 'grid'
            ? 'bg-ink-900 text-white shadow-xs'
            : 'text-ink-500 hover:text-ink-900 hover:bg-surface-muted'
        }`}
      >
        <LayoutGrid size={15} />
      </button>
      <button
        type="button"
        onClick={() => onChange('table')}
        aria-label="Table View"
        title="Table View"
        className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
          mode === 'table'
            ? 'bg-ink-900 text-white shadow-xs'
            : 'text-ink-500 hover:text-ink-900 hover:bg-surface-muted'
        }`}
      >
        <List size={16} />
      </button>
    </div>
  );
}
