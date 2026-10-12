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
    <div className="min-h-full bg-background">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 md:p-6 lg:p-8">
        <section className="flex flex-col gap-1" aria-labelledby="dashboard-heading">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>Workspace</span>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Genel Bakış</span>
          </div>
          <h2 id="dashboard-heading" className="text-2xl font-semibold tracking-tight text-foreground">
            Günaydın, Zeynep
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Klinik operasyonlarınızdaki son durumu ve bugün için önemli aksiyonları takip edin.
          </p>
        </section>

        <div className="flex flex-col gap-5">
          <KpiCards />

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <RevenueChart />
            <LeadsPanel />
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <AppointmentsPanel />
            <OmnichannelPanel />
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <PaymentsPanel />
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <TourismPanel />
            <PatientsPanel />
            <OperationsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
