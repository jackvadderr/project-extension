"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { Event, EventStatus } from '@/types/Event';
import { UpdateEventUsecase } from '@/domain/usecase/Events/UpdateEventUsecase';

export async function updateEventAction(id: number, eventData: Partial<Event>): Promise<Event> {
  const repository = new EventRepository();
  const usecase = new UpdateEventUsecase(repository);

  const updateData = {
    ...(eventData.duration !== undefined && { duration: Number(eventData.duration) }),
    ...(eventData.event_type && { event_type: eventData.event_type }),
    ...(eventData.rent !== undefined && { rent: parseFloat(String(eventData.rent)) }),
    ...(eventData.name && { name: eventData.name }),
    ...(eventData.location && { location: eventData.location }),
    ...(eventData.date && { event_date: new Date(eventData.date) }),
    ...(eventData.max_capacity !== undefined && { max_capacity: eventData.max_capacity }),
    ...(eventData.status && { status: eventData.status as EventStatus }),
    ...(eventData.client_id && {
      client: {
        connect: {
          id: eventData.client_id,
        },
      }
    })
  };

  const newEvent = await usecase.execute(id, updateData);

  if (!newEvent) {
    throw new Error('Failed to update event');
  }

  return {
    id: newEvent.id,
    name: newEvent.name,
    description: newEvent.description ?? '',
    location: newEvent.location,
    duration: newEvent.duration,
    rent: newEvent.rent,
    event_type: newEvent.event_type ?? '',
    date: newEvent.event_date.toISOString(),
    status: newEvent.status as EventStatus,
    max_capacity: newEvent.max_capacity,
    client_id: newEvent.clientId,
  };
}
