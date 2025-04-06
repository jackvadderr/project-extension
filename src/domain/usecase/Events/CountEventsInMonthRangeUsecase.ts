import EventRepository from '@/data/repository/impl/EventRepository';

export class CountEventsInMonthRangeUsecase {
  private repository: EventRepository;

  constructor(repository: EventRepository) {
    this.repository = repository;
  }

  async execute(
    startYear: number,
    endYear: number,
    startMonth: number,
    endMonth: number
  ): Promise<{ month: number; count: number; year: number }[]> {
    return await this.repository.countEventsInYearRangeByMonth(
      startYear,
      endYear,
      startMonth,
      endMonth
    );
  }
}
