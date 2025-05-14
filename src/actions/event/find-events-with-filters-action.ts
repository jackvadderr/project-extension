"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { FindEventsWithFiltersUsecase } from '@/domain/usecase/Events/FindEventosWithFiltersUsecase';
import { EventStatus } from '@/types/Event';
import { Prisma } from '@prisma/client';

export async function getEventosByFilter(
  filters: Prisma.EventWhereInput,
  page: number,
  pageSize: number,
  orderBy: Prisma.EventOrderByWithRelationInput
): Promise<{
  id: number;
  name: string;
  description: any;
  date: any;
  location: string;
  status: "scheduled" | "ongoing" | "canceled" | "completed" | "indefinido" | string;
  max_capacity: number
}[]> {
  const repository = new EventRepository();
  const usecase = new FindEventsWithFiltersUsecase(repository);

  const events = await usecase.execute(filters, page, pageSize, orderBy);

  return events.map((event) => ({
    id: event.id,
    name: event.name,
    description: event.description,
    date: event.event_date.toISOString(),
    location: event.location,
    status: (event.status as EventStatus) || 'Indefinido',
    max_capacity: event.max_capacity,
  }));
}
