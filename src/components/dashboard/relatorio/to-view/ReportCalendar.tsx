import { CalendarDays } from 'lucide-react';

interface CalendarDay {
  date: string;
}

const statusColors = {
  livre: 'bg-white border',
  agendado: 'bg-green-300',
} as const;

function formatDay(dateStr: string) {
  return new Date(dateStr).getDate();
}

const getDateStatus = (date: string, events: CalendarDay[]) => {
  return events.some(event => event.date === date) ? 'agendado' : 'livre';
};

export default function ReportCalendar({ events }: { events: CalendarDay[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CalendarDays className="w-5 h-5" />
        Calendário de Eventos
      </h2>

      <div className="grid grid-cols-7 gap-1 text-sm mb-4">
        {[...Array(31)].map((_, i) => {
          const date = `2025-05-${String(i + 1).padStart(2, '0')}`;
          const status = getDateStatus(date, events);
          return (
            <div
              key={date}
              className={`h-10 flex items-center justify-center rounded ${statusColors[status]}`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

      <div className="text-sm text-gray-700 space-x-4">
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-3 bg-white border inline-block rounded-sm"></span> Livre
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-3 bg-green-300 inline-block rounded-sm"></span> Agendado
        </span>
      </div>
    </div>
  );
}
