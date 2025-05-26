import db from "@/lib/db/db";
import { Prisma, Customer } from "@prisma/client";

export default class CustomerRepository {
  async create(customerData: Prisma.CustomerCreateInput): Promise<Customer> {
    return db.customer.create({
      data: customerData,
    });
  }

  async findById(id: string): Promise<Customer | null> {
    return db.customer.findUnique({
      where: { id },
    });
  }

  async findManyByIds(ids: string[]): Promise<Customer[]> {
    return db.customer.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findAll(): Promise<Customer[]> {
    return db.customer.findMany();
  }

  async findWithFilters(
    filters: Partial<Prisma.CustomerWhereInput>,
    page: number,
    pageSize: number,
    orderBy: Prisma.CustomerOrderByWithRelationInput
  ): Promise<Customer[]> {
    return db.customer.findMany({
      where: filters,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async update(id: string, customerData: Partial<Prisma.CustomerUpdateInput>): Promise<Customer | null> {
    return db.customer.update({
      where: { id },
      data: customerData,
    });
  }

  async delete(id: string): Promise<void> {
    await db.customer.delete({
      where: { id },
    });
  }
}