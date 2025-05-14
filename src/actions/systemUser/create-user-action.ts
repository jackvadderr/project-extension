"use server";

import { Prisma, User } from '@prisma/client';
import UserRepository from '@/data/repository/impl/UserRepository';
import { CreateUserUsecase } from '@/domain/usecase/SystemUser/CreateUserUsecase';

export async function createUserAction(data: Prisma.UserCreateInput): Promise<User> {
  const repository = new UserRepository();
  const usecase = new CreateUserUsecase(repository);

  return await usecase.execute(data);
}