import db from "@/lib/db/db";
import { Prisma, Task } from "@prisma/client";

export default class TaskRepository {
  async create(todolistData: Prisma.TaskCreateInput): Promise<Task> {
    return db.Task.create({
      data: todolistData,
    });
  }

  async findById(id: string): Promise<Task | null> {
    return db.Task.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Task[]> {
    return db.Task.findMany();
  }

  async update(id: string, todolistData: Partial<Prisma.TaskUpdateInput>): Promise<Task | null> {
    return db.Task.update({
      where: { id },
      data: todolistData,
    });
  }

  async delete(id: string): Promise<void> {
    await db.Task.delete({
      where: { id },
    });
  }
}
