"use server";

import { Prisma, User } from '@prisma/client';
import UserRepository from '@/data/repository/impl/UserRepository';
import { UpdateUserUsecase } from '@/domain/usecase/SystemUser/UpdateUserUsecase';

export async function updateUserAction(id: string, data: Partial<Prisma.UserUpdateInput>): Promise<User | null> {
  const repository = new UserRepository();
  const usecase = new UpdateUserUsecase(repository);

  return await usecase.execute(id, data);
}