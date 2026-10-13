import { Button } from '@/components/ui/button';
import { type Appointment, statusLabels } from './appointments-workspace';

export function AppointmentDetails({ item }: { item: Appointment }) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-4 text-sm">
      <div className="rounded-lg border bg-muted/20 p-4">
        <div className="text-lg font-semibold">{item.patient}</div>
        <div className="mt-1 text-muted-foreground">
          {item.time}–{item.endTime} · Europe/Istanbul
        </div>
      </div>
      {[
        ['Uzman', item.doctor],
        ['Klinik', item.clinic],
        ['Tedavi', item.type],
        ['Durum', statusLabels[item.status] ?? item.status],
      ].map(([label, value]) => (
        <div key={label} className="flex items-center justify-between border-b pb-3">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">{value}</span>
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          Düzenle
        </Button>
        <Button size="sm">Check-in yap</Button>
      </div>
    </div>
  );
}
