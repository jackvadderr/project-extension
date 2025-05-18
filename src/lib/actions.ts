import { schema } from "@/lib/schema";
import db from "@/lib/db/db";
import { executeAction } from "@/lib/executeAction";
import { hashPassword } from '@/utils/crypto-utils';

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = schema.parse({ email, password });

      const passwordHash = await hashPassword(validatedData.password);

      await db.user.create({
        data: {
          email: validatedData.email.toLocaleLowerCase(),
          password: passwordHash,
          role: "ADMIN",
        },
      });
    },
    successMessage: "Signed up successfully",
  });
};

export { signUp };
