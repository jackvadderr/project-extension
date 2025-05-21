import { PieChart } from 'lucide-react';

interface EventTypeDistribution {
  type: string;
  count: number;
}

const mockEventTypes: EventTypeDistribution[] = [
  { type: 'Casamento', count: 10 },
  { type: 'Corporativo', count: 5 },
  { type: 'Aniversário', count: 3 },
  { type: 'Workshop', count: 2 },
  { type: 'Outros', count: 1 },
];

export default function ReportEventTypes() {
  const total = mockEventTypes.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <PieChart className="w-5 h-5" />
        Distribuição por Tipo de Evento
      </h2>

      <div className="space-y-3">
        {mockEventTypes.map((eventType, idx) => {
          const percentage = (eventType.count / total) * 100;

          return (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span>{eventType.type}</span>
                <span>{percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-indigo-500 rounded"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
