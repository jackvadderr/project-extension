import TaskRepository from '@/data/repository/impl/TaskRepository';
import { Task } from '@prisma/client';

export class ListAllTaskUsecase {
  private repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Task[]> {
    return await this.repository.findAll();
  }
}