"use client";

import React, { useState } from "react";
import EmailStep from "./sign-up/email-step";
import PasswordStep from "./sign-up/password-step";
import { Button } from "@/components/ui/button";

type SignupFormProps = {
  userType: "individual" | "business";
  onGoBack: () => void;
};

const SignUpForm = ({ userType, onGoBack }: SignupFormProps) => {
  const [step, setStep] = useState(1);

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

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EmailStep userType={userType} onNextStep={handleNextStep} />;
      case 2:
        return <PasswordStep requireVerification={userType === "business"} />;
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
