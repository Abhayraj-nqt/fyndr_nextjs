"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useTransition } from "react";

import { onSignInWithCredentials, onSignUp } from "@/actions/auth.actions";
import FyndrLoading from "@/components/global/loading/fyndr-loading";
import toast from "@/components/global/toast";
import ROUTES from "@/constants/routes";
import {
  BusinessSignUpPayload,
  IndividualSignUpPayload,
} from "@/types/auth/auth.types";
import { RegModeProps } from "@/types/global";
import { useRegistrationStore } from "@/zustand/stores/registration.store";

import { BusinessForm, IndividualForm } from "./base-registration-form";
import { BusinessFormData, IndividualFormData } from "./schema";

const SignUpCompleteForm = () => {
  const router = useRouter();
  const { isBusiness, pwd, regMode, password, reset } = useRegistrationStore();
  const [isLoading, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") || ("classic" as RegModeProps);

  const validateRegistrationData = (): boolean => {
    if (!pwd && provider !== "google") {
      toast.error({
        message: "Password is not set. Please go back to the previous step.",
      });
      return false;
    }

    if (!regMode) {
      toast.error({
        message:
          "Registration mode is not set. Please go back to the previous step.",
      });
      return false;
    }

    console.log("validateRegistrationData", { pwd, provider, regMode });

    return true;
  };

  const handleAutoSignIn = async (email: string) => {
    if (provider === "google") {
      await signIn("google", {
        redirectTo: ROUTES.CALLBACK_SIGN_IN,
      });
      return;
    }

    if (!password) {
      router.replace(ROUTES.CALLBACK_SIGN_IN);
      return;
    }

    const result = await onSignInWithCredentials({
      payload: { email, password },
    });

    if (result.success) {
      toast.success({
        message: "Signed in successfully",
      });
    }

    router.replace(ROUTES.CALLBACK_SIGN_IN);
  };

  const transformBusinessPayload = (
    payload: BusinessFormData
  ): BusinessSignUpPayload => {
    const { bizName, bizType, website, tags, ...baseData } = payload;

    return {
      ...baseData,
      isBusiness: true,
      pwd: pwd!,
      regMode: regMode!,
      bizInfo: {
        bizName,
        bizType,
        website,
        tags: tags.join(", "),
      },
    };
  };

  const handleSignUp = async (
    payload: IndividualSignUpPayload | BusinessSignUpPayload
  ) => {
    if (provider === "google") {
      payload.regMode = provider as RegModeProps;
      payload.pwd = null;
    }

    const { success, data, error } = await onSignUp({ payload });

    if (!success && error) {
      toast.error({
        message:
          error.details?.message || "An error occurred during registration.",
      });
      return false;
    }

    if (success && data) {
      reset();
      toast.success({
        message: "Registration successful!",
      });
      return true;
    }

    return false;
  };

  const handleSubmitIndividual = async (
    payload: IndividualFormData & { isBusiness: boolean }
  ) => {
    startTransition(async () => {
      if (!validateRegistrationData()) {
        return;
      }

      const individualPayload: IndividualSignUpPayload = {
        ...payload,
        isBusiness: false,
        pwd: pwd!,
        regMode: regMode!,
      };

      const success = await handleSignUp(individualPayload);
      if (success) {
        await handleAutoSignIn(payload.email);
      }
    });
  };

  const handleSubmitBusiness = async (
    payload: BusinessFormData & { isBusiness: boolean }
  ) => {
    startTransition(async () => {
      if (!validateRegistrationData()) {
        return;
      }

      const businessPayload = transformBusinessPayload(payload);

      const success = await handleSignUp(businessPayload);
      if (success) {
        await handleAutoSignIn(payload.email);
      }
    });
  };

  return (
    <>
      <FyndrLoading loading={isLoading} />
      {isBusiness ? (
        <BusinessForm onSubmit={handleSubmitBusiness} />
      ) : (
        <IndividualForm onSubmit={handleSubmitIndividual} />
      )}
    </>
  );
};

export default SignUpCompleteForm;
