"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { toast } from "@/hooks/use-toast";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const SignOutButton = ({ children, className }: Props) => {
  const handleLogout = async () => {
    try {
      await signOut({ redirectTo: ROUTES.HOME });
    } catch {
      toast({
        title: "Error signing out",
        variant: "destructive",
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
