import { ContactMessage, Prisma } from '@prisma/client';
import ContactMessageRepository from '@/data/repository/impl/ContactMessageRepository';

export class UpdateContactMessageUsecase {
  private repository: ContactMessageRepository;

  constructor(repository: ContactMessageRepository) {
    this.repository = repository;
  }

  async execute(id: string, data: Partial<Prisma.ContactMessageUpdateInput>): Promise<ContactMessage | null> {
    return await this.repository.update(id, data);
  }
}