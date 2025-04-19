import EventListPage from '@/components/dashboard/events/EventListPage';
import { getEvents } from '@/actions/event/list-all-events-action';
import { createEventAction } from '@/actions/event/create-event-action';
import { deleteEventsAction } from '@/actions/event/delete-event-action';
import { updateEventAction } from '@/actions/event/update-event-action';
import { getCustomers } from '@/actions/clients/list-all-customer-action';

export default async function DashboardEventsPage() {
  try {
    const [events, customers] = await Promise.all([
      getEvents(),
      getCustomers()
    ]);

    return (
      <EventListPage
        initialEvents={events}
        createEventAction={createEventAction}
        updateEventAction={updateEventAction}
        deleteEventsAction={deleteEventsAction}
        customers={customers}
      />
    );
  } catch (err) {
    console.error('Error:', err);
    return (
      <p className="text-red-500">
        Falha ao carregar eventos. Tente novamente mais tarde.
      </p>
    );
  }
}
