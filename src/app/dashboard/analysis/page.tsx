import ClientReportPageWrapper from '@/app/dashboard/analysis/ClientReportPageWrapper';

const initialReportData = {
  adminName: 'João Silva',
  period: 'Janeiro - Março 2025',
  summary: {
    totalEvents: 25,
    revenue: 150000,
    occupancyRate: 0.85,
  },
  kpis: [
    { label: 'Satisfação do Cliente', value: 92, status: 'green' },
    { label: 'Eventos Cancelados', value: 2, status: 'yellow' },
    { label: 'Reclamações', value: 1, status: 'green' },
  ],
  financials: {
    totalRevenue: 150000,
    averageTicket: 6000,
    topClients: [
      { name: 'Empresa A', revenue: 50000 },
      { name: 'Empresa B', revenue: 40000 },
    ],
  },
  calendar: [
    { date: '2025-01-10', status: 'reservado' },
    { date: '2025-01-15', status: 'agendado' },
    { date: '2025-01-20', status: 'bloqueado' },
  ],
  events: [
    { date: '2025-01-10', type: 'Corporativo', client: 'Empresa A', value: 20000 },
    { date: '2025-01-15', type: 'Social', client: 'Cliente B', value: 15000 },
  ],
  clients: [
    { name: 'Empresa A', recurrence: 3, origin: 'Indicação', revenue: 50000 },
    { name: 'Cliente B', recurrence: 2, origin: 'Online', revenue: 30000 },
  ],
  forecast: {
    upcomingEvents: [
      { date: '2025-04-10', client: 'Empresa C', type: 'Corporativo' },
      { date: '2025-04-15', client: 'Cliente D', type: 'Social' },
    ],
    occupancyGraph: [0.7, 0.8, 0.9],
  },
  notes: '',
};

export default function Page() {
  return <ClientReportPageWrapper initialReportData={initialReportData} />;
}
