"use client";

import { signInWithCredentials } from "@/actions/auth.actions";
import AuthForm from "@/components/forms/auth/auth-form";
import { SignInSchema } from "@/components/forms/auth/schema";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  formType: "SIGN_IN" | "SIGN_UP";
};

const AuthFormWrapper = ({ formType }: Props) => {
  const heading = formType === "SIGN_IN" ? "Login to Continue" : "Get Started";
  const paragraphFirstWord = formType === "SIGN_IN" ? "Don't" : "Already";
  const link = formType === "SIGN_IN" ? ROUTES.SIGN_UP : ROUTES.SIGN_IN;
  const linkText = formType === "SIGN_IN" ? "Sign up" : "Sign in";

  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <div className="w-full rounded-lg bg-dark-100 p-8 md:w-3/4 md:max-w-lg ">
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
      ) : (
        <></>
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
        <>
          <Button
            onClick={handleGoBack}
            className="paragraph-medium min-h-12 w-full rounded-2 bg-transparent px-4 py-3 border border-white text-white hover:bg-transparent"
          >
            Go Back
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthFormWrapper;
