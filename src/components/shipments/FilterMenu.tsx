import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import filterFunnel from '@/assets/icons/filter-funnel.png';

interface FilterMenuProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterMenu({ options, value, onChange }: FilterMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive = value !== options[0];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handlePointerDown);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex h-8 w-8 items-center justify-center gap-0 rounded-lg bg-white px-0 py-0 text-sm font-semibold text-ink-900 shadow-sm ring-1 ring-surface-border transition sm:h-auto sm:w-auto sm:justify-start sm:gap-1.5 sm:px-2.5 sm:py-1.5 md:h-8 md:w-8 md:justify-center md:gap-0 md:px-0 md:py-0 xl:h-auto xl:w-auto xl:justify-start xl:gap-1.5 xl:px-2.5 xl:py-1.5"
      >
        <img src={filterFunnel} alt="" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-3 md:w-3 xl:h-3.5 xl:w-3.5" />
        <span className="hidden sm:inline md:hidden xl:inline">Filter</span>
        {isActive && (
          <span
            className="hidden h-1.5 w-1.5 rounded-full bg-brand-500 sm:inline-block md:hidden xl:inline-block"
            aria-hidden="true"
          />
        )}
        <ChevronDown size={12} className={`hidden transition-transform sm:block md:hidden xl:block ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="absolute right-0 z-20 mt-1 w-48 rounded-lg border border-surface-border bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-xs transition hover:bg-surface-muted ${
                  opt === value ? 'font-semibold text-brand-600 bg-brand-50' : 'text-ink-700'
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}