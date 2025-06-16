"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import toast from "@/components/global/toast";
import ROUTES from "@/constants/routes";

const AuthRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const email = searchParams.get("email");
    const provider = searchParams.get("provider");

    // Get the original intent from sessionStorage
    const originalIntent = sessionStorage.getItem("oauth_intent");

    // Clear the intent
    sessionStorage.removeItem("oauth_intent");

    switch (status) {
      case "success":
        // Successful authentication - redirect to main callback
        router.replace(ROUTES.CALLBACK_SIGN_IN);
        break;

      case "user_not_found":
        if (originalIntent === "SIGN_IN") {
          // User tried to login but account doesn't exist
          toast.error({
            message: "Account not found",
            description: `No account exists with email ${email}. Please register to continue.`,
          });
          router.replace(ROUTES.SIGN_UP);
        } else {
          // User is registering - redirect to complete profile
          router.replace(
            `${ROUTES.SIGN_UP_COMPLETE}?email=${email}&provider=${provider}`
          );
        }
        break;

      case "error":
        toast.error({
          message: "Authentication failed",
          description:
            "An error occurred during authentication. Please try again.",
        });
        router.replace(ROUTES.SIGN_IN);
        break;

      default:
        // No status parameter - redirect to sign in
        router.replace(ROUTES.SIGN_IN);
    }
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-b-2 border-primary"></div>
        <p className="text-lg">Processing authentication...</p>
      </div>
    </div>
  );
};

export default AuthRedirect;
