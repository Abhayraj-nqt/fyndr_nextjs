"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { signInWithCredentials } from "@/actions/auth.actions";
import AuthForm from "@/components/forms/auth/sign-in/auth-form";
import { SignInSchema } from "@/components/forms/auth/sign-in/schema";
import SignupForm from "@/components/forms/auth/sign-up/sign-up-form";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { useRegistrationStore } from "@/zustand/stores/registration.store";

type Props = {
  formType: "SIGN_IN" | "SIGN_UP";
};

const AuthFormWrapper = ({ formType }: Props) => {
  const heading = formType === "SIGN_IN" ? "Login to Continue" : "Get Started";
  const paragraphFirstWord = formType === "SIGN_IN" ? "Don't" : "Already";
  const link = formType === "SIGN_IN" ? ROUTES.SIGN_UP : ROUTES.SIGN_IN;
  const linkText = formType === "SIGN_IN" ? "Sign up" : "Sign in";

  const router = useRouter();
  const setData = useRegistrationStore((state) => state.setData);
  const [selectedUserType, setSelectedUserType] = useState<
    "individual" | "business" | null
  >(null);

  const handleGoBack = () => {
    if (selectedUserType) {
      setSelectedUserType(null);
    } else {
      router.back();
    }
  };

  const handleRegisterBusiness = () => {
    setData({
      isBusiness: true,
      regMode: "classic",
    });
    setSelectedUserType("business");
  };

  const handleRegisterIndividual = () => {
    setData({
      isBusiness: false,
      regMode: "classic",
    });
    setSelectedUserType("individual");
  };

  return (
    <div className="w-full rounded-[10px] bg-dark-100 p-8 md:w-3/4 md:max-w-lg">
      <h1 className="h1-bold">{heading}</h1>
      <div className="paragraph-regular">
        <span>{paragraphFirstWord} have an account?</span>
        <Button
          asChild
          variant={"ghost"}
          className="bg-transparent p-2 text-primary-500 underline hover:bg-transparent hover:text-primary-500"
        >
          <Link href={link}>{linkText}</Link>
        </Button>
      </div>
      {formType === "SIGN_IN" ? (
        <AuthForm
          formType="SIGN_IN"
          schema={SignInSchema}
          defaultValues={{ email: "", password: "" }}
          onSubmit={signInWithCredentials}
        />
      ) : selectedUserType ? (
        <SignupForm userType={selectedUserType} onGoBack={handleGoBack} />
      ) : (
        <div className="mt-8 flex w-full flex-col gap-4">
          <Button
            onClick={handleRegisterBusiness}
            className="min-h-12 w-full rounded-[10px] bg-primary-500 px-4 py-3 text-base font-normal !text-light-900 hover:bg-primary-500"
          >
            Register as a Business
          </Button>
          <Button
            onClick={handleRegisterIndividual}
            className="min-h-12 w-full rounded-[10px] bg-primary-500 px-4 py-3 text-base font-normal !text-light-900 hover:bg-primary-500"
          >
            Register as an Individual
          </Button>
        </div>
      )}

      {formType === "SIGN_IN" ? (
        <div className="body-regular mt-2 text-center">
          <span>Forgot your password?</span>
          <Button
            asChild
            variant={"ghost"}
            className="bg-transparent p-2 text-primary-500 underline hover:bg-transparent hover:text-primary-500"
          >
            <Link href={ROUTES.RESET_PASSWORD}>Reset Password</Link>
          </Button>
        </div>
      ) : (
        !selectedUserType && (
          <>
            <Button
              onClick={handleGoBack}
              className="mb-2 mt-4 min-h-12 w-full rounded-[10px] border border-white bg-transparent px-4 py-3 text-base font-normal text-white hover:bg-transparent"
            >
              Go Back
            </Button>
          </>
        )
      )}
    </div>
  );
};

export default AuthFormWrapper;
