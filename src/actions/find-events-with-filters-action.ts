"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { FindEventsWithFiltersUsecase } from '@/domain/usecase/FindEventosWithFiltersUsecase';
import { Event, EventStatus } from '@/types/Event';
import { Prisma } from '@prisma/client';

export async function getEventosByFilter(
  filters: Prisma.EventWhereInput,
  page: number,
  pageSize: number,
  orderBy: Prisma.EventOrderByWithRelationInput
): Promise<Event[]> {
  const eventRepository = new EventRepository();
  const findEventsWithFiltersUsecase = new FindEventsWithFiltersUsecase(eventRepository);

  const events = await findEventsWithFiltersUsecase.execute(filters, page, pageSize, orderBy);

  return events.map((event) => ({
    id: event.id,
    name: event.name,
    date: event.start_date.toISOString(),
    location: event.location,
    organizer: event.responsible || 'Desconhecido',
    status: (event.status as EventStatus) || 'Indefinido',
    max_capacity: event.max_capacity,
  }));
}
