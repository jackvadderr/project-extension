import { getEventosByFilter } from '@/actions/event/find-events-with-filters-action';
import { getCountEventsByMonthAction } from '@/actions/event/events-by-month-action';
import { getCountEventsDistribuition } from '@/actions/event/events-distribuition-action';
import DashboardClientWrapper from '@/components/dashboard/dashboard/DashboardClientWrapper';
import { createTaskAction } from '@/actions/task/create-task-action';
import { deleteTaskAction } from '@/actions/task/delete-task-action';
import { listAllTaskAction } from '@/actions/task/listAll-task-action';
import { updateTaskAction } from '@/actions/task/update-task-action';
import { getScheduledDatesAction } from '@/actions/event/get-scheduled-dates-action';


export default async function DashboardPage() {
  const onGoingEvents = await getEventosByFilter({ status: 'ongoing' }, 1, 1, { event_date: 'asc' });
  const eventsByMonth = await getCountEventsByMonthAction(1970, 2025, 1, 12);
  const eventsDistribuition = await getCountEventsDistribuition();
  const currentDate = new Date();
  const eventsFuture = await getEventosByFilter(
    {
      AND: [
        { status: 'scheduled' },
        { event_date: { gte: currentDate } }
      ]
    },
    1,
    3,
    { event_date: 'asc' }
  );
  const tasks = await listAllTaskAction()
  const scheduledDates = await getScheduledDatesAction();

  return (
    <DashboardClientWrapper
      onGoingEvents={onGoingEvents}
      eventsByMonthFormatted={formatEventsByMonth(eventsByMonth)}
      eventsDistribuitionFormatted={formatEventsDistribuition(eventsDistribuition)}
      eventsFutureFormatted={formatEventsForEventListCard(eventsFuture)}
      tasks={tasks}
      createTask={createTaskAction}
      updateTask={updateTaskAction}
      deleteTask={deleteTaskAction}
      scheduledDates={scheduledDates}
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
