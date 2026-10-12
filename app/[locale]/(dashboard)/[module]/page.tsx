import { ModuleWorkspace } from '@/components/workspace/module-workspace';

type ModulePageProps = {
  params: Promise<{ module: string }>;
};

export default async function ModulePage({ params }: ModulePageProps) {
  const { module } = await params;
  return <ModuleWorkspace module={module} />;
}

export function generateStaticParams() {
  return ['patients', 'appointments', 'inventory', 'finance', 'crm', 'marketing', 'inbox', 'workforce', 'automations'].map((module) => ({ module }));
}
