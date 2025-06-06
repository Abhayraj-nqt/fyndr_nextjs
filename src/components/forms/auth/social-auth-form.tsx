"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";

import toast from "@/components/global/toast";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { useRegistrationStore } from "@/zustand/stores/registration.store";

type Props = {
  formType: "SIGN_IN" | "SIGN_UP";
};

type Provider = "google";

const SocialAuthForm = ({ formType }: Props) => {
  const { setData } = useRegistrationStore();
  const handleSubmit = async (provider: Provider) => {
    // Store the intent in sessionStorage before initiating OAuth

    if (typeof window !== "undefined") {
      sessionStorage.setItem("oauth_intent", formType);
    }

    try {
      setData({ regMode: "google" });
      await signIn(provider, {
        // redirectTo: "/auth/callback", // Custom callback page
        redirectTo: ROUTES.CALLBACK_SIGN_IN,
      });
    } catch (error) {
      console.log(error);
      toast.error({
        message: `${formType === "SIGN_IN" ? "Sign-in" : "Sign-up"} failed`,
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during authentication",
      });
    }

    // try {
    //   await signIn(provider, {
    //     redirectTo: ROUTES.CALLBACK_SIGN_IN,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   toast.error({
    //     message: `${formType === "SIGN_IN" ? "Sign-in" : "Sign-up"} failed`,
    //     description:
    //       error instanceof Error
    //         ? error.message
    //         : "An error occurred during authentication",
    //   });
    // }

    // if (formType === "SIGN_IN") {
    //   await handleSignIn(provider);
    // } else {
    //   // await handleSignUp(provider);
    //   await handleSignIn(provider);
    // }
  };

  // const handleSignIn = async (provider: Provider) => {
  //   try {
  //     await signIn(provider, {
  //       redirectTo: ROUTES.CALLBACK_SIGN_IN,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error({
  //       message: "Sign-in failed",
  //       description:
  //         error instanceof Error
  //           ? error.message
  //           : "An error occured during sign-in",
  //     });
  //   }
  // };

  // const handleSignUp = async (provider: Provider) => {
  //   console.log(provider);
  // };

  return (
    // <Button
    //   type="button"
    //   onClick={() => handleSubmit("google")}
    //   className="m-0 size-fit rounded-full p-0"
    // >
    <Image
      src={"/images/google-login.svg"}
      alt="google-login"
      height={50}
      width={50}
      className="size-11 cursor-pointer"
      onClick={() => handleSubmit("google")}
    />
    // </Button>
  );
};

export default SocialAuthForm;
