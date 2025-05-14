"use server";

import UserRepository from '@/data/repository/impl/UserRepository';
import { DeleteUserUsecase } from '@/domain/usecase/User/DeleteUserUsecase';

export async function deleteUserAction(id: string): Promise<void> {
  const repository = new UserRepository();
  const usecase = new DeleteUserUsecase(repository);

  await usecase.execute(id);
}