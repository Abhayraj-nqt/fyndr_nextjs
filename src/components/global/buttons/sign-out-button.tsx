"use client";

import { signOut } from "next-auth/react";

import { toast } from "@/components/global/toast";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const SignOutButton = ({ children, className }: Props) => {
  const handleLogout = async () => {
    try {
      await signOut({ redirectTo: ROUTES.HOME });
    } catch {
      toast.error({
        message: "Error signing out",
      });
    }
  };

  return (
    <Button variant={"ghost"} onClick={handleLogout} className={`${className}`}>
      {children}
    </Button>
  );
};

export default SignOutButton;
