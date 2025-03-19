import EventListPage from "@/components/dashboard/events/EventListPage";
import EventRepository from "@/data/repository/impl/EventRepository";
import { ListAllEventsUsecase } from "@/domain/usecase/ListAllEventsUseCase";
import { Event } from "@/types/Event";

export default async function DashboardEventsPage() {
  const eventRepository = new EventRepository();
  const findAllEventsUsecase = new ListAllEventsUsecase(eventRepository);

  // Busca os eventos no banco de dados
  const rawEvents = await findAllEventsUsecase.execute();

  // Mapeia os eventos para o tipo correto
  const events: Event[] = rawEvents.map((event: any) => ({
    id: event.id,
    name: event.name,
    date: event.start_date.toISOString(),
    location: event.location,
    organizer: event.responsible || "Desconhecido",
    status: event.status || "Indefinido",
    max_capacity: event.max_capacity,
  }));

  return <EventListPage initialEvents={events} />;
}