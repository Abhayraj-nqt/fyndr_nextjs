"use client";

import FyndrLoading from "@/components/global/loading/fyndr-loading";
import ROUTES from "@/constants/routes";

type Props = {
  entityRole: EntityRole;
};

const SignInRedirect = ({ entityRole }: Props) => {
  const hardRedirect = (url: string) => {
    window.location.href = url;
  };

  switch (entityRole) {
    case "INDIVIDUAL_ADMIN":
      hardRedirect(ROUTES.HOME);
      break;
    case "BIZ_ADMIN":
      hardRedirect(ROUTES.BUSINESS_DASHBOARD);
      break;
    case "SUPER_ADMIN":
      hardRedirect(ROUTES.ADMIN_DASHBOARD);
      break;
    case "FYNDR_SUPPORT":
      hardRedirect(ROUTES.SUPPORT_DASHBOARD);
      break;
    default:
      hardRedirect(ROUTES.HOME);
      break;
  }

  return <FyndrLoading loading={true} />;
};

export default SignInRedirect;
