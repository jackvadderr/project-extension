"use server";

import EventRepository from '@/data/repository/impl/EventRepository';
import { CountEventsInMonthRangeUsecase } from '@/domain/usecase/Events/CountEventsInMonthRangeUsecase';

export async function getCountEventsByMonthAction(
  startYear: number,
  endYear: number,
  startMonth: number,
  endMonth: number
): Promise<{ month: number, count: number, year: number }[]> {
  const repository = new EventRepository();
  const usecase = new CountEventsInMonthRangeUsecase(repository);

  const countEvents = await usecase.execute(
    startYear,
    endYear,
    startMonth,
    endMonth
  );

  return countEvents.map((event: { month: number, count: number, year: number }) => ({
    month: event.month,
    count: event.count,
    year: event.year
  }));
}
