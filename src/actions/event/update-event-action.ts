"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { Event, EventStatus } from '@/types/Event';
import { UpdateEventUsecase } from '@/domain/usecase/Events/UpdateEventUsecase';
import { Prisma } from '@prisma/client';

export async function updateEventAction(id: number, eventData: Partial<Prisma.EventUpdateInput>): Promise<Event> {
  const repository = new EventRepository();
  const usecase = new UpdateEventUsecase(repository);

  const newEvent = await usecase.execute(
    id,
    {
      duration: 0,
      event_type: eventData.event_type,
      rent: parseFloat(String(eventData.rent)),
      name: eventData.name,
      location: eventData.location,
      event_date: eventData.event_date,
      max_capacity: eventData.max_capacity,
      status: eventData.status as EventStatus || 'scheduled'
    }
  );

  if (!newEvent) {
    throw new Error('Failed to update event');
  }

  return {
    id: newEvent.id,
    name: newEvent.name,
    description: newEvent.description ?? '',
    location: newEvent.location,
    duration: 0,
    rent: 0,
    event_type: newEvent.event_type ?? '',
    date: newEvent.event_date.toISOString(),
    status: newEvent.status as EventStatus,
    max_capacity: newEvent.max_capacity
  };
}
