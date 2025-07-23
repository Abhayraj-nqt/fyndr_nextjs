"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import React from "react";

import ROUTES from "@/constants/routes";

import AnimateFinalStep from "../../animations/animate-final-step";
import Button from "../../buttons";
import toast from "../../toast";

type Props = {
  isEmailUpdated: boolean;
  onClose: () => void;
};

const SignInStep = ({ isEmailUpdated = false, onClose }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the full URL
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const handleSignIn = async () => {
    try {
      await signOut({
        redirectTo: `${ROUTES.SIGN_IN}?callback=${currentUrl}`,
      });
    } catch {
      toast.error({
        message: "Error signing out",
      });
    }
  };

  const handleDone = () => {
    onClose();
  };

  return (
    <div className="flex flex-col gap-6">
      <AnimateFinalStep
        message={
          <div className="h-full">
            <div className="flex-center flex-col gap-2">
              <div className="heading-2-medium text-center text-black-80">
                Hurray!!!
              </div>
              <p className="body-1-medium max-w-96 text-center text-black-70">
                Your email address and password has been successfully updated.
                Please sign-in to proceed.
              </p>
            </div>
            {isEmailUpdated ? (
              <div className="flex-center my-4 gap-2">
                <Button
                  variant="primary"
                  stdHeight
                  stdWidth
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
              </div>
            ) : (
              <div className="flex-center my-4 gap-2">
                <Button
                  variant="primary"
                  stdHeight
                  stdWidth
                  onClick={handleDone}
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};

export default SignInStep;
