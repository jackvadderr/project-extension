import { schema } from "@/lib/schema";
import db from "@/lib/db/db";
import { executeAction } from "@/lib/executeAction";
import { hashPassword } from '@/utils/crypto-utils';

const signUp = async (formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const validatedData = schema.parse({ email, password });

    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email.toLowerCase() },
    });

    if (existingUser) {
      return { success: false, error: "Usuário já existe." };
    }

    const passwordHash = await hashPassword(validatedData.password);

    await db.user.create({
      data: {
        email: validatedData.email.toLowerCase(),
        password: passwordHash,
        role: "ADMIN",
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" };
  }
};

export { signUp };
