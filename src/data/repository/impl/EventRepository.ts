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

  async countEventsInMonthRange(
    year: number,
    startMonth: number,
    endMonth: number
  ): Promise<{ month: number; count: number; year: number }[]> {
    // Validação dos parâmetros de entrada
    if (startMonth < 1 || startMonth > 12 || endMonth < 1 || endMonth > 12) {
      throw new Error('Months must be between 1 and 12');
    }
    if (startMonth > endMonth) {
      throw new Error('startMonth cannot be greater than endMonth');
    }

    // Cria as datas com o fuso horário UTC explícito
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

    // Agrupa por mês caso haja múltiplos dias com eventos no mesmo mês
    const monthlyCounts: Record<number, number> = {};

    eventsGrouped.forEach(({ event_date, _count }) => {
      const month = event_date.getUTCMonth() + 1;
      monthlyCounts[month] = (monthlyCounts[month] || 0) + _count._all;
    });

    // Converte para o formato de saída esperado
    return Object.entries(monthlyCounts).map(([month, count]) => ({
      month: parseInt(month),
      count,
      year,
    })).sort((a, b) => a.month - b.month);
  }

}
