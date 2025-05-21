'use client';

import ReportHeader from '@/components/dashboard/relatorio/to-view/ReportHeader';
import ReportSummary from '@/components/dashboard/relatorio/to-view/ReportSummary';
import ReportKPIs from '@/components/dashboard/relatorio/to-view/ReportKPI';
import ReportFinancials from '@/components/dashboard/relatorio/to-view/ReportFinancials';
import ReportCalendar from '@/components/dashboard/relatorio/to-view/ReportCalendar';
import ReportEventsTable from '@/components/dashboard/relatorio/to-view/ReportEventTable';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { ReportPDF } from './ReportPDF';
import ReportClients from '@/components/dashboard/relatorio/to-view/ReportClients';
import ReportForecast from '@/components/dashboard/relatorio/to-view/ReportForecast';
import ReportNotesFromAdm from '@/components/dashboard/relatorio/to-view/ReportNotesFromAdm';
import ReportFooter from '@/components/dashboard/relatorio/to-view/ReportFooter';

const reportData = {
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
  eventTypes: [
    { type: 'Corporativo', count: 10 },
    { type: 'Social', count: 15 },
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
  tasks: [
    { task: 'Confirmar buffet para evento de 10/04', status: 'pendente' },
    { task: 'Enviar contrato para Cliente D', status: 'concluído' },
  ],
  notes: 'Todos os eventos de março ocorreram conforme o planejado. Nenhuma ocorrência relevante.',
};

export default function Page() {
  return (
    <>
      <div className="flex justify-end mb-4">
        <PDFDownloadLink
          document={
          <ReportPDF data={reportData} />
        }
          fileName="relatorio-eventos.pdf"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Download className="w-4 h-4" />
          Baixar PDF
        </PDFDownloadLink>
      </div>
      <ReportHeader adminName={reportData.adminName} period={reportData.period} />
      <ReportSummary summary={reportData.summary} />
      <ReportKPIs kpis={reportData.kpis} />
      <ReportFinancials financials={reportData.financials} />
      <ReportCalendar calendar={reportData.calendar} />
      <ReportEventsTable events={reportData.events} />
      <ReportClients />
      <ReportForecast />
      <ReportNotesFromAdm />
      <ReportFooter />
    </>
  );
}
