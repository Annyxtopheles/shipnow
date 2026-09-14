import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { seedLiveTracking, type LiveShipmentTelemetry } from '@/data/tracking';
import { TelemetryCards } from '@/components/tracking/TelemetryCards';
import { TrackingMapViewer } from '@/components/tracking/TrackingMapViewer';
import { TrackingSidebarList } from '@/components/tracking/TrackingSidebarList';
import { TrackingMilestoneTimeline } from '@/components/tracking/TrackingMilestoneTimeline';

export function TrackingPage() {
  const [shipments] = useState<LiveShipmentTelemetry[]>(seedLiveTracking);
  const [selectedShipment, setSelectedShipment] = useState<LiveShipmentTelemetry>(seedLiveTracking[0]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Tracking']}
      pageTitle="Tracking"
      mobileTitle="Tracking"
      headerAction={
        <Button
          variant="secondary"
          onClick={handleRefresh}
          className="flex items-center gap-1.5 !px-3.5 !py-2 text-xs transition active:scale-95"
        >
          <RotateCcw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Top telemetry metric cards */}
        <TelemetryCards shipments={shipments} />

        {/* Main Grid: Map & Active vehicle feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Interactive Map Viewer */}
          <div className="lg:col-span-8 space-y-5">
            <TrackingMapViewer
              shipments={shipments}
              selectedShipment={selectedShipment}
              onSelectShipment={setSelectedShipment}
            />

            {/* Detailed Waypoints Flow for the Selected Shipment */}
            <TrackingMilestoneTimeline shipment={selectedShipment} />
          </div>

          {/* Right Column: Active Shipments Queue */}
          <div className="lg:col-span-4 space-y-4">
            <TrackingSidebarList
              shipments={shipments}
              selectedShipment={selectedShipment}
              onSelectShipment={setSelectedShipment}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
