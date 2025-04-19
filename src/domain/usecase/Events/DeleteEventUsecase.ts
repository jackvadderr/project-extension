import EventRepository from '@/data/repository/impl/EventRepository';

export class DeleteEventUsecase {
  private repository: EventRepository;

  constructor(repository: EventRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<void> {
    return await this.repository.delete(id);
  }
}
