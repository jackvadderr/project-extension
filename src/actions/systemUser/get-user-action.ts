"use server";

import UserRepository from '@/data/repository/impl/UserRepository';
import { User } from '@prisma/client';
import { GetUserByIdUsecase } from '@/domain/usecase/SystemUser/GetUserByIdUsecase';

export async function getUserAction(id: string): Promise<User | null> {
  const repository = new UserRepository();
  const usecase = new GetUserByIdUsecase(repository);

  return await usecase.execute(id);
}