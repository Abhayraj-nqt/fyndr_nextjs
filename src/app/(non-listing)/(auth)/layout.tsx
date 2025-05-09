import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  const session = await auth();

  if (session && session.user) redirect("/callback/sign-in");

  return <section>{children}</section>;
};

export default AuthLayout;
