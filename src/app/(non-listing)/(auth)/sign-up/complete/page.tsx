import SignUpCompleteForm from "@/components/forms/auth/sign-up-complete-form";
import DefaultCard from "@/components/global/cards/default-card";
import React from "react";

const SignUpComplete = () => {
  return (
    <div className="flex-center min-h-screen flex-col p-4">
      <h1 className="paragraph-medium text-primary-500 w-full text-left max-w-screen-lg xs:w-11/12">
        Register
      </h1>
      <DefaultCard className="my-10 max-w-screen-lg overflow-x-hidden p-2 pt-8 xs:w-11/12 sm:p-4 md:p-8 sm:pt-8">
        <SignUpCompleteForm />
      </DefaultCard>
    </div>
  );
};

export default SignUpComplete;
