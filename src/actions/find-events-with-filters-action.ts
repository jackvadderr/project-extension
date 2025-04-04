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
): Promise<{
  id: number;
  name: string;
  description: any;
  date: any;
  location: string;
  status: "scheduled" | "ongoing" | "canceled" | "completed" | "indefinido" | string;
  max_capacity: number
}[]> {
  const eventRepository = new EventRepository();
  const findEventsWithFiltersUsecase = new FindEventsWithFiltersUsecase(eventRepository);

  const events = await findEventsWithFiltersUsecase.execute(filters, page, pageSize, orderBy);

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
  // ?   id?: SortOrder,
  //   ?   name?: SortOrder,
  //   ?   description?: SortOrder | SortOrderInput,
  //   ?   event_date?: SortOrder,
  //   ?   location?: SortOrder,
  //   ?   max_capacity?: SortOrder,
  //   ?   responsible?: SortOrder | SortOrderInput,
  //   ?   status?: SortOrder | SortOrderInput,
  //   ?   event_type?: SortOrder | SortOrderInput,
  //   ?   created_at?: SortOrder,
  //   ?   updated_at?: SortOrder,
  //   ?   duration?: SortOrder | SortOrderInput,
  //   ?   budget?: SortOrder | SortOrderInput
