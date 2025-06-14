import { CalendarDays } from 'lucide-react';

interface CalendarDay {
  date: string;
}

const statusColors = {
  livre: 'bg-white border',
  agendado: 'bg-green-300',
} as const;

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

// Função para pegar o número do mês (0-11) a partir do nome do mês em português
function getMonthIndex(monthName: string) {
  return monthNames.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
}

// Retorna as datas no formato YYYY-MM-DD para o mês e ano indicados
function getDaysInMonth(year: number, monthIndex: number) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  return [...Array(daysInMonth)].map((_, i) => {
    const day = i + 1;
    return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  });
}

const getDateStatus = (date: string, events: CalendarDay[]) => {
  return events.some(event => event.date === date) ? 'agendado' : 'livre';
};

export default function ReportCalendar({
                                         events,
                                         period,
                                       }: {
  events: CalendarDay[];
  period: string;
}) {
  const [startPeriod] = period.split(' - ');
  const [startMonthName, startYearStr] = startPeriod.split(' ');
  const startYear = Number(startYearStr);
  const startMonthIndex = getMonthIndex(startMonthName);

  const days = getDaysInMonth(startYear, startMonthIndex);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CalendarDays className="w-5 h-5" />
        Calendário de Eventos
      </h2>

      <div className="grid grid-cols-7 gap-1 text-sm mb-4">
        {days.map(date => {
          const status = getDateStatus(date, events);
          const dayNumber = Number(date.split('-')[2]);
          return (
            <div
              key={date}
              className={`h-10 flex items-center justify-center rounded ${statusColors[status]}`}
            >
              {dayNumber}
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
