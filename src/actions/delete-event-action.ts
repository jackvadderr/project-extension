"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { DeleteEventUsecase } from '@/domain/usecase/DeleteEventUsecase';

export async function deleteEventsAction(ids: number[]): Promise<void> {
  const eventRepository = new EventRepository();
  const usecase = new DeleteEventUsecase(eventRepository);

  await Promise.all(ids.map(id => usecase.execute(id)));
}
