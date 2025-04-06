import EventRepository from '@/data/repository/impl/EventRepository';

export class CountEventDistribuitionUsecase {
  private repository: EventRepository;

  constructor(repository: EventRepository) {
    this.repository = repository;
  }

  async execute(): Promise<{ event_type: string, count: number }[]> {
    return await this.repository.countEventsByType();
  }
}
