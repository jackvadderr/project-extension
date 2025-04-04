import EventRepository from '@/data/repository/impl/EventRepository';

export class CountEventsInMonthRangeUsecase {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async execute(
    year: number,
    monthStart: number,
    monthEnd: number
  ): Promise<{ month: number; count: number; year: number }[]> {
    return await this.eventRepository.countEventsInMonthRange(
      year,
      monthStart,
      monthEnd
    );
  }
}
