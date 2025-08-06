import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  className?: string;
};

const WalletBalanceSkeleton = ({ className }: Props) => {
  return (
    <div
      className={`flex flex-col gap-4 rounded-10 bg-secondary p-6 ${className}`}
    >
      <div className="md:flex-between flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 self-start">
          {/* Wallet icon and title */}
          <div className="flex gap-4">
            <Skeleton className="size-[50px] rounded-full bg-white/20" />
            <Skeleton className="h-6 w-48 bg-white/20" />
          </div>

          {/* Balance amount */}
          <Skeleton className="h-12 w-32 bg-white/20" />

          {/* Referral code section */}
          <div className="flex gap-2 self-start rounded-full bg-secondary-90 p-4">
            <Skeleton className="h-4 w-32 bg-white/20" />
            <Skeleton className="size-5 bg-white/20" />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          {/* Wallet illustration */}
          <Skeleton className="size-[150px] rounded-lg bg-white/20" />

          {/* Terms and conditions text */}
          <Skeleton className="mt-2 h-4 w-40 bg-white/20" />
        </div>
      </div>

      {/* Referral description */}
      <Skeleton className="mt-4 h-4 w-full bg-white/20" />
      <Skeleton className="h-4 w-3/4 bg-white/20" />

      {/* Redeem promo code button */}
      <Skeleton className="mt-2 h-12 w-40 self-start rounded-10 bg-white/20" />
    </div>
  );
};

export default WalletBalanceSkeleton;
