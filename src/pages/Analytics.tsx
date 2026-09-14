import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Download, Check } from 'lucide-react';
import { AnalyticsMetrics } from '@/components/analytics/AnalyticsMetrics';
import { DeliveryPerformanceChart } from '@/components/analytics/DeliveryPerformanceChart';
import { RegionalVolumeChart } from '@/components/analytics/RegionalVolumeChart';
import { CarrierScorecardTable } from '@/components/analytics/CarrierScorecardTable';

export function AnalyticsPage() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadReport = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Analytics & Reporting']}
      pageTitle="Logistics Business Intelligence"
      mobileTitle="Analytics"
      headerAction={
        <Button
          variant="secondary"
          onClick={handleDownloadReport}
          className="flex items-center gap-1.5 !px-3.5 !py-2 text-xs transition active:scale-95"
        >
          {downloaded ? (
            <>
              <Check size={14} className="text-emerald-600" />
              <span className="hidden sm:inline text-emerald-600 font-semibold">Report Generated</span>
            </>
          ) : (
            <>
              <Download size={14} />
              <span className="hidden sm:inline">Executive PDF Report</span>
            </>
          )}
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Top executive metrics */}
        <AnalyticsMetrics />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8">
            <DeliveryPerformanceChart />
          </div>
          <div className="lg:col-span-4">
            <RegionalVolumeChart />
          </div>
        </div>

        {/* Carrier partner quality scorecards */}
        <div>
          <CarrierScorecardTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
