interface KPI {
  label: string;
  value: number;
  status: 'green' | 'yellow' | 'red';
}

interface ReportKPIsProps {
  kpis: KPI[];
}

export default function ReportKPIs({ kpis }: ReportKPIsProps) {
  const statusColors = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">KPIs Operacionais</h2>
      <div className="grid grid-cols-3 gap-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${statusColors[kpi.status]}`}></div>
            <div>
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="text-lg font-bold">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
