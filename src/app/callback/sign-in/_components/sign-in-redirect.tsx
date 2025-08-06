/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import FyndrLoading from "@/components/global/loading/fyndr-loading";
import ROUTES from "@/constants/routes";
import { EntityRole } from "@/types/auth/auth.types";

type Props = {
  entityRole: EntityRole;
};

const SignInRedirect = ({ entityRole }: Props) => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");

  const hardRedirect = (url: string) => {
    if (callback) {
      window.location.href = callback;
      return;
    }
    window.location.href = url;
  };

  useEffect(() => {
    const getRedirectUrl = () => {
      switch (entityRole) {
        case "INDIVIDUAL_ADMIN":
          return ROUTES.HOME;
        case "BIZ_ADMIN":
          return ROUTES.BUSINESS_DASHBOARD;
        case "SUPER_ADMIN":
          return ROUTES.ADMIN_DASHBOARD;
        case "FYNDR_SUPPORT":
          return ROUTES.SUPPORT_DASHBOARD;
        default:
          return ROUTES.HOME;
      }
    };

    const redirectUrl = getRedirectUrl();
    hardRedirect(redirectUrl);
  }, [entityRole]);

  return <FyndrLoading loading={true} />;
};

export default SignInRedirect;
