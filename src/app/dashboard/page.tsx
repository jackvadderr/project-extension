import { getEventosByFilter } from '@/actions/event/find-events-with-filters-action';
import { getCountEventsByMonthAction } from '@/actions/event/events-by-month-action';
import { getCountEventsDistribuition } from '@/actions/event/events-distribuition-action';
import DashboardClientWrapper from '@/components/dashboard/dashboard/DashboardClientWrapper';

export default async function DashboardPage() {
  const onGoingEvents = await getEventosByFilter({ status: 'ongoing' }, 1, 1, { event_date: 'asc' });
  const eventsByMonth = await getCountEventsByMonthAction(1970, 2025, 1, 12);
  const eventsDistribuition = await getCountEventsDistribuition();
  const eventsFuture = await getEventosByFilter({ status: 'scheduled' }, 1, 3, { event_date: 'asc' });

  return (
    <DashboardClientWrapper
      onGoingEvents={onGoingEvents}
      eventsByMonthFormatted={formatEventsByMonth(eventsByMonth)}
      eventsDistribuitionFormatted={formatEventsDistribuition(eventsDistribuition)}
      eventsFutureFormatted={formatEventsForEventListCard(eventsFuture)}
    />
  );
}

const formatEventsByMonth = (eventsByMonth: { month: number, count: number, year: number }[]) => {
  const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return [
    {
      id: 'eventos',
      data: eventsByMonth.map(item => ({
        x: monthAbbreviations[item.month - 1],
        y: item.count,
        year: item.year
      }))
    }
  ];
};

const formatEventsDistribuition = (eventsDistribuition: { event_type: string, count: number }[]) => {
  const colors = ["hsl(205, 70%, 50%)", "hsl(100, 70%, 50%)", "hsl(50, 70%, 50%)", "hsl(300, 70%, 50%)"];
  const total = eventsDistribuition.reduce((sum, event) => sum + event.count, 0);
  return eventsDistribuition.map((event, index) => ({
    id: event.event_type,
    label: event.event_type,
    value: event.count,
    percentageLabel: `${((event.count / total) * 100).toFixed(1)}%`,
    count: event.count,
    color: colors[index % colors.length]
  }));
};

function formatEventsForEventListCard(events: any[]) {
  return events.map(event => ({
    title: event.name,
    location: event.location,
    status: event.status as "scheduled" | "ongoing" | "canceled" | "completed",
    date: event.date
  }));
}
