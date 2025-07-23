"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import Button from "@/components/global/buttons";
import ROUTES from "@/constants/routes";

const BuyNowButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const redirectUrl = `${ROUTES.SIGN_IN}?callback=${currentUrl}`;

  return (
    <Button variant="primary" asChild stdWidth>
      <Link href={redirectUrl}>Buy Now</Link>
    </Button>
  );
};

export default BuyNowButton;
