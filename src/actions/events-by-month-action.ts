"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { CountEventsInMonthRangeUsecase } from '@/domain/usecase/CountEventsInMonthRangeUsecase';

export async function getCountEventsByMonthAction(
  year: number,
  monthStart: number,
  monthEnd: number
): Promise<{ month: number, count: number, year: number }[]> {
  const eventRepository = new EventRepository();
  const usecase = new CountEventsInMonthRangeUsecase(eventRepository);

  const countEvents = await usecase.execute(year, monthStart, monthEnd);

  return countEvents.map((event: { month: number, count: number, year: number }) => ({
    month: event.month,
    count: event.count,
    year: event.year
  }));
}
