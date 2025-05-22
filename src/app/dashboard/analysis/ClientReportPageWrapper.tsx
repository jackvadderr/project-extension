'use client';

import { useState } from 'react';
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

export default function ClientReportPageWrapper({
                                           initialReportData,
                                         }: {
  initialReportData: any;
}) {
  const [reportData, setReportData] = useState(initialReportData);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  async function prepararRelatorio() {
    setLoading(true);
    setReady(false);
    setStatus('Buscando dados...');
    setLogs(['Iniciando preparação do relatório...']);

    await new Promise((r) => setTimeout(r, 2000));
    setLogs((prev) => [...prev, 'Coletando eventos do sistema...']);

    await new Promise((r) => setTimeout(r, 2000));
    setLogs((prev) => [...prev, 'Analisando informações financeiras...']);

    await new Promise((r) => setTimeout(r, 2000));
    setLogs((prev) => [...prev, 'Calculando KPIs...']);

    await new Promise((r) => setTimeout(r, 2000));
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
    setReportData(initialReportData);
  }

  const ActionButtons = () => (
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
        <Download className="w-4 h-4" />
        Baixar PDF
      </PDFDownloadLink>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      {!ready ? (
        <div className="max-w-2xl mx-auto space-y-4 p-6 rounded-2xl shadow-md bg-white">
          <h1 className="text-xl font-semibold">Preparar Relatório</h1>

          <textarea
            className="resize-none h-32 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Observações do administrador"
            value={reportData.notes}
            onChange={(e) =>
              setReportData((prev) => ({ ...prev, notes: e.target.value }))
            }
          />

          <button
            onClick={prepararRelatorio}
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50`}
          >
            {loading ? 'Preparando...' : 'Preparar Relatório'}
          </button>

          {status && <p className="text-muted-foreground">{status}</p>}

          {logs.length > 0 && (
            <div className="bg-gray-100 rounded p-4 font-mono text-xs space-y-1">
              {logs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <ActionButtons />
          <div
            id="report-preview-container"
            className="border border-gray-300 rounded-xl shadow-xl bg-white p-6 space-y-6"
          >
            <ReportHeader adminName={reportData.adminName} period={reportData.period} />
            <ReportSummary summary={reportData.summary} />
            <ReportKPIs kpis={reportData.kpis} />
            <ReportFinancials financials={reportData.financials} />
            <ReportCalendar calendar={reportData.calendar} />
            <ReportEventsTable events={reportData.events} />
            <ReportClients clients={reportData.clients} />
            <ReportForecast forecast={reportData.forecast} />
            <ReportNotesFromAdm notes={reportData.notes} />
            <ReportFooter />
          </div>
          <ActionButtons />
        </>
      )}
    </div>
  );
}
