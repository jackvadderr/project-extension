import ClientReportPageWrapper from '@/app/dashboard/analysis/ClientReportPageWrapper';
import { getReportDataAction } from '@/actions/report/initial-data-action';

const adminName = 'admin';

const initialData = await getReportDataAction(
  adminName,
  {
    startYear: 2025,
    endYear: 2025,
    startMonth: 5,
    endMonth: 5
  }
);

export default function Page() {
  return <ClientReportPageWrapper initialReportData={initialData} />;
}
