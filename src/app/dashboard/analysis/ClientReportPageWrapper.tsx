'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, ArrowLeft } from 'lucide-react';
import ReportHeader from '@/components/dashboard/relatorio/to-view/ReportHeader';
import ReportSummary from '@/components/dashboard/relatorio/to-view/ReportSummary';
import ReportKPIs from '@/components/dashboard/relatorio/to-view/ReportKPI';
import ReportFinancials from '@/components/dashboard/relatorio/to-view/ReportFinancials';
import ReportCalendar from '@/components/dashboard/relatorio/to-view/ReportCalendar';
import ReportEventsTable from '@/components/dashboard/relatorio/to-view/ReportEventTable';
import ReportClients from '@/components/dashboard/relatorio/to-view/ReportClients';
import ReportForecast from '@/components/dashboard/relatorio/to-view/ReportForecast';
import ReportNotesFromAdm from '@/components/dashboard/relatorio/to-view/ReportNotesFromAdm';
import ReportFooter from '@/components/dashboard/relatorio/to-view/ReportFooter';
import { ReportPDF } from './ReportPDF';

interface ClientReportPageWrapperProps {
  initialReportData: any;
  startYear: number;
  endYear: number;
  startMonth: number;
  endMonth: number;
}

export default function ClientReportPageWrapper({
                                                  initialReportData,
                                                  startYear: initialStartYear,
                                                  endYear: initialEndYear,
                                                  startMonth: initialStartMonth,
                                                  endMonth: initialEndMonth,
                                                }: ClientReportPageWrapperProps) {
  const [reportData, setReportData] = useState(initialReportData);
  const [currentStartYear, setCurrentStartYear] = useState(initialStartYear);
  const [currentEndYear, setCurrentEndYear] = useState(initialEndYear);
  const [currentStartMonth, setCurrentStartMonth] = useState(initialStartMonth);
  const [currentEndMonth, setCurrentEndMonth] = useState(initialEndMonth);
  const [notes, setNotes] = useState(initialReportData.notes);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCurrentStartYear(initialStartYear);
    setCurrentEndYear(initialEndYear);
    setCurrentStartMonth(initialStartMonth);
    setCurrentEndMonth(initialEndMonth);
    setReportData(initialReportData);
    setNotes(initialReportData.notes);
  }, [initialReportData, initialStartYear, initialEndYear, initialStartMonth, initialEndMonth]);


  async function prepararRelatorio() {
    setLoading(true);
    setReady(false);
    setStatus('Buscando dados...');
    setLogs(['Iniciando preparação do relatório...']);

    await new Promise((r) => setTimeout(r, 50));
    setLogs((prev) => [...prev, 'Coletando eventos do sistema...']);

    await new Promise((r) => setTimeout(r, 50));
    setLogs((prev) => [...prev, 'Atualizando parâmetros...']);

    const params = new URLSearchParams({
      startYear: currentStartYear.toString(),
      endYear: currentEndYear.toString(),
      startMonth: currentStartMonth.toString(),
      endMonth: currentEndMonth.toString(),
    });
    router.push(`?${params.toString()}`);

    await new Promise((r) => setTimeout(r, 50));
    setLogs((prev) => [...prev, 'Finalizando preparação...']);

    setStatus('Pronto para gerar PDF');
    setReady(true);
    setLoading(false);
  }

  function reset() {
    setReady(false);
    setLoading(false);
    setStatus('');
    setLogs([]);
    setCurrentStartYear(initialStartYear);
    setCurrentEndYear(initialEndYear);
    setCurrentStartMonth(initialStartMonth);
    setCurrentEndMonth(initialEndMonth);
    setNotes(initialReportData.notes);
    setReportData(initialReportData);
  }

  return (
    <div className="container mx-auto p-6">
      {!ready ? (
        <div className="max-w-2xl mx-auto space-y-4 p-6 rounded-2xl shadow-md bg-white">
          <h1 className="text-xl font-semibold">Preparar Relatório</h1>

          {/* Controles de período */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Ano Inicial</label>
              <input
                type="number"
                value={currentStartYear}
                onChange={(e) => setCurrentStartYear(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Mês Inicial</label>
              <input
                type="number"
                min="1"
                max="12"
                value={currentStartMonth}
                onChange={(e) => setCurrentStartMonth(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Ano Final</label>
              <input
                type="number"
                value={currentEndYear}
                onChange={(e) => setCurrentEndYear(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Mês Final</label>
              <input
                type="number"
                min="1"
                max="12"
                value={currentEndMonth}
                onChange={(e) => setCurrentEndMonth(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <textarea
            className="w-full p-2 border rounded"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Observações do administrador"
          />

          <button
            onClick={prepararRelatorio}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Preparando...' : 'Preparar Relatório'}
          </button>

          {status && <p className="text-gray-600 mt-2">{status}</p>}

          {logs.length > 0 && (
            <div className="bg-gray-100 p-3 rounded mt-4 space-y-1 text-sm">
              {logs.map((log, index) => (
                <div key={index}>▶ {log}</div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <ActionButtons reset={reset} reportData={{ ...reportData, notes }} />
          <div
            id="report-preview-container"
            className="border border-gray-300 rounded-xl shadow-xl bg-white p-6 space-y-6"
          >
            <ReportHeader adminName={reportData.adminName} period={reportData.period} />
            <ReportSummary summary={reportData.summary} />
            <ReportKPIs kpis={reportData.kpis} />
            <ReportFinancials data={reportData.financials} />
            <ReportCalendar events={reportData.calendar} />
            <ReportEventsTable events={reportData.events} />
            <ReportClients clients={reportData.clients} />
            <ReportForecast forecast={reportData.forecast} />
            <ReportNotesFromAdm notes={notes} />
            <ReportFooter />
          </div>
          <ActionButtons reset={reset} reportData={{ ...reportData, notes }} />
        </>
      )}
    </div>
  );
}

interface ActionButtonsProps {
  reset: () => void;
  reportData: {
    adminName: string;
    period: string;
    summary: {
      totalEvents: number;
      revenue: number;
      occupancyRate: number;
    };
    kpis: Array<{
      label: string;
      value: number;
      status: string;
    }>;
    financials: {
      totalRevenue: number;
      averageTicket: number;
      topClients: Array<{
        name: string;
        value: number;
      }>;
    };
    calendar: Array<{
      date: string;
      status: string;
    }>;
    events: Array<{
      date: string;
      type: string;
      client: string;
      value: number;
    }>;
    clients: Array<{
      name: string;
      recurrence: number;
      source: string;
      revenue: number;
    }>;
    forecast: {
      upcomingEvents: Array<{
        date: string;
        type: string;
        client: string;
        value: number;
      }>;
      occupancyGraph: number[];
      eventTypeStats: Record<string, number>;
    };
    notes: string;
  };
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ reset, reportData }) => {
  // DEBUG
  console.log('ActionButtons reportData:', {
    adminName: reportData.adminName,
    period: reportData.period,
    summary: reportData.summary,
    kpis: reportData.kpis,
    financials: reportData.financials,
    calendar: reportData.calendar?.length,
    events: reportData.events?.length,
    clients: reportData.clients?.length,
    forecast: {
      upcomingEvents: reportData.forecast.upcomingEvents?.length,
      occupancyGraph: reportData.forecast.occupancyGraph?.length,
      eventTypeStats: reportData.forecast.eventTypeStats
    },
    notes: reportData.notes
  });

  return (
    <div className="flex justify-between items-center gap-2 my-8">
      <button
        onClick={reset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <PDFDownloadLink
        document={<ReportPDF data={reportData} />}
        fileName="relatorio-eventos.pdf"
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {({ loading }) => loading ? (
          'Gerando PDF...'
        ) : (
          <>
            <Download className="w-4 h-4" />
            Baixar PDF
          </>
        )}
      </PDFDownloadLink>
    </div>
  )
}
