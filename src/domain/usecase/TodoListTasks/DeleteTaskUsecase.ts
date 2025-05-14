import TaskRepository from '@/data/repository/impl/TaskRepository';

export class DeleteTaskUsecase {
  private repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}