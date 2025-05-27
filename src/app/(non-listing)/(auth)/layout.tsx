import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import ROUTES from "@/constants/routes";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  const session = await auth();

  if (session && session.user) redirect(ROUTES.CALLBACK_SIGN_IN);

  return <>{children}</>;
};

export default AuthLayout;
