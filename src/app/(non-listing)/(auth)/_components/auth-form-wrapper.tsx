"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { onSignInWithCredentials } from "@/actions/auth.actions";
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
    <div className="w-full rounded-10 bg-black/80 p-4 backdrop-blur-sm sm:p-8">
      <h1 className="title-6-medium sm:heading-3-medium">{heading}</h1>
      <div className="body-3 text-black-30">
        <span>{paragraphFirstWord} have an account?</span>
        <Button
          asChild
          variant={"ghost"}
          className="bg-transparent p-2 text-primary underline hover:bg-transparent hover:text-primary"
        >
          <Link href={link}>{linkText}</Link>
        </Button>
      </div>
      {formType === "SIGN_IN" ? (
        <AuthForm
          formType="SIGN_IN"
          schema={SignInSchema}
          defaultValues={{ email: "", password: "" }}
          onSubmit={onSignInWithCredentials}
        />
      ) : selectedUserType ? (
        <SignupForm userType={selectedUserType} onGoBack={handleGoBack} />
      ) : (
        <div className="mt-6 flex w-full flex-col gap-4">
          <Button
            onClick={handleRegisterBusiness}
            className="min-h-12 w-full !rounded-10 bg-primary px-4 py-3 text-base font-normal !text-white hover:bg-primary"
          >
            Register as a Business
          </Button>
          <Button
            onClick={handleRegisterIndividual}
            className="min-h-12 w-full !rounded-10 bg-primary px-4 py-3 text-base font-normal !text-white hover:bg-primary"
          >
            Register as an Individual
          </Button>
        </div>
      )}

      {formType === "SIGN_IN" ? (
        <div className="body-3 mt-4 text-center text-black-30">
          <span>Forgot your password?</span>
          <Button
            asChild
            variant={"ghost"}
            className="bg-transparent p-2 text-primary underline hover:bg-transparent hover:text-primary"
          >
            <Link href={ROUTES.RESET_PASSWORD}>Reset Password</Link>
          </Button>
        </div>
      ) : (
        !selectedUserType && (
          <>
            <Button
              onClick={handleGoBack}
              className="mb-2 mt-4 min-h-12 w-full !rounded-10 border border-white bg-transparent px-4 py-3 text-base font-normal text-white hover:bg-transparent"
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
