import Image from "next/image";
import React from "react";

import { onGetWalletTransactions } from "@/actions/wallet.action";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
};

const WalletBalance = async ({ className }: Props) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const { success, data } = await onGetWalletTransactions({
    userId: Number(session.user.id),
    pgStart: 1,
    pgSize: 10,
  });

  if (!success || !data) {
    return <div>Something went wrong</div>;
  }

  console.log(data);

  return (
    <div
      className={`flex flex-col gap-4 rounded-lg bg-primary-900 p-6 text-light-900 ${className}`}
    >
      <div className="md:flex-between flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 self-start">
          <div className="flex gap-4">
            <Image
              src={"/images/wallet-coin.svg"}
              alt="wallet-coin"
              height={50}
              width={50}
            />
            <h3 className="flex items-center justify-center text-xl">
              Total Wallet Balance
            </h3>
          </div>
          <div className="flex gap-2 self-start rounded-full bg-primary-600 p-4">
            <p className="body-regular">Your referral code : Book</p>
            <Image src={"/icons/copy.svg"} alt="copy" height={20} width={20} />
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <Image
            src={"/images/wallet-page-img.svg"}
            alt="wallet-page-img"
            height={150}
            width={150}
            className=""
          />
          <p className="body-regular">*Terms and Conditions Apply</p>
        </div>
      </div>
      <p className="body-regular mt-4">
        Refer an individual and receive $5, or refer a business and receive $20
        once they complete their Stripe integration!
      </p>
      <Button className="self-start bg-light-900 text-dark-100 hover:bg-light-900">
        Redeem Promo Code
      </Button>
    </div>
  );
};

export default WalletBalance;
