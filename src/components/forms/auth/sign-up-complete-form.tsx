"use client";

import { useRegistrationStore } from "@/zustand/stores/registration.store";
import React, { useTransition } from "react";
import { BusinessForm, IndividualForm } from "./sign-up/base-registration-form";
import { BusinessFormData, IndividualFormData } from "./sign-up/schema";
import { signInWithCredentials, signUp } from "@/actions/auth.actions";
import toast from "@/components/global/toast";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import FyndrLoading from "@/components/global/loading/fyndr-loading";
// import BusinessForm from "./business-form";
// import IndividualForm from "./individual-form";
// import IndividualForm2 from "./individual-form-2";

const SignUpCompleteForm = () => {
  const { isBusiness, pwd, regMode, password, reset } = useRegistrationStore();
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const handleSubmitIndividual = async (
    payload: IndividualFormData & { isBusiness: boolean }
  ) => {
    startTransition(async () => {
      if (!pwd) {
        toast.error({
          message: "Password is not set. Please go back to the previous step.",
        });
        return;
      }
      if (!regMode) {
        toast.error({
          message: "RegMode is not set. Please go back to the previous step.",
        });
        return;
      }

      const { success, data, error } = await signUp({
        ...payload,
        isBusiness: false,
        pwd: pwd,
        regMode,
      });

      if (!success && error) {
        toast.error({
          message:
            error.details?.message || "An error occurred during registration.",
        });
        return;
      }

      if (success && data) {
        reset();
        toast.success({
          message: "Registration successful!",
        });
      }

      if (password) {
        const result = await signInWithCredentials({
          email: payload.email,
          password: password,
        });

        if (result.success) {
          toast.success({
            message: "Signed in successfully",
          });

          router.replace(ROUTES.CALLBACK_SIGN_IN);
        } else {
          router.replace(ROUTES.CALLBACK_SIGN_IN);
        }
      } else {
        router.replace(ROUTES.CALLBACK_SIGN_IN);
      }
    });
  };

  const handleSubmitBusiness = async (
    payload: BusinessFormData & { isBusiness: boolean }
  ) => {
    startTransition(async () => {
      if (!pwd) {
        toast.error({
          message: "Password is not set. Please go back to the previous step.",
        });
        return;
      }
      if (!regMode) {
        toast.error({
          message: "RegMode is not set. Please go back to the previous step.",
        });
        return;
      }

      const basePayload = {
        ...payload,
        isBusiness: true,
        pwd: pwd,
        regMode,
      };

      // delete (x as any).bizName;
      delete basePayload.bizName;
      delete basePayload.bizType;
      delete basePayload.website;
      delete basePayload.tags;

      const finalPayload = {
        ...basePayload,
        bizInfo: {
          bizName: payload.bizName,
          bizType: payload.bizType,
          website: payload.website,
          tags: payload.tags.join(", "),
        },
      };

      console.log("Final Payload:", finalPayload);

      const { success, data, error } = await signUp(finalPayload);

      if (!success && error) {
        toast.error({
          message:
            error.details?.message || "An error occurred during registration.",
        });
        return;
      }

      if (success && data) {
        reset();
        toast.success({
          message: "Registration successful!",
        });
      }

      if (password) {
        const result = await signInWithCredentials({
          email: payload.email,
          password: password,
        });

        if (result.success) {
          toast.success({
            message: "Signed in successfully",
          });

          router.replace(ROUTES.CALLBACK_SIGN_IN);
        } else {
          router.replace(ROUTES.CALLBACK_SIGN_IN);
        }
      } else {
        router.replace(ROUTES.CALLBACK_SIGN_IN);
      }

      console.log(data);
    });
  };

  return (
    <>
      {isLoading ? (
        <FyndrLoading />
      ) : (
        <>
          {isBusiness ? (
            <BusinessForm onSubmit={handleSubmitBusiness} />
          ) : (
            <IndividualForm onSubmit={handleSubmitIndividual} />
          )}
        </>
      )}
    </>
  );
};

export default SignUpCompleteForm;
