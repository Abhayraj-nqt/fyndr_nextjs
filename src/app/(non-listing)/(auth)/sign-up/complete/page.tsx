import React from "react";

import SignUpCompleteForm from "@/components/forms/auth/sign-up/sign-up-complete-form";
import DefaultCard from "@/components/global/cards/default-card";

const SignUpComplete = () => {
  return (
    <div className="flex-center min-h-screen flex-col overflow-x-hidden sm:p-4">
      <h1 className="h3-semibold ml-6 w-full max-w-screen-lg py-8 text-left text-primary-500 xs:w-11/12 sm:ml-0">
        Register
      </h1>
      <DefaultCard className="mb-10 max-w-screen-lg overflow-x-hidden p-4 pt-8 xs:w-11/12 sm:pt-8 md:p-8">
        <SignUpCompleteForm />
      </DefaultCard>
    </div>
  );
};

export default SignUpComplete;
