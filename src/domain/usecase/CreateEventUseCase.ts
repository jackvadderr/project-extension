import EventRepository from "@/data/repository/impl/EventRepository";
import { Prisma, Event } from "@prisma/client";

export class CreateEventUsecase {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async execute(eventData: Prisma.EventCreateInput): Promise<Event> {
    const event = await this.eventRepository.createEvent(eventData);
    return event;
  }
}
