"use client";
import { Button } from "@/components/ui/button";
import { SAIR } from "@/constants/constants";
import { signOut } from "next-auth/react";

const SignOut = () => {  
  const handleSignOut = async () => {
    await signOut()
  };

  return (
    <div className="flex justify-center">
      <Button variant="destructive" onClick={handleSignOut}>
        {SAIR}
      </Button>
    </div>
  );
};

export { SignOut };