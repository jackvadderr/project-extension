import EventRepository from "@/data/repository/impl/EventRepository";
import { Event } from "@prisma/client";

export class ListAllEventsUsecase {
    private eventRepository: EventRepository;

    constructor(eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute(): Promise<Event[]> {
        const events = await this.eventRepository.findAllEvents();
        return events;
    }
}