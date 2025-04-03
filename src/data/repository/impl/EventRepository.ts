import db from "@/lib/db/db";
import { Prisma, Event } from "@prisma/client";

export default class EventRepository {
  async createEvent(eventData: Prisma.EventCreateInput): Promise<Event> {
    return db.event.create({
      data: eventData,
    });
  }

  async findEventById(id: number): Promise<Event | null> {
    return db.event.findUnique({
      where: { id },
    });
  }

  async findAllEvents(): Promise<Event[]> {
    return db.event.findMany();
  }

  async findEventsWithFilters(
    filters: Partial<Prisma.EventWhereInput>,
    page: number,
    pageSize: number,
    orderBy: Prisma.EventOrderByWithRelationInput
  ): Promise<Event[]> {
    return db.event.findMany({
      where: filters,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async updateEvent(id: number, eventData: Partial<Prisma.EventUpdateInput>): Promise<Event | null> {
    return db.event.update({
      where: { id },
      data: eventData,
    });
  }

  async deleteEvent(id: number): Promise<void> {
    await db.event.delete({
      where: { id },
    });
  }
}
