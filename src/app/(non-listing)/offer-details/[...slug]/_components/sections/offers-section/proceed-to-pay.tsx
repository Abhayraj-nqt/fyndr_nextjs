"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import Button from "@/components/global/buttons";
import VerifyEmailModal from "@/components/global/modal/verify-email-modal";
import ROUTES from "@/constants/routes";
import { useUser } from "@/hooks/auth";

type Props = {
  onClick?: () => void;
  disabled?: boolean;
};

const ProceedToPay = ({ onClick, disabled }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (!user) {
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    return (
      <Button
        variant="primary-dark"
        className="w-full max-w-56"
        stdHeight
        asChild
      >
        <Link href={`${ROUTES.SIGN_IN}?callback=${currentUrl}`}>
          Proceed to pay
        </Link>
      </Button>
    );
  }

  if (!user.isEmailVerified) {
    return (
      <VerifyEmailModal
        trigger={
          <Button
            variant="primary-dark"
            className={`w-full max-w-56 disabled:bg-disabled`}
            stdHeight
            disabled={disabled}
          >
            Proceed to pay
          </Button>
        }
      />
    );
  }

  return (
    <Button
      variant="primary-dark"
      className={`w-full max-w-56 disabled:bg-disabled`}
      stdHeight
      disabled={disabled}
      onClick={onClick}
    >
      Proceed to pay
    </Button>
  );
};

export default ProceedToPay;
