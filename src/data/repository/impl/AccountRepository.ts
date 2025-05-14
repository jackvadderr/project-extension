import db from "@/lib/db/db";
import { Prisma, Account } from "@prisma/client";

export default class EventRepository {
  async create(eventData: Prisma.AccountCreateInput): Promise<Account> {
    return db.account.create({
      data: eventData,
    });
  }

  async findById(id: string): Promise<Account | null> {
    return db.account.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Account[]> {
    return db.account.findMany();
  }

  async findWithFilters(
    filters: Partial<Prisma.AccountWhereInput>,
    page: number,
    pageSize: number,
    orderBy: Prisma.AccountOrderByWithRelationInput
  ): Promise<Account[]> {
    return db.account.findMany({
      where: filters,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async update(id: string, eventData: Partial<Prisma.AccountUpdateInput>): Promise<Account> {
    return db.account.update({
      where: { id },
      data: eventData,
    });
  }

  async delete(id: string): Promise<void> {
    await db.account.delete({
      where: { id },
    });
  }
}
