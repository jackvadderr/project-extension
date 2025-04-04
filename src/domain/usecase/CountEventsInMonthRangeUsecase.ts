import EventRepository from '@/data/repository/impl/EventRepository';

export class CountEventsInMonthRangeUsecase {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async execute(
    startYear: number,
    endYear: number,
    startMonth: number,
    endMonth: number
  ): Promise<{ month: number; count: number; year: number }[]> {
    return await this.eventRepository.countEventsInYearRangeByMonth(
      startYear,
      endYear,
      startMonth,
      endMonth
    );
  }
}
