import { ContactMessage } from '@prisma/client';
import ContactMessageRepository from '@/data/repository/impl/ContactMessageRepository';

export class ListAllContactMessageUsecase {
  private repository: ContactMessageRepository;

  constructor(repository: ContactMessageRepository) {
    this.repository = repository;
  }

  async execute(): Promise<ContactMessage[]> {
    return await this.repository.findAll();
  }
}