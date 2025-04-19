import EventRepository from '@/data/repository/impl/EventRepository';
import { Event, Prisma } from '@prisma/client';

export class UpdateEventUsecase {
  private repository: EventRepository;

  constructor(repository: EventRepository) {
    this.repository = repository;
  }

  async execute(id: number, eventData: Partial<Prisma.EventUpdateInput>): Promise<Event | null> {
    return await this.repository.update(id, eventData);
  }
}
