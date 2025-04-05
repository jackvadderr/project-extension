"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { CreateEventUsecase } from '@/domain/usecase/CreateEventUseCase';
import { Event, EventStatus } from '@/types/Event';

export async function createEventAction(eventData: Omit<Event, 'id'>): Promise<Event> {
  const eventRepository = new EventRepository();
  const createEventUsecase = new CreateEventUsecase(eventRepository);

  const newEvent = await createEventUsecase.execute({
    duration: 0,
    event_type: eventData.event_type,
    rent: parseFloat(String(eventData.rent)),
    name: eventData.name,
    location: eventData.location,
    event_date: new Date(eventData.date),
    max_capacity: eventData.max_capacity,
    status: eventData.status as EventStatus || 'scheduled'
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
    max_capacity: newEvent.max_capacity
  };
}
