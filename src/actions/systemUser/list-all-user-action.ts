"use server";

import UserRepository from '@/data/repository/impl/UserRepository';
import { ListAllUserUsecase } from '@/domain/usecase/User/ListAllUserUsecase';
import { User } from '@prisma/client';

export async function listAllUserAction(): Promise<User[]> {
  const repository = new UserRepository();
  const usecase = new ListAllUserUsecase(repository);

  return await usecase.execute();
}