"use client";

import React from "react";

import { signInWithCredentials } from "@/actions/auth.actions";
import AuthForm from "@/components/forms/auth/auth-form";
import { SignInSchema } from "@/components/forms/auth/schema";

const SignIn = () => {
  return (
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
        <div className="flex flex-col items-center justify-center p-4 text-light-900">
          <div className="mb-8 text-center">
            <h1 className="h1-bold text-white">Welcome Back!</h1>
            <p className="paragraph-regular mt-2 text-gray-200">
              Log in to access your account and continue exploring amazing
              offers, events, and services.
            </p>
          </div>

          <AuthForm
            formType="SIGN_IN"
            schema={SignInSchema}
            defaultValues={{ email: "", password: "" }}
            onSubmit={signInWithCredentials}
          />
        </div>
      </div>
    </main>
  );
};

export default SignIn;
