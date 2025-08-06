"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const NuqsProvider = ({ children }: Props) => {
  return <NuqsAdapter>{children}</NuqsAdapter>;
};

export default NuqsProvider;
