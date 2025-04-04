import EventRepository from '@/data/repository/impl/EventRepository';

export class CountEventDistribuitionUsecase {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async execute(): Promise<{ event_type: string, count: number }[]> {
    return await this.eventRepository.countEventsByType();
  }
}
