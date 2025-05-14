"use server";

import UserRepository from '@/data/repository/impl/UserRepository';
import { User } from '@prisma/client';
import { ListAllUserUsecase } from '@/domain/usecase/SystemUser/ListAllUserUsecase';

export async function listAllUserAction(): Promise<User[]> {
  const repository = new UserRepository();
  const usecase = new ListAllUserUsecase(repository);

  return await usecase.execute();
}