import { MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { productCategories, totalProducts } from '@/data/dashboardStats';

export function ProductCategoriesCard() {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-1 flex items-start justify-between">
        <h3 className="text-sm font-bold text-ink-900">Product Categories</h3>
        <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted text-ink-500">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-ink-500">Total Products</p>
        <p className="text-3xl font-bold text-ink-900">{totalProducts.toLocaleString()}</p>
      </div>

      <div className="mb-5 flex h-16 w-full overflow-hidden rounded-2xl">
        {productCategories.map((cat, index) => (
          <div
            key={cat.name}
            style={{
              width: `${cat.percent}%`,
              backgroundColor: cat.color,
              borderRight: index < productCategories.length - 1 ? '3px solid white' : 'none',
            }}
            title={`${cat.name}: ${cat.percent}%`}
          />
        ))}
      </div>

      <ul className="space-y-3.5">
        {productCategories.map((cat) => (
          <li key={cat.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: cat.color }} aria-hidden="true" />
              <span className="font-medium text-ink-700">{cat.name}</span>
            </span>
            <span className="flex items-center gap-2.5 rounded-lg bg-surface-muted px-3 py-1.5 text-ink-500">
              <span>{cat.products} products</span>
              <span className="h-3.5 w-px bg-surface-border" aria-hidden="true" />
              <span className="font-semibold text-ink-900">{cat.percent}%</span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}