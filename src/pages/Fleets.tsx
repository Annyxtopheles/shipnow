import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { seedFleets, type FleetVehicle } from '@/data/fleets';
import { FleetMetrics } from '@/components/fleets/FleetMetrics';
import { FleetTable } from '@/components/fleets/FleetTable';
import { AddVehicleModal } from '@/components/fleets/AddVehicleModal';

export function FleetsPage() {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>(seedFleets);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddVehicle = (newVehicle: FleetVehicle) => {
    setVehicles((prev) => [newVehicle, ...prev]);
  };

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Fleet Management']}
      pageTitle="Commercial Fleet Management"
      mobileTitle="Fleets"
      headerAction={
        <Button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-1.5 !px-4 !py-2.5 text-sm transition active:scale-95"
        >
          <Plus size={16} /> <span className="hidden sm:inline">Add Vehicle</span>
        </Button>
      }
    >
      <div className="space-y-6">
        <FleetMetrics vehicles={vehicles} />
        <FleetTable vehicles={vehicles} onOpenAddModal={() => setAddModalOpen(true)} />
      </div>

      <AddVehicleModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddVehicle={handleAddVehicle}
      />
    </DashboardLayout>
  );
}
