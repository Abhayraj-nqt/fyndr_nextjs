import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ROUTES from "@/constants/routes";

const CompleteSignIn = async () => {
  const session = await auth();

  if (!session || !session.user) redirect("/sign-in");

  const { entityRole } = session.user;

  switch (entityRole) {
    case "INDIVIDUAL_ADMIN":
      return redirect(ROUTES.HOME);
    case "BIZ_ADMIN":
      return redirect(ROUTES.BUSINESS_DASHBOARD);
    case "SUPER_ADMIN":
      return redirect(ROUTES.ADMIN_DASHBOARD);
    case "FYNDR_SUPPORT":
      return redirect(ROUTES.SUPPORT_DASHBOARD);
    default:
      redirect(ROUTES.HOME);
  }
};

export default CompleteSignIn;
