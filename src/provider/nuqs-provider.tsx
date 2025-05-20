"use client";

import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

type Props = {
  children: React.ReactNode;
};

const NuqsProvider = ({ children }: Props) => {
  return <NuqsAdapter>{children}</NuqsAdapter>;
};

export default NuqsProvider;
