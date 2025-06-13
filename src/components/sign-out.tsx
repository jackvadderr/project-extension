"use client";

import { Button } from "@/components/ui/button";
import { SAIR } from "@/constants/constants";
import { signOut } from "next-auth/react";
import type { ButtonHTMLAttributes } from "react";

interface SignOutProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOut = ({ className, ...props }: SignOutProps) => {
  const handleSignOut = async () => {
    await signOut({ redirectTo: "/home" });
  };

  return (
    <div className="flex justify-center">
      <Button
        variant="destructive"
        onClick={handleSignOut}
        className={className}
        {...props}
      >
        {SAIR}
      </Button>
    </div>
  );
};

export { SignOut };
