import { ContactMessage } from '@prisma/client';
import ContactMessageRepository from '@/data/repository/impl/ContactMessageRepository';

export class GetContactMessageUsecase {
  private repository: ContactMessageRepository;

  constructor(repository: ContactMessageRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<ContactMessage | null> {
    return await this.repository.findById(id);
  }
}