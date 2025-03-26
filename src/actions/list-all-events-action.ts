"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { ListAllEventsUsecase } from '@/domain/usecase/ListAllEventsUseCase';
import { Event, EventStatus } from '@/types/Event';

export async function getEvents(): Promise<Event[]> {
  const eventRepository = new EventRepository();
  const findAllEventsUsecase = new ListAllEventsUsecase(eventRepository);

  const rawEvents = await findAllEventsUsecase.execute();

  return rawEvents.map((event) => ({
    id: event.id,
    name: event.name,
    date: event.start_date.toISOString(),
    location: event.location,
    organizer: event.responsible || 'Desconhecido',
    status: (event.status as EventStatus) || 'Indefinido',
    max_capacity: event.max_capacity,
  }));
}
