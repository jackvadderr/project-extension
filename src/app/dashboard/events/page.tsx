import EventListPage from '@/components/dashboard/events/EventListPage';
import { getEvents } from '@/actions/list-all-events-action';
import { createEvent } from '@/actions/create-event-action';

export default async function DashboardEventsPage() {
  try {
    const events = await getEvents();
    return <EventListPage initialEvents={events} createEventAction={createEvent} />;
  } catch (err) {
    console.error('Error:', err);
    return <p className="text-red-500">Falha ao carregar eventos. Tente novamente mais tarde.</p>;
  }
}
