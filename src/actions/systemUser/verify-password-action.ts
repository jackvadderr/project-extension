// src/actions/systemUser/verify-password-action.ts
"use server";

import { verifyPassword } from '@/utils/crypto-utils';
import UserRepository from '@/data/repository/impl/UserRepository';

export async function verifyPasswordAction(userId: string, currentPassword: string): Promise<boolean> {
  const repository = new UserRepository();
  const user = await repository.findById(userId);

  if (!user?.password) return false;

  return await verifyPassword(user.password, currentPassword);
}