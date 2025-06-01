import ContactMessageRepository from '@/data/repository/impl/ContactMessageRepository';

export class DeleteContactMessageUsecase {
  private repository: ContactMessageRepository;

  constructor(repository: ContactMessageRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}