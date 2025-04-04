import ReminderCard from '@/components/dashboard/dashboard/cards/todo_list/ReminderCard';
import EventCard from '@/components/dashboard/dashboard/cards/events/future/EventCard';
import EventsByMonthChart from '@/components/dashboard/dashboard/charts/LineChart';
// import MiniEventCard from '@/components/dashboard/dashboard/cards/events/current/MiniEventCard';
import EventDistribution from '@/components/dashboard/dashboard/charts/PieChart';
import MiniEventCardPage from '@/components/dashboard/dashboard/MiniEventCardPage';
import { getEventosByFilter } from '@/actions/find-events-with-filters-action';
import { getCountEventsByMonthAction } from '@/actions/events-by-month-action';
import { getCountEventsDistribuition } from '@/actions/events-distribuition-action';

const formatEventsByMonth = (eventsByMonth: { month: number, count: number, year: number }[]) => {
  // Mapeia os meses numéricos para abreviações em português
  const monthAbbreviations = [
    'Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  console.log('Dados recebidos por formatEventsByMonth:', eventsByMonth);

  return [
    {
      id: 'eventos',
      data: eventsByMonth.map(item => ({
        x: monthAbbreviations[item.month - 1], // month é 1-12, array é 0-11
        y: item.count,
        year: item.year
      }))
    }
  ];
};

const formatEventsDistribuition = (eventsDistribuition: { event_type: string, count: number }[]) => {
  const colors = [
    "hsl(205, 70%, 50%)",
    "hsl(100, 70%, 50%)",
    "hsl(50, 70%, 50%)",
    "hsl(300, 70%, 50%)"
  ];

  const total = eventsDistribuition.reduce((sum, event) => sum + event.count, 0);

  console.log(eventsDistribuition)
  return eventsDistribuition.map((event, index) => {
    const percentage = ((event.count / total) * 100);
    return {
      id: event.event_type,
      label: event.event_type,
      value: event.count, // mantém o valor real para o gráfico
      percentageLabel: `${percentage.toFixed(1)}%`,
      count: event.count,
      color: colors[index % colors.length]
    };
  });
};



export default async function DashboardPage() {
  // try {
    const onGoingEvents = await getEventosByFilter({ status: 'scheduled' }, 1, 10, { event_date: 'asc' });
    const eventsByMonth = await getCountEventsByMonthAction(1970, 2025, 1, 12);

    const formattedEventsByMonth = formatEventsByMonth(eventsByMonth);

    const eventsDistribuition = await getCountEventsDistribuition();
    const formattedEventsDistribuition = formatEventsDistribuition(eventsDistribuition);

    const allData = [
      {
        id: 'eventos',
        data: [
          { x: 'Out', y: 7, year: 2024 },
          { x: 'Nov', y: 9, year: 2024 },
          { x: 'Dez', y: 15, year: 2024 },
          { x: 'Jan', y: 8, year: 2025 },
          { x: 'Feb', y: 5, year: 2025 },
          { x: 'Mar', y: 10, year: 2025 },
          { x: 'Abr', y: 7, year: 2025 },
          { x: 'Mai', y: 6, year: 2025 },
          { x: 'Jun', y: 9, year: 2025 },
          { x: 'Jul', y: 4, year: 2025 },
          { x: 'Ago', y: 11, year: 2025 },
          { x: 'Set', y: 3, year: 2025 },
          { x: 'Out', y: 12, year: 2025 },
          { x: 'Nov', y: 5, year: 2025 },
          { x: 'Dez', y: 8, year: 2025 }
        ]
      }
    ];

  const eventData = [
    {
      id: "Festa de Aniversário",
      label: "Festa de Aniversário",
      value: 40,
      color: "hsl(205, 70%, 50%)"
    },
    {
      id: "Churrasco",
      label: "Churrasco",
      value: 30,
      color: "hsl(100, 70%, 50%)"
    },
    {
      id: "Reunião",
      label: "Reunião",
      value: 20,
      color: "hsl(50, 70%, 50%)"
    },
    {
      id: "Workshop",
      label: "Workshop",
      value: 10,
      color: "hsl(300, 70%, 50%)"
    }
  ];

    return (
      <>
        {/* Primeira linha */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Eventos em andamento */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold">Eventos em andamento</h2>
            <div className="grid gap-4 mt-4 max-h-60 overflow-auto">
              <MiniEventCardPage events={onGoingEvents} />
            </div>
          </div>

          {/* Quantidade de eventos por mês */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold">Quantidade de eventos por mês</h2>
            <div className="h-60 overflow-hidden">
              <EventsByMonthChart data={allData} />
            </div>
          </div>

          {/* Distribuição de eventos */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold">Distribuição de eventos</h2>
            <div className="h-60 overflow-hidden">
              <EventDistribution data={formattedEventsDistribuition} />
            </div>
          </div>
        </div>

        {/* Segunda linha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Eventos futuros */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold">Eventos futuros</h2>
            <div className="grid gap-4 mt-4 max-h-60 overflow-auto">
              <EventCard
                title="Festa de aniversário"
                location="R. Nicarágua, 1226 - Nova Porto Velho, Porto Velho - RO, 76820-830"
                status="upcoming"
                participants={37}
                maxParticipants={40}
              />
            </div>
          </div>

          {/* Lembretes */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold">Lembretes</h2>
            <div className="grid gap-4 mt-4 max-h-60 overflow-auto">
              <ReminderCard
                title="Monitorar a carne"
                description="Certificar-se de que não vai faltar carne."
              />
              <ReminderCard
                title="Monitorar bebidas"
                description="Certificar-se de que tudo está servido no tempo certo."
              />
            </div>
          </div>
        </div>
      </>
    );
  // } catch {
  //   // console.error('Error:', e);
  //   return (
  //     <div className="bg-red-100 text-red-700 p-4 rounded-md">
  //       <p>Falha ao carregar os dados do dashboard. Tente novamente mais tarde.</p>
  //     </div>
  //   );
  // }
}
