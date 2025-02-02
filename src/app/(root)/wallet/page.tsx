import Image from "next/image";
import React from "react";

import DefaultCard from "@/components/global/cards/DefaultCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HOW_DOES_WALLET_WORK } from "@/constants";
import { cn } from "@/lib/utils";

const Wallet = () => {
  return (
    <main className="my-10 flex items-center justify-center">
      <DefaultCard className="p-0 xs:w-11/12 lg:w-9/12">
        <h1 className="h3-semibold m-4">Fyndr Wallet</h1>
        <Separator />
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-4 md:grid md:grid-cols-5">
            <div className="flex flex-col gap-4 rounded-lg bg-primary-900 p-6 text-light-900 md:col-span-3">
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
                    <Image
                      src={"/icons/copy.svg"}
                      alt="copy"
                      height={20}
                      width={20}
                    />
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
                Refer an individual and receive $5, or refer a business and
                receive $20 once they complete their Stripe integration!
              </p>
              <Button className="self-start bg-light-900 text-dark-100 hover:bg-light-900">
                Redeem Promo Code
              </Button>
            </div>
            <div className="mt-4 md:col-span-2 md:mt-0">
              <h2 className="base-medium mb-4">How does it work?</h2>
              <div className="flex flex-col gap-2">
                {HOW_DOES_WALLET_WORK.map((step) => (
                  <React.Fragment key={step.id}>
                    <div className="flex items-start gap-8">
                      <Image
                        src={step.imgURL}
                        alt={step.alt}
                        width={22}
                        height={22}
                        className={cn({ "invert-colors": true })}
                      />
                      <p>{step.title}</p>
                    </div>
                    {HOW_DOES_WALLET_WORK.length > step.id && (
                      <Image
                        src={"/icons/dots-vertical.svg"}
                        alt="dots-vertical"
                        width={22}
                        height={22}
                        className=""
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <h2 className="base-medium">Activity</h2>
          <Separator />
          <div className="body-regular">No activity yet</div>
        </div>
      </DefaultCard>
    </main>
  );
};

export default Wallet;
