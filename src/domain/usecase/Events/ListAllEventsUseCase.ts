import EventRepository from "@/data/repository/impl/EventRepository";
import { Event } from "@prisma/client";

export class ListAllEventsUsecase {
    private repository: EventRepository;

    constructor(repository: EventRepository) {
        this.repository = repository;
    }

    async execute(): Promise<Event[]> {
        const events = await this.repository.findAll();
        return events;
    }
}
