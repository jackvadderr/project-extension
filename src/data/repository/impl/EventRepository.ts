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



  async countEventsInYearRangeByMonth(
    startYear: number,
    endYear: number,
    startMonth: number,
    endMonth: number
  ): Promise<{ month: number; count: number; year: number }[]> {
    if (startMonth < 1 || startMonth > 12 || endMonth < 1 || endMonth > 12) {
      throw new Error('Months must be between 1 and 12');
    }
    if (startMonth > endMonth) {
      throw new Error('startMonth cannot be greater than endMonth');
    }
    if (startYear > endYear) {
      throw new Error('startYear cannot be greater than endYear');
    }

    const monthlyCounts: Record<string, number> = {};

    for (let year = startYear; year <= endYear; year++) {
      const startDate = new Date(Date.UTC(year, startMonth - 1, 1));
      const endDate = new Date(Date.UTC(year, endMonth, 1)); // Mês seguinte ao final

      const eventsGrouped = await db.event.groupBy({
        by: ["event_date"],
        where: {
          event_date: {
            gte: startDate,
            lt: endDate,
          },
        },
        _count: {
          _all: true,
        },
        orderBy: {
          event_date: "asc",
        },
      });

      eventsGrouped.forEach(({ event_date, _count }) => {
        const month = event_date.getUTCMonth() + 1;
        const key = `${year}-${month}`;
        monthlyCounts[key] = (monthlyCounts[key] || 0) + _count._all;
      });
    }

    return Object.entries(monthlyCounts).map(([key, count]) => {
      const [year, month] = key.split('-').map(Number);
      return { year, month, count };
    }).sort((a, b) => a.year - b.year || a.month - b.month);
  }

}
