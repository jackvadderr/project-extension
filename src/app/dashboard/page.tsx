import ReminderCard from '@/components/dashboard/dashboard/cards/todo_list/ReminderCard';
import EventsByMonthChart from '@/components/dashboard/dashboard/charts/LineChart';
import EventDistribution from '@/components/dashboard/dashboard/charts/PieChart';
import MiniEventCardPage from '@/components/dashboard/dashboard/MiniEventCardPage';
import { getEventosByFilter } from '@/actions/find-events-with-filters-action';
import { getCountEventsByMonthAction } from '@/actions/events-by-month-action';
import { getCountEventsDistribuition } from '@/actions/events-distribuition-action';
import EventListCard from '@/components/dashboard/dashboard/cards/events/future/EventCard';
import { allData } from '@/samples/samples';
import { EventCardProps } from '@/types/EventCardProps';

export default async function DashboardPage() {
    const onGoingEvents = await getEventosByFilter({ status: 'ongoing' }, 1, 10, { event_date: 'asc' });
    const eventsByMonth = await getCountEventsByMonthAction(1970, 2025, 1, 12);

    const formattedEventsByMonth = formatEventsByMonth(eventsByMonth);

    const eventsDistribuition = await getCountEventsDistribuition();
    const formattedEventsDistribuition = formatEventsDistribuition(eventsDistribuition);

    const eventsFuture = await getEventosByFilter({ status: 'scheduled' }, 1, 3, { event_date: 'asc' });
    const eventsFutureFormatted = formatEventsForEventListCard(eventsFuture);

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
              <EventListCard events={eventsFutureFormatted} />
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
}

const formatEventsByMonth = (eventsByMonth: { month: number, count: number, year: number }[]) => {
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
      value: event.count,
      percentageLabel: `${percentage.toFixed(1)}%`,
      count: event.count,
      color: colors[index % colors.length]
    };
  });
};


function formatEventsForEventListCard(events: Event[]): EventCardProps[] {
  return events.map(event => ({
    title: event.name,
    location: event.location,
    status: event.status as "scheduled" | "ongoing" | "canceled" | "completed",
    date: event.date
  }));
}
