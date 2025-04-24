import { Suspense } from 'react';
import EventListPage from '@/components/dashboard/events/EventListPage';
import { getEvents } from '@/actions/event/list-all-events-action';
import { createEventAction } from '@/actions/event/create-event-action';
import { deleteEventsAction } from '@/actions/event/delete-event-action';
import { updateEventAction } from '@/actions/event/update-event-action';
import { listAllCustomers } from '@/actions/clients/list-all-customer-action';

export const metadata = {
  title: 'Eventos - Dashboard',
  description: 'Gerenciamento de eventos'
};

async function EventsDataFetcher() {
  const [events, customers] = await Promise.all([
    getEvents(),
    listAllCustomers()
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
}

export default function DashboardEventsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando eventos...</p>
        </div>
      }
    >
      <EventsDataFetcher />
    </Suspense>
  );
}