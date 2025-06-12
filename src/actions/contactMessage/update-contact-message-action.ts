'use server';

import { ContactMessage, Prisma } from '@prisma/client';
import ContactMessageRepository from '@/data/repository/impl/ContactMessageRepository';
import { UpdateContactMessageUsecase } from '@/domain/usecase/ContactMessage/UpdateContactMessageUsecase';

export async function updateContactMessageAction(
  id: string,
  data: Partial<Prisma.ContactMessageUpdateInput>,
): Promise<ContactMessage | null> {
  const repository = new ContactMessageRepository();
  const usecase = new UpdateContactMessageUsecase(repository);

  return await usecase.execute(id, data);
}
