import db from "@/lib/db/db";
import { Prisma, User } from "@prisma/client";

export default class TaskRepository {
  async create(todolistData: Prisma.UserCreateInput): Promise<User> {
    return db.user.create({
      data: todolistData,
    });
  }

  async findById(id: string): Promise<User | null> {
    return db.user.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    return db.user.findMany();
  }

  async update(id: string, todolistData: Partial<Prisma.UserUpdateInput>): Promise<User | null> {
    return db.user.update({
      where: { id },
      data: todolistData,
    });
  }

  async delete(id: string): Promise<void> {
    await db.user.delete({
      where: { id },
    });
  }
}
