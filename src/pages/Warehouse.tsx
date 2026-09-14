import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import {
  warehouseFacilities,
  seedWarehouseInventory,
  type WarehouseFacility,
  type WarehouseInventoryItem,
} from '@/data/warehouse';
import { WarehouseMetrics } from '@/components/warehouse/WarehouseMetrics';
import { WarehouseHubCards } from '@/components/warehouse/WarehouseHubCards';
import { WarehouseInventoryTable } from '@/components/warehouse/WarehouseInventoryTable';
import { WarehouseDetailModal } from '@/components/warehouse/WarehouseDetailModal';
import { InboundStockModal } from '@/components/warehouse/InboundStockModal';

export function WarehousePage() {
  const [facilities] = useState<WarehouseFacility[]>(warehouseFacilities);
  const [inventory, setInventory] = useState<WarehouseInventoryItem[]>(seedWarehouseInventory);
  const [selectedHubCode, setSelectedHubCode] = useState<string | null>(null);
  const [inspectingFacility, setInspectingFacility] = useState<WarehouseFacility | null>(null);
  const [inboundModalOpen, setInboundModalOpen] = useState(false);

  const handleAddStock = (newItem: WarehouseInventoryItem) => {
    setInventory((prev) => [newItem, ...prev]);
  };

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Warehouse & Hubs']}
      pageTitle="Warehouse Operations"
      mobileTitle="Warehouse"
      headerAction={
        <Button
          onClick={() => setInboundModalOpen(true)}
          className="flex items-center gap-1.5 !px-4 !py-2.5 text-sm transition active:scale-95"
        >
          <Plus size={16} /> <span className="hidden sm:inline">Log Inbound</span>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Top Key Metrics */}
        <WarehouseMetrics facilities={facilities} inventory={inventory} />

        {/* Regional Hubs Network */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-ink-900">Regional Fulfillment Network</h2>
              <p className="text-xs text-ink-500">
                Click any hub to filter inventory below, or click the arrow to view full facility specifications
              </p>
            </div>
            {selectedHubCode && (
              <button
                type="button"
                onClick={() => setSelectedHubCode(null)}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                Show All Facilities
              </button>
            )}
          </div>

          <WarehouseHubCards
            facilities={facilities}
            selectedHubCode={selectedHubCode}
            onSelectHub={setSelectedHubCode}
            onInspectFacility={setInspectingFacility}
          />
        </div>

        {/* Inventory Table */}
        <div className="space-y-3">
          <WarehouseInventoryTable
            inventory={inventory}
            selectedHubCode={selectedHubCode}
            onSelectHub={setSelectedHubCode}
            onOpenInboundModal={() => setInboundModalOpen(true)}
          />
        </div>
      </div>

      {/* Facility Details Modal */}
      <WarehouseDetailModal
        facility={inspectingFacility}
        inventory={inventory}
        isOpen={!!inspectingFacility}
        onClose={() => setInspectingFacility(null)}
        onFilterHub={(code) => setSelectedHubCode(code)}
      />

      {/* Inbound Stock Creation Modal */}
      <InboundStockModal
        isOpen={inboundModalOpen}
        onClose={() => setInboundModalOpen(false)}
        onAddStock={handleAddStock}
        defaultHubCode={selectedHubCode}
      />
    </DashboardLayout>
  );
}
