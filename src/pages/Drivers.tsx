import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { seedDrivers, type CommercialDriver } from '@/data/drivers';
import { DriverMetrics } from '@/components/drivers/DriverMetrics';
import { DriverTable } from '@/components/drivers/DriverTable';
import { AddDriverModal } from '@/components/drivers/AddDriverModal';

export function DriversPage() {
  const [drivers, setDrivers] = useState<CommercialDriver[]>(seedDrivers);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddDriver = (newDriver: CommercialDriver) => {
    setDrivers((prev) => [newDriver, ...prev]);
  };

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Commercial Drivers']}
      pageTitle="Commercial Drivers Directory"
      mobileTitle="Drivers"
      headerAction={
        <Button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-1.5 !px-4 !py-2.5 text-sm transition active:scale-95"
        >
          <Plus size={16} /> <span className="hidden sm:inline">Onboard Driver</span>
        </Button>
      }
    >
      <div className="space-y-6">
        <DriverMetrics drivers={drivers} />
        <DriverTable drivers={drivers} onOpenAddModal={() => setAddModalOpen(true)} />
      </div>

      <AddDriverModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddDriver={handleAddDriver}
      />
    </DashboardLayout>
  );
}
