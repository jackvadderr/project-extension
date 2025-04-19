"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { CreateEventUsecase } from '@/domain/usecase/Events/CreateEventUseCase';
import { Event, EventStatus } from '@/types/Event';

export async function createEventAction(eventData: Omit<Event, 'id'>): Promise<Event> {
  const repository = new EventRepository();
  const usecase = new CreateEventUsecase(repository);

  const newEvent = await usecase.execute({
    duration: 0,
    event_type: eventData.event_type,
    rent: parseFloat(String(eventData.rent)),
    name: eventData.name,
    location: eventData.location,
    event_date: new Date(eventData.date),
    max_capacity: eventData.max_capacity,
    status: eventData.status as EventStatus || 'scheduled',
    client: {
      connect: {
        id: eventData.client_id,
      },
    }
  });

  return {
    id: newEvent.id,
    name: newEvent.name,
    description: newEvent.description,
    location: newEvent.location,
    duration: 0,
    rent: 0,
    event_type: newEvent.event_type,
    date: newEvent.event_date.toISOString(),
    status: newEvent.status as EventStatus,
    max_capacity: newEvent.max_capacity,
    client_id: newEvent.clientId,
  };
}
