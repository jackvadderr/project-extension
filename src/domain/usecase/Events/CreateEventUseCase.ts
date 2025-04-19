import EventRepository from '@/data/repository/impl/EventRepository';
import { Event, Prisma } from '@prisma/client';

export class CreateEventUsecase {
  private repository: EventRepository;

  constructor(repository: EventRepository) {
    this.repository = repository;
  }

  async execute(data: Prisma.EventCreateInput): Promise<Event> {
    return await this.repository.create(data);
  }
}
