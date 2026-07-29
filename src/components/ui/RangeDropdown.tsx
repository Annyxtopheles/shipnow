import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface RangeDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  /** Optional grey label shown before the pill, rendered outside of it
   * (e.g. "Sort by:" next to a "Newest" pill). */
  label?: string;
}

export function RangeDropdown({ options, value, onChange, label }: RangeDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex items-center gap-1.5 ${label ? 'text-sm md:gap-1 xl:gap-1.5' : 'text-xs'}`}>
      {label && <span className="inline text-ink-500 md:text-xs xl:text-sm">{label}</span>}
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 ${
            label
              ? 'text-sm font-semibold text-ink-900 md:gap-0.5 md:px-1.5 md:py-1 md:text-xs xl:gap-1 xl:px-2.5 xl:py-1.5 xl:text-sm'
              : 'text-xs font-medium text-ink-700'
          }`}
          style={{ backgroundColor: label ? '#ffffff' : '#F0F0F0' }}
        >
          {value}
          <ChevronDown size={12} />
        </button>
        {open && (
          <ul className="absolute right-0 z-10 mt-1 w-36 rounded-lg border border-surface-border bg-white py-1 shadow-lg">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-xs hover:bg-surface-muted"
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}