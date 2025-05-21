import { CalendarDays } from 'lucide-react';

interface CalendarDay {
  date: string; // formato '2025-05-01'
  status: 'livre' | 'agendado' | 'reservado' | 'bloqueado';
}

const mockCalendarData: CalendarDay[] = [
  { date: '2025-05-01', status: 'reservado' },
  { date: '2025-05-03', status: 'bloqueado' },
  { date: '2025-05-05', status: 'agendado' },
  { date: '2025-05-10', status: 'reservado' },
  { date: '2025-05-15', status: 'bloqueado' },
  { date: '2025-05-20', status: 'agendado' },
];

const statusColors: Record<CalendarDay['status'], string> = {
  livre: 'bg-white border',
  agendado: 'bg-yellow-300',
  reservado: 'bg-green-400',
  bloqueado: 'bg-red-400',
};

function formatDay(dateStr: string) {
  return new Date(dateStr).getDate();
}

export default function ReportCalendar() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CalendarDays className="w-5 h-5" />
        Calendário de Eventos
      </h2>

      <div className="grid grid-cols-7 gap-1 text-sm mb-4">
        {[...Array(31)].map((_, i) => {
          const date = `2025-05-${String(i + 1).padStart(2, '0')}`;
          const day = mockCalendarData.find(d => d.date === date);
          const status = day ? day.status : 'livre';
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
          <span className="w-3 h-3 bg-green-400 inline-block rounded-sm"></span> Reservado
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-3 bg-yellow-300 inline-block rounded-sm"></span> Agendado
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-3 bg-red-400 inline-block rounded-sm"></span> Bloqueado
        </span>
      </div>
    </div>
  );
}
