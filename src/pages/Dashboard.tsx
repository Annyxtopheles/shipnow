import { Plus } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/dashboard/MetricCards';
import { ShipmentTypeCard } from '@/components/dashboard/ShipmentTypeCard';
import { ShipmentStatisticCard } from '@/components/dashboard/ShipmentStatisticCard';
import { ProfitSummaryCard } from '@/components/dashboard/ProfitSummaryCard';
import { ProductCategoriesCard } from '@/components/dashboard/ProductCategoriesCard';
import { TrackingCard } from '@/components/dashboard/TrackingCard';
import { AlertsCard } from '@/components/dashboard/AlertsCard';
import { RecentShipmentsCard } from '@/components/dashboard/RecentShipmentsCard';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { metricCards } from '@/data/dashboardStats';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useShipments } from '@/context/ShipmentContext';

function MobileLayout() {
  // Phone only: dedicated single-column order per the phone Figma frame.
  // Genuinely different from desktop's source order - Shipment Type moves
  // after Statistic/Profit instead of sitting with the metrics.
  return (
    <div className="grid grid-cols-1 gap-5">
      <MetricCard metric={metricCards[0]} />
      <MetricCard metric={metricCards[1]} />
      <MetricCard metric={metricCards[2]} />
      <ShipmentStatisticCard />
      <ProfitSummaryCard />
      <ShipmentTypeCard />
      <ProductCategoriesCard />
      <div className="h-[550px]">
        <TrackingCard />
      </div>
      <AlertsCard />
      <RecentShipmentsCard />
      <RecentActivityCard />
    </div>
  );
}

function TabletLayout() {
  // Tablet only: dedicated 6-row arrangement per the tablet Figma frame. The
  // pairings here cut across the desktop row groupings - e.g. Shipment Type
  // moves out of the metrics row to pair with Product Categories, and Recent
  // Shipments moves out of the Recent Activity row to stand alone - so it's
  // its own layout rather than a reflow of the desktop grid.
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-5">
        <MetricCard metric={metricCards[0]} />
        <MetricCard metric={metricCards[1]} />
        <MetricCard metric={metricCards[2]} />
      </div>

      <div className="grid grid-cols-9 gap-5">
        <div className="col-span-4">
          <ShipmentStatisticCard />
        </div>
        <div className="col-span-5">
          <ProfitSummaryCard />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <ShipmentTypeCard />
        <ProductCategoriesCard />
      </div>

      {/* Needs an explicit height here - on desktop/the old tablet grid it sat
          in a row that stretched it via CSS Grid; as a lone flex item it has
          no sibling to stretch against, so its internal flex-1 map area would
          otherwise collapse to 0px. */}
      <div className="h-[460px]">
        <TrackingCard />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <AlertsCard />
        <RecentActivityCard />
      </div>

      <RecentShipmentsCard />
    </div>
  );
}

function DesktopLayout() {
  // Desktop only: original layout, completely unchanged.
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-4 gap-5">
        <MetricCard metric={metricCards[0]} />
        <MetricCard metric={metricCards[1]} />
        <MetricCard metric={metricCards[2]} />
        <div className="col-span-1 row-span-2">
          <ShipmentTypeCard />
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-9 gap-5">
            <div className="col-span-4">
              <ShipmentStatisticCard />
            </div>
            <div className="col-span-5">
              <ProfitSummaryCard />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4">
          <ProductCategoriesCard />
        </div>
        <div className="col-span-5">
          <TrackingCard />
        </div>
        <div className="col-span-3">
          <AlertsCard />
        </div>
      </div>

      <div className="grid grid-cols-[7fr_3fr] gap-5">
        <RecentShipmentsCard />
        <RecentActivityCard />
      </div>
    </div>
  );
}

export function DashboardPage() {
  const breakpoint = useBreakpoint();
  const { setIsCreateModalOpen } = useShipments();

  return (
    <DashboardLayout
      mobileTitle="Dashboard"
      headerAction={
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 !px-4 !py-2.5 text-sm"
        >
          <Plus size={16} /> <span className="hidden sm:inline">Add New Shipping</span>
        </Button>
      }
    >
      {breakpoint === 'mobile' && <MobileLayout />}
      {breakpoint === 'tablet' && <TabletLayout />}
      {breakpoint === 'desktop' && <DesktopLayout />}
    </DashboardLayout>
  );
}