"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegistrationStore } from "@/zustand/stores/registration.store";

import { z } from "zod";
import {
  IndividualSignUpSchema,
  BusinessSignUpSchema,
} from "@/components/forms/auth/schema";
import EmailStep from "./email-step";
import PasswordStep from "./password-step";
// import BusinessInfoStep from "./business-form";
// import IndividualInfoStep from "./individual-form";
// import { encryptPassword } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SignupFormProps = {
  userType: "individual" | "business";
  onGoBack: () => void;
};

const SignUpForm = ({ userType, onGoBack }: SignupFormProps) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const setData = useRegistrationStore((state) => state.setData);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (step === 1) {
      onGoBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = (formData: any) => {
    const combinedData = {
      ...formData,
      email,
      isBusiness: userType === "business",
      regMode: "classic",
    };

    const schema =
      userType === "business" ? BusinessSignUpSchema : IndividualSignUpSchema;

    try {
      // Validate with Zod
      schema.parse(combinedData);

      // Save to store
      setData(combinedData);

      // In a real app, you'd submit this data to your API
      console.log("Submitting registration data:", combinedData);

      // Navigate to success or verification page
      router.push("/auth/registration-success");
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      }
      // Handle errors appropriately
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EmailStep userType={userType} onNextStep={handleNextStep} />;
      case 2:
        return <PasswordStep requireVerification={userType === "business"} />;
      // case 3:
      //   return userType === "business" ? (
      //     <BusinessInfoStep onSubmit={handleFinalSubmit} />
      //   ) : (
      //     <IndividualInfoStep onSubmit={handleFinalSubmit} />
      //   );
      default:
        return null;
    }
  };

  return (
    <>
      {renderStep()}
      <Button
        onClick={handlePrevStep}
        className="mt-4 mb-2 text-base font-normal min-h-12 w-full rounded-[10px] bg-transparent px-4 py-3 border border-white text-white hover:bg-transparent"
      >
        Go Back
      </Button>
    </>
  );
};

export default SignUpForm;
