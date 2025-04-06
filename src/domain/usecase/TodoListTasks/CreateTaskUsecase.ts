import { Prisma, Task } from '@prisma/client';
import TaskRepository from '@/data/repository/impl/TaskRepository';

export class CreateTaskUsecase {
  private repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async execute(eventData: Prisma.TaskCreateInput): Promise<Task> {
    return await this.repository.create(eventData);
  }
}
