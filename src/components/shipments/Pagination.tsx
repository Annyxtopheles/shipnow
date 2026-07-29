import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RangeDropdown } from '@/components/ui/RangeDropdown';

interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions: string[];
  totalResults: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

function getPageNumbers(page: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | 'ellipsis')[] = [1];
  if (page > 3) pages.push('ellipsis');
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  for (let p = start; p <= end; p++) pages.push(p);
  if (page < totalPages - 2) pages.push('ellipsis');
  pages.push(totalPages);
  return pages;
}

export function Pagination({
  page,
  totalPages,
  pageSize,
  pageSizeOptions,
  totalResults,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="flex items-center gap-2 text-xs text-ink-500">
        <span>Show</span>
        <RangeDropdown
          options={pageSizeOptions}
          value={String(pageSize)}
          onChange={(v) => onPageSizeChange(Number(v))}
        />
        <span>of {totalResults} results</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        {pageNumbers.map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`ellipsis-${i}`} className="px-1.5 text-xs text-ink-500">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
                p === page ? 'bg-brand-500 text-white' : 'text-ink-700 hover:bg-surface-muted'
              }`}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          aria-label="Next page"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
