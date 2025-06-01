'use server';

import { ContactMessage } from '@prisma/client';
import { ListAllContactMessageUsecase } from '@/domain/usecase/ContactMessage/ListAllContactMessageUsecase';
import ContactMessageRepository from '@/data/repository/impl/ContactMessageRepository';

export async function listAllContactMessageAction(): Promise<ContactMessage[]> {
  const repository = new ContactMessageRepository();
  const usecase = new ListAllContactMessageUsecase(repository);

  return await usecase.execute();
}