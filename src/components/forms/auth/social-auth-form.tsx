"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import React from "react";

import toast from "@/components/global/toast";
import ROUTES from "@/constants/routes";
import { useRegistrationStore } from "@/zustand/stores/registration.store";

type Props = {
  formType: "SIGN_IN" | "SIGN_UP";
};

type Provider = "google";

const SocialAuthForm = ({ formType }: Props) => {
  const searchParams = useSearchParams();
  const { setData } = useRegistrationStore();
  const callback = searchParams.get("callback");

  const handleSubmit = async (provider: Provider) => {
    // Store the intent in sessionStorage before initiating OAuth
    if (typeof window !== "undefined") {
      sessionStorage.setItem("oauth_intent", formType);
    }

    try {
      setData({ regMode: "google" });

      if (callback) {
        await signIn(provider, {
          redirectTo: `${ROUTES.CALLBACK_SIGN_IN}?callback=${callback}`,
        });
        return;
      }

      await signIn(provider, {
        redirectTo: ROUTES.CALLBACK_SIGN_IN,
      });
    } catch (error) {
      toast.error({
        message: `${formType === "SIGN_IN" ? "Sign-in" : "Sign-up"} failed`,
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during authentication",
      });
    }
  };

  return (
    <Image
      src={"/images/google-login.svg"}
      alt="google-login"
      height={50}
      width={50}
      className="size-11 cursor-pointer"
      onClick={() => handleSubmit("google")}
    />
  );
};

export default SocialAuthForm;
