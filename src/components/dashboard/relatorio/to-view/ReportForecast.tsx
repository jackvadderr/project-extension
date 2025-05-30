import { CalendarCheck } from 'lucide-react';

interface ForecastEvent {
  date: string;
  client: string;
  type: string;
}

interface ReportForecastProps {
  forecast: {
    upcomingEvents: ForecastEvent[];
    occupancyGraph: number[];
    eventTypeStats: Record<string, number>;
  };
}

export default function ReportForecast({ forecast }: ReportForecastProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CalendarCheck className="w-5 h-5" />
        Próximos Eventos e Ocupação Prevista
      </h2>

      <div className="mb-4">
        <ul className="text-sm space-y-2">
          {forecast.upcomingEvents.map((event, idx) => (
            <li key={idx} className="flex justify-between border-b pb-1">
              <span>
                {new Date(event.date).toLocaleDateString('pt-BR')} — {event.client} ({event.type})
              </span>
              <span>{Math.round(forecast.occupancyGraph[idx] * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-md font-medium mb-2">Gráfico de Ocupação Futura</h3>
        <div className="space-y-2">
          {forecast.upcomingEvents.map((event, idx) => (
            <div key={idx}>
              <div className="text-xs text-gray-700 mb-1">{event.client}</div>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-teal-500 rounded"
                  style={{ width: `${Math.round(forecast.occupancyGraph[idx] * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}