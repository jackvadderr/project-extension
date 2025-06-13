import { schema } from "@/lib/schema";
import db from "@/lib/db/db";
import { executeAction } from "@/lib/executeAction";
import { hashPassword } from '@/utils/crypto-utils';

const signUp = async (formData: FormData) => {
  try {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password) {
      return { success: false, error: "Todos os campos são obrigatórios." };
    }

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
        name,
        email: validatedData.email.toLowerCase(),
        password: passwordHash,
        role: "ADMIN",
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export { signUp };
