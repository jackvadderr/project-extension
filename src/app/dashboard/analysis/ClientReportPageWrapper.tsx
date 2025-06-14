"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, ArrowLeft, File } from "lucide-react";
import ReportHeader from "@/components/dashboard/relatorio/to-view/ReportHeader";
import ReportSummary from "@/components/dashboard/relatorio/to-view/ReportSummary";
import ReportKPIs from "@/components/dashboard/relatorio/to-view/ReportKPI";
import ReportFinancials from "@/components/dashboard/relatorio/to-view/ReportFinancials";
import ReportCalendar from "@/components/dashboard/relatorio/to-view/ReportCalendar";
import ReportEventsTable from "@/components/dashboard/relatorio/to-view/ReportEventTable";
import ReportClients from "@/components/dashboard/relatorio/to-view/ReportClients";
import ReportForecast from "@/components/dashboard/relatorio/to-view/ReportForecast";
import ReportNotesFromAdm from "@/components/dashboard/relatorio/to-view/ReportNotesFromAdm";
import ReportFooter from "@/components/dashboard/relatorio/to-view/ReportFooter";
import { ReportPDF } from "./ReportPDF";
import DownloadExcelButton from '@/components/dashboard/relatorio/to-excel/DownloadExcelButton';
import DownloadPdfButton from '@/components/dashboard/relatorio/to-print/DownloadPdfButton';

interface ClientReportPageWrapperProps {
  initialReportData: {
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
  const [status, setStatus] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCurrentStartYear(initialStartYear);
    setCurrentEndYear(initialEndYear);
    setCurrentStartMonth(initialStartMonth);
    setCurrentEndMonth(initialEndMonth);
    setReportData(initialReportData);
    setNotes(initialReportData.notes);
  }, [
    initialReportData,
    initialStartYear,
    initialEndYear,
    initialStartMonth,
    initialEndMonth,
  ]);

  async function prepararRelatorio() {
    setLoading(true);
    setReady(false);
    setStatus("Buscando dados...");
    setLogs(["Iniciando preparação do relatório..."]);

    await new Promise((r) => setTimeout(r, 50));
    setLogs((prev) => [...prev, "Coletando eventos do sistema..."]);

    await new Promise((r) => setTimeout(r, 50));
    setLogs((prev) => [...prev, "Atualizando parâmetros..."]);

    const params = new URLSearchParams({
      startYear: currentStartYear.toString(),
      endYear: currentEndYear.toString(),
      startMonth: currentStartMonth.toString(),
      endMonth: currentEndMonth.toString(),
    });
    router.push(`?${params.toString()}`);

    await new Promise((r) => setTimeout(r, 50));
    setLogs((prev) => [...prev, "Finalizando preparação..."]);

    setStatus("Pronto para gerar relatórios");
    setReady(true);
    setLoading(false);
  }

  function reset() {
    setReady(false);
    setLoading(false);
    setStatus("");
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
          <ActionButtons
            reset={reset}
            reportData={{ ...reportData, notes }}
            reportDate={''}
          />

          <div
            id="report-preview-container"
            className="border border-gray-300 rounded-xl shadow-xl bg-white p-6 space-y-6"
          >
            <ReportHeader adminName={reportData.adminName} period={reportData.period} />
            <ReportSummary summary={reportData.summary} />
            <ReportKPIs kpis={reportData.kpis} />
            <ReportFinancials data={reportData.financials} />
            <ReportCalendar events={reportData.calendar} period={reportData.period} />
            <ReportEventsTable events={reportData.events} />
            <ReportClients clients={reportData.clients} />
            {/*<ReportForecast forecast={reportData.forecast} />*/}
            <ReportNotesFromAdm notes={notes} />
            <ReportFooter />
          </div>

          <ActionButtons
            reset={reset}
            reportData={{ ...reportData, notes }}
            reportDate={''}
          />
        </>
      )}
    </div>
  );
}

interface ActionButtonsProps {
  reset: () => void;
  reportDate: string,
  reportData: {
    adminName: string;
    period: string;
    summary: {
      totalEvents: number;
      revenue: number;
      occupancyRate: number;
    };
    kpis: {
      label: string;
      value: number;
      status: string;
    }[];
    financials: {
      totalRevenue: number;
      averageTicket: number;
      topClients: {
        name: string;
        value: number;
      }[];
    };
    calendar: { date: string; status: string }[];
    events: {
      date: string;
      type: any;
      client: string;
      value: any;
    }[];
    clients: {
      name: string;
      recurrence: number;
      source: string;
      revenue: number;
    }[];
    forecast: {
      upcomingEvents: any[];
      occupancyGraph: number[];
      eventTypeStats: Record<string, number>;
    };
    notes: string;
  };
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ reset, reportData}) => {
  // --------------------------------------------------------
  // Função para gerar e disparar o download do arquivo Excel
  // --------------------------------------------------------
  const handleDownloadExcel = async () => {
    try {
      const ExcelJS = (await import("exceljs")).default;

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("📋 Relatório");

      // Funções auxiliares
      const applyBorders = (cell: any) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      };

      const formatCurrencyCell = (cell: any) => {
        cell.numFmt = 'R$ #,##0.00';
        cell.alignment = { horizontal: 'right' };
        applyBorders(cell);
      };

      const formatDateCell = (cell: any) => {
        cell.numFmt = 'dd/mm/yyyy';
        cell.alignment = { horizontal: 'center' };
        applyBorders(cell);
      };

      const applyZebraStyle = (row: any, index: number) => {
        if (index % 2 === 1) {
          row.eachCell((cell: any) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFF9F9F9" },
            };
          });
        }
        row.eachCell((cell: any) => applyBorders(cell));
      };

      const addStyledHeader = (text: string) => {
        const row = sheet.addRow([text]);
        sheet.mergeCells(`A${row.number}:B${row.number}`);
        row.font = { bold: true, size: 14 };
        row.alignment = { vertical: "middle", horizontal: "center" };
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE6E6E6" },
        };
        row.height = 20;
      };

      const addLabelValueRow = (label: string, value: any, isCurrency = false) => {
        const row = sheet.addRow([label, value]);
        row.getCell(1).font = { bold: true };
        applyBorders(row.getCell(1));
        if (isCurrency) formatCurrencyCell(row.getCell(2));
        else applyBorders(row.getCell(2));
      };

      // --- Construção do relatório ---

      addStyledHeader("📋 Relatório de Eventos");
      addLabelValueRow("Administrador", reportData.adminName);
      addLabelValueRow("Período", reportData.period);
      sheet.addRow([]);

      addStyledHeader("📊 RESUMO");
      addLabelValueRow("Total de Eventos", reportData.summary.totalEvents);
      addLabelValueRow("Receita Total", reportData.summary.revenue, true);
      const occupancy = (reportData.summary.occupancyRate * 100).toFixed(0) + "%";
      addLabelValueRow("Taxa de Ocupação", occupancy);
      sheet.addRow([]);

      addStyledHeader("📈 KPIs");
      const kpiHeader = sheet.addRow(["Label", "Valor"]);
      kpiHeader.font = { bold: true };
      kpiHeader.eachCell((cell: any) => {
        cell.alignment = { horizontal: "center", wrapText: true };
        applyBorders(cell);
      });
      reportData.kpis.forEach((kpi, i) => {
        const row = sheet.addRow([kpi.label, kpi.value]);
        applyZebraStyle(row, i);
      });
      sheet.addRow([]);

      addStyledHeader("💵 Dados Financeiros");
      addLabelValueRow("Receita Total", reportData.financials.totalRevenue, true);
      addLabelValueRow("Ticket Médio", reportData.financials.averageTicket, true);
      sheet.addRow([]);

      addStyledHeader("🏆 Top Clientes");
      const topHeader = sheet.addRow(["Cliente", "Receita"]);
      topHeader.font = { bold: true };
      topHeader.eachCell((cell: any) => {
        cell.alignment = { horizontal: "center", wrapText: true };
        applyBorders(cell);
      });
      reportData.financials.topClients.forEach((c, i) => {
        const row = sheet.addRow([c.name, c.value]);
        formatCurrencyCell(row.getCell(2));
        applyZebraStyle(row, i);
      });
      sheet.addRow([]);

      addStyledHeader("📅 Eventos Detalhados");
      const evHeader = sheet.addRow(["Data", "Tipo", "Cliente", "Valor"]);
      evHeader.font = { bold: true };
      evHeader.eachCell((cell: any) => {
        cell.alignment = { horizontal: "center", wrapText: true };
        applyBorders(cell);
      });
      reportData.events.forEach((ev, i) => {
        const row = sheet.addRow([
          new Date(ev.date),
          ev.type,
          ev.client,
          ev.value,
        ]);
        formatDateCell(row.getCell(1));
        formatCurrencyCell(row.getCell(4));
        applyZebraStyle(row, i);
      });
      sheet.addRow([]);

      addStyledHeader("🧑‍🤝‍🧑 Clientes");
      const clHeader = sheet.addRow(["Nome", "Recorrência", "Receita"]);
      clHeader.font = { bold: true };
      clHeader.eachCell((cell: any) => {
        cell.alignment = { horizontal: "center", wrapText: true };
        applyBorders(cell);
      });
      reportData.clients.forEach((c, i) => {
        const row = sheet.addRow([
          c.name,
          c.recurrence,
          c.revenue,
        ]);
        formatCurrencyCell(row.getCell(3));
        applyZebraStyle(row, i);
      });
      sheet.addRow([]);

      addStyledHeader("📝 Notas do Administrador");
      const noteRow = sheet.addRow([reportData.notes]);
      sheet.mergeCells(`A${noteRow.number}:B${noteRow.number}`);
      noteRow.alignment = { wrapText: true };
      sheet.addRow([]);

      // Ajusta larguras das colunas
      sheet.columns.forEach((column) => {
        let maxLength = 10;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const text = cell.value ? cell.value.toString() : "";
          maxLength = Math.max(maxLength, text.length);
        });
        column.width = maxLength + 4;
      });

      // --- Aba extra só com dados para o gráfico de pizza ---
      const chartSheet = workbook.addWorksheet("📊 Receita por Cliente");
      chartSheet.addRow(["Cliente", "Receita"]);
      reportData.financials.topClients.forEach((c) => {
        const row = chartSheet.addRow([c.name, c.value]);
        formatCurrencyCell(row.getCell(2));
      });

      chartSheet.columns.forEach((column) => {
        let maxLength = 10;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const text = cell.value ? cell.value.toString() : "";
          maxLength = Math.max(maxLength, text.length);
        });
        column.width = maxLength + 4;
      });

      // --- Exporta arquivo Excel ---
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      // Gerar nome do arquivo com base no período
      const safePeriod = reportData.period
        ? reportData.period.replace(/\s+/g, "_").replace(/[^\w-_]/g, "")
        : "Relatorio";
      anchor.href = url;
      anchor.download = `Relatorio-${safePeriod}.xlsx`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar Excel:", error);
    }
  };

  return (
    <div className="flex justify-between items-center gap-2 my-8">
      <button
        onClick={reset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="flex gap-2">
        {/* Botão de Download de PDF (já existente) */}
        <DownloadPdfButton
           document={<ReportPDF data={reportData} />}
           fileName="relatorio-eventos.pdf"
         />

        <DownloadExcelButton onClick={handleDownloadExcel} />
      </div>
    </div>
  );
};
