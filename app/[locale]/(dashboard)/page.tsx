import { KpiCards } from '@/components/dashboard/kpi-cards';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { LeadsPanel } from '@/components/dashboard/leads-panel';
import { AppointmentsPanel } from '@/components/dashboard/appointments-panel';
import { OmnichannelPanel } from '@/components/dashboard/omnichannel-panel';
import { PaymentsPanel } from '@/components/dashboard/payments-panel';
import { TourismPanel } from '@/components/dashboard/tourism-panel';
import { PatientsPanel } from '@/components/dashboard/patients-panel';
import { OperationsPanel } from '@/components/dashboard/operations-panel';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 space-y-4 p-4 md:p-6">
          <KpiCards />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <RevenueChart />
            <LeadsPanel />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <AppointmentsPanel />
            <OmnichannelPanel />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <PaymentsPanel />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <TourismPanel />
            <PatientsPanel />
            <OperationsPanel />
          </div>
        </main>
      </div>
    </div>
  );
}
