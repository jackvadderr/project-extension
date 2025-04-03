import EventRepository from '@/data/repository/impl/EventRepository';
import { Event, Prisma } from '@prisma/client';

export class FindEventsWithFiltersUsecase {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async execute(
    filters: Prisma.EventWhereInput,
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
