import EventRepository from '@/data/repository/impl/EventRepository';
import { Event, Prisma } from '@prisma/client';

export class ListAllEventsUsecase {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async execute(
    filters: Partial<Prisma.EventWhereInput>,
    page: number,
    pageSize: number,
    orderBy: Prisma.EventOrderByWithRelationInput,
  ): Promise<Event[]> {
    return await this.eventRepository.findEventsWithFilters(
      filters,
      page,
      pageSize,
      orderBy,
    );
  }
}
