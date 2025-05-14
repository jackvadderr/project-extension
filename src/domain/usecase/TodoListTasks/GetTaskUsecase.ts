import TaskRepository from '@/data/repository/impl/TaskRepository';
import { Task } from "@prisma/client";

export class GetTaskUsecase {
  private repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Task | null> {
    return await this.repository.findById(id);
  }
}