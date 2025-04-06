"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { CountEventDistribuitionUsecase } from '@/domain/usecase/Events/CountEventDistribuitionUsecase';

export async function getCountEventsDistribuition(): Promise<{ event_type: string, count: number }[]> {
  const repository = new EventRepository();
  const usecase = new CountEventDistribuitionUsecase(repository);

  const countEvents = await usecase.execute();

  return countEvents.map((event: { event_type: string, count: number}) => ({
    event_type: event.event_type,
    count: event.count
  }));
}
