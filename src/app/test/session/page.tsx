import React from "react";

import { auth } from "@/auth";

import ClientComponent from "./client-component";

const SessionTestPage = async () => {
  const session = await auth();

  console.log("SERVER SIDE SESSION -> ", session);

  return (
    <div>
      <h1>SessionTestPage</h1>
      <ClientComponent />
    </div>
  );
};

export default SessionTestPage;
