'use server';

import { signIn } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";
import { redirect } from "next/navigation";

export async function signInWithCredentials(formData: FormData) {
  try {
    await executeAction({
      actionFn: async () => {
        await signIn("credentials", formData);
      },
    });

    const successMsg = encodeURIComponent("Login realizado com sucesso!");
    redirect(`/dashboard?success=${successMsg}`);
  } catch {
    const errorMsg = encodeURIComponent("Erro ao fazer login. Verifique seus dados.");
    redirect(`/sign-in?error=${errorMsg}`);
  }
}
