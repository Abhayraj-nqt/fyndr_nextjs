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

  return (
    <section>
      <main className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          preload="none"
          className="absolute inset-0 size-full object-cover"
        >
          <source src="/videos/auth-overlay-web.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 flex size-full items-center justify-center">
          {children}
        </div>
      </main>
    </section>
  );
};

export default AuthLayout;
