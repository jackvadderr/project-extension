import { Prisma, ContactMessage } from '@prisma/client';
import ContactMessageRepository from '@/data/repository/impl/ContactMessageRepository';

export class CreateContactMessageUsecase {
  private repository: ContactMessageRepository;

  constructor(repository: ContactMessageRepository) {
    this.repository = repository;
  }

  async execute(data: Prisma.ContactMessageCreateInput): Promise<ContactMessage> {
    return await this.repository.create(data);
  }
}