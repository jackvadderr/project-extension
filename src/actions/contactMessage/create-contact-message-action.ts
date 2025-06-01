'use server';

import ContactMessageRepository from '@/data/repository/impl/ContactMessageRepository';
import { CreateContactMessageUsecase } from '@/domain/usecase/ContactMessage/CreateContactMessageUsecase';
import { ContactMessage } from '@prisma/client';

export async function createContactMessageAction(
  data: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt' | 'events'>,
): Promise<ContactMessage> {
  const repository = new ContactMessageRepository();
  const usecase = new CreateContactMessageUsecase(repository);

  return await usecase.execute(data);
}