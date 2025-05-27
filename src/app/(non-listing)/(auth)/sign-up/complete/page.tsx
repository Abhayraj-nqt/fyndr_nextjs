import SignUpCompleteForm from "@/components/forms/auth/sign-up-complete-form";
import DefaultCard from "@/components/global/cards/default-card";
import React from "react";

const SignUpComplete = () => {
  return (
    <div className="flex-center min-h-screen flex-col sm:p-4 overflow-x-hidden">
      <h1 className="h3-semibold text-primary-500 w-full text-left max-w-screen-lg xs:w-11/12 py-8 ml-6 sm:ml-0">
        Register
      </h1>
      <DefaultCard className="mb-10 max-w-screen-lg overflow-x-hidden pt-8 xs:w-11/12 p-4 md:p-8 sm:pt-8">
        <SignUpCompleteForm />
      </DefaultCard>
    </div>
  );
};

export default SignUpComplete;
