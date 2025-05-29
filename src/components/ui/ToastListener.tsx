"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastListener() {
  const params = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const isLogin = pathname.includes("/sign-in");
    const isRegister = pathname.includes("/sign-up");

    if (params.get("success")) {
      if (isLogin) toast.success("Login realizado com sucesso!");
      else if (isRegister) toast.success("Cadastro concluído com sucesso!");
    }

    const error = params.get("error");
    if (error) {
      toast.error(decodeURIComponent(error));
    }
  }, [params, pathname]);

  return null;
}
