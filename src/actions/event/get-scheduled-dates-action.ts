"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { FindEventsWithFiltersUsecase } from '@/domain/usecase/Events/FindEventosWithFiltersUsecase';
import { Prisma } from '@prisma/client';

export async function getScheduledDatesAction(): Promise<string[]> {
  const repository = new EventRepository();
  const usecase = new FindEventsWithFiltersUsecase(repository);

  const filters: Prisma.EventWhereInput = {};

  const events = await usecase.execute(filters, 1, 100, { event_date: 'asc' });

  return events.map(event =>
    new Date(event.event_date).toISOString().split('T')[0]
  );
}