"use client";

import Image from "next/image";

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

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-[#0000004d]">
      <Image
        src={"/gifs/loader-icon.gif"}
        alt="Loading..."
        height={50}
        width={50}
        className="size-14 rounded-full"
      />
    </div>
  );
};

export default SignInRedirect;
