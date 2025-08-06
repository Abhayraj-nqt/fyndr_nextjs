"use client";

import React from "react";

import Button from "@/components/global/buttons";
// import { useUser } from "@/hooks/auth";

const page = () => {
  // const {user} = useUser({});
  const handleClick = async () => {};
  return (
    <div className="flex-center min-h-screen">
      <Button variant="primary" onClick={handleClick}>
        Refetch user
      </Button>
    </div>
  );
};

export default page;
