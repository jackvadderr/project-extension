"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { ListAllEventsUsecase } from '@/domain/usecase/Events/ListAllEventsUseCase';
import { Event, EventStatus } from '@/types/Event';

export async function getEvents(): Promise<{
  id: number;
  name: string;
  description: any;
  date: any;
  location: string;
  max_capacity: number;
  status: "scheduled" | "ongoing" | "canceled" | "completed" | "indefinido" | string;
  event_type: any;
  created_at: any;
  updated_at: any;
  duration: any,
  client_id: any,
  rent: any,
}[]> {
  const repository = new EventRepository();
  const usecase = new ListAllEventsUsecase(repository);

  const rawEvents = await usecase.execute();

  return rawEvents.map((event) => ({
    id: event.id,
    name: event.name,
    description: event.description,
    date: event.event_date,
    location: event.location,
    max_capacity: event.max_capacity,
    status: (event.status as EventStatus) || 'Indefinido',
    event_type: event.event_type,
    created_at: event.created_at,
    updated_at: event.updated_at,
    duration: event.duration,
    rent: event.rent,
    client_id: event.clientId,
  }));
}
