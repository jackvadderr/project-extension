import EventRepository from '@/data/repository/impl/EventRepository';

export class DeleteEventUsecase {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async execute(id: number): Promise<void> {
    return await this.eventRepository.deleteEvent(id);
  }
}
