import TaskRepository from '@/data/repository/impl/TaskRepository';
import { Prisma, Task } from '@prisma/client';

export class UpdateTaskUsecase {
  private repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async execute(taskId: string, taskData: Partial<Prisma.TaskUpdateInput>): Promise<Task | null> {
    return await this.repository.update(taskId, taskData);
  }
}