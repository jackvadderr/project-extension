import { CalendarCheck } from 'lucide-react';

interface ForecastEvent {
  date: string;
  name: string;
  type: string;
  expectedOccupancy: number;
}

const mockForecast: ForecastEvent[] = [
  { date: '2025-06-05', name: 'Evento XPTO', type: 'Corporativo', expectedOccupancy: 80 },
  { date: '2025-06-10', name: 'Festa Julina', type: 'Aniversário', expectedOccupancy: 60 },
  { date: '2025-06-15', name: 'Congresso 2025', type: 'Workshop', expectedOccupancy: 90 },
];

export default function ReportForecast() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CalendarCheck className="w-5 h-5" />
        Próximos Eventos e Ocupação Prevista
      </h2>

      <div className="mb-4">
        <ul className="text-sm space-y-2">
          {mockForecast.map((event, idx) => (
            <li key={idx} className="flex justify-between border-b pb-1">
              <span>
                {new Date(event.date).toLocaleDateString('pt-BR')} — {event.name} ({event.type})
              </span>
              <span>{event.expectedOccupancy}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-md font-medium mb-2">Gráfico de Ocupação Futura</h3>
        <div className="space-y-2">
          {mockForecast.map((event, idx) => (
            <div key={idx}>
              <div className="text-xs text-gray-700 mb-1">{event.name}</div>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-teal-500 rounded"
                  style={{ width: `${event.expectedOccupancy}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
