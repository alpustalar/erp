import { PatientProfileWorkspace } from '@/components/patients/patient-profile-workspace';

type PatientProfilePageProps = {
  params: Promise<{ patientId: string }>;
};

export default async function PatientProfilePage({ params }: PatientProfilePageProps) {
  const { patientId } = await params;
  return <PatientProfileWorkspace patientId={patientId} />;
}
