import EventRepository from "@/data/repository/impl/EventRepository";
import { Prisma, Event } from "@prisma/client";

export class CreateEventUsecase {
  private repository: EventRepository;

  constructor(repository: EventRepository) {
    this.repository = repository;
  }

  async execute(eventData: Prisma.EventCreateInput): Promise<Event> {
    const event = await this.repository.createEvent(eventData);
    return event;
  }
}
