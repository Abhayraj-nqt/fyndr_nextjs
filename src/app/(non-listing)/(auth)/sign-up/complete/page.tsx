import SignUpCompleteForm from "@/components/forms/auth/sign-up-complete-form";
import DefaultCard from "@/components/global/cards/default-card";
import React from "react";

const SignUpComplete = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 p-4">
      <h1 className="paragraph-medium text-primary-500">Register</h1>
      <DefaultCard>
        <SignUpCompleteForm />
      </DefaultCard>
    </div>
  );
};

export default SignUpComplete;
