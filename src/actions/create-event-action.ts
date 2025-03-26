"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { CreateEventUsecase } from '@/domain/usecase/CreateEventUseCase';
import { Event, EventStatus } from '@/types/Event';

export async function createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
  const eventRepository = new EventRepository();
  const createEventUsecase = new CreateEventUsecase(eventRepository);

  const newEvent = await createEventUsecase.execute({
    name: eventData.name,
    location: eventData.location,
    start_date: new Date(eventData.date),
    end_date: new Date(eventData.date),
    responsible: eventData.organizer,
    max_capacity: eventData.max_capacity,
    status: eventData.status as EventStatus || 'scheduled',
  });

  return {
    id: newEvent.id,
    name: newEvent.name,
    location: newEvent.location,
    date: newEvent.start_date.toISOString(),
    organizer: newEvent.responsible || 'Desconhecido',
    status: newEvent.status as EventStatus,
    max_capacity: newEvent.max_capacity,
  };
}
