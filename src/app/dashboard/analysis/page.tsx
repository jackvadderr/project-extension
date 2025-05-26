import ClientReportPageWrapper from '@/app/dashboard/analysis/ClientReportPageWrapper';
import { getReportDataAction } from '@/actions/report/initial-data-action';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function Page({
                                     searchParams,
                                   }: {
  searchParams?: {
    startYear?: string;
    endYear?: string;
    startMonth?: string;
    endMonth?: string;
  };
}) {
  const startYear = parseInt(searchParams?.startYear || '2025');
  const endYear = parseInt(searchParams?.endYear || '2025');
  const startMonth = parseInt(searchParams?.startMonth || '5');
  const endMonth = parseInt(searchParams?.endMonth || '5');
  const session = await auth();
  const adminName = session?.user?.name ?? "Administrador";

  const initialData = await getReportDataAction(adminName, {
    startYear,
    endYear,
    startMonth,
    endMonth,
  });

  return (
    <ClientReportPageWrapper
      initialReportData={initialData}
      startYear={startYear}
      endYear={endYear}
      startMonth={startMonth}
      endMonth={endMonth}
    />
  );
}