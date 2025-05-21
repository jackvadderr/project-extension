interface Summary {
  totalEvents: number;
  revenue: number;
  occupancyRate: number;
}

interface ReportSummaryProps {
  summary: Summary;
}

export default function ReportSummary({ summary }: ReportSummaryProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Sumário Executivo</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Eventos Realizados</p>
          <p className="text-2xl font-bold">{summary.totalEvents}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Receita Total</p>
          <p className="text-2xl font-bold">R$ {summary.revenue.toLocaleString('pt-BR')}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Taxa de Ocupação</p>
          <p className="text-2xl font-bold">{(summary.occupancyRate * 100).toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}
