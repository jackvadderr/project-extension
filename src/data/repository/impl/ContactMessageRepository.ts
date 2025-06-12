import db from "@/lib/db/db";
import { Prisma, ContactMessage } from "@prisma/client";

export default class ContactMessageRepository {
  async create(data: Prisma.ContactMessageCreateInput): Promise<ContactMessage> {
    return db.contactMessage.create({
      data: data,
    });
  }

  async findById(id: string): Promise<ContactMessage | null> {
    return db.contactMessage.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<ContactMessage[]> {
    return db.contactMessage.findMany();
  }

  async update(id: string, todolistData: Partial<Prisma.ContactMessageUpdateInput>): Promise<ContactMessage | null> {
    return db.contactMessage.update({
      where: { id },
      data: todolistData,
    });
  }

  async delete(id: string): Promise<void> {
    await db.contactMessage.delete({
      where: { id },
    });
  }
}
