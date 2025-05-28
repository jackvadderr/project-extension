'use server';

import { signIn } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";

export async function signInWithCredentials(formData: FormData) {
  await executeAction({
    actionFn: async () => {
      await signIn("credentials", formData);
    },
  });
}
