import { redirect } from "next/navigation";

import { auth } from "@/auth";

import SignInRedirect from "./_components/sign-in-redirect";

const CompleteSignIn = async () => {
  const session = await auth();

  if (!session || !session.user) redirect("/sign-in");

  const { entityRole } = session.user;

  return (
    <>
      <SignInRedirect entityRole={entityRole} />;
    </>
  );
};

export default CompleteSignIn;
