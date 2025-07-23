"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const ClientComponent = () => {
  const { data: sesion } = useSession();

  useEffect(() => {
    console.log("CLIENT SIDE SESSION -> ", sesion);
  }, [sesion]);

  return <div>ClientComponent</div>;
};

export default ClientComponent;
