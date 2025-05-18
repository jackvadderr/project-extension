"use server"

import { hashPassword } from "@/utils/crypto-utils";

export async function hashPasswordAction(plain: string): Promise<string> {
  if (!plain) throw new Error("Password is required");

  try {
    return await hashPassword(plain);
  } catch (error) {
    throw new Error("Failed to hash password");
  }
}