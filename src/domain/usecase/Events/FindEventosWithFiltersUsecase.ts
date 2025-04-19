import EventRepository from '@/data/repository/impl/EventRepository';
import { Event, Prisma } from '@prisma/client';

export class FindEventsWithFiltersUsecase {
  private repository: EventRepository;

  constructor(repository: EventRepository) {
    this.repository = repository;
  }

  async execute(
    filters: Prisma.EventWhereInput,
    page: number,
    pageSize: number,
    orderBy: Prisma.EventOrderByWithRelationInput,
  ): Promise<Event[]> {
    return await this.repository.findWithFilters(
      filters,
      page,
      pageSize,
      orderBy,
    );
  }
}
