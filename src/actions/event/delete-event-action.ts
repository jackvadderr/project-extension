"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { DeleteEventUsecase } from '@/domain/usecase/Events/DeleteEventUsecase';

export async function deleteEventsAction(ids: number[]): Promise<void> {
  const repository = new EventRepository();
  const usecase = new DeleteEventUsecase(repository);

  await Promise.all(ids.map(id => usecase.execute(id)));
}
