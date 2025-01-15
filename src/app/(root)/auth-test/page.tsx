import React from "react";

import { auth } from "@/auth";
import { api } from "@/lib/api";

const AuthTest = async () => {
  const resp = await api.business.getBusinessCampaigns();

  console.log(resp);

  const session = await auth();

  return (
    <div>
      <h1>Hello, {session?.user?.name}</h1>
    </div>
  );
};

export default AuthTest;
