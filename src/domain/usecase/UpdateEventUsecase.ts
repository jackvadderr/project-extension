import EventRepository from '@/data/repository/impl/EventRepository';
import { Event, Prisma } from '@prisma/client';

export class UpdateEventUsecase {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async execute(id: number, eventData: Partial<Prisma.EventUpdateInput>): Promise<Event | null> {
    return await this.eventRepository.updateEvent(id, eventData);
  }
}
