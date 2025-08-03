"use client";

import React, { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/hooks/auth";
import { useVerifyWallet } from "@/hooks/wallet/use-verify-wallet";
import { parseAmount } from "@/lib/utils/parser";
import { PaymentMethod } from "@/types/payment/payment.types";

import CardPay from "./card-pay";
import Button from "../buttons";

type Props = {
  total: number;
  tax: number;
  taxRate: number;
  amount: number;
  channel: string;
  isSubscriptionEnabled: boolean;
};

const Payment = ({ total, amount, tax, channel }: Props) => {
  const { user, isLoading, error } = useUser();
  const {
    data: walletData,
    isLoading: isWalletLoading,
    error: walletError,
  } = useVerifyWallet({
    payload: {
      channel,
      totalAmount: amount.toString(),
    },
  });
  const [selectedCard, setSelectedCard] = useState<PaymentMethod>();
  const [fyndrCashApplied, setFyndrCashApplied] = useState<boolean>(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  if (!user) {
    return <div>Please log in to proceed with payment</div>;
  }

  const { email, indvid, qrid, pmethod: cards = [] } = user;

  const handleCardChange = (card: PaymentMethod) => {
    setSelectedCard(card);
  };

  const effectiveTotalAmount =
    (fyndrCashApplied ? amount - (walletData?.data?.fyndrCash || 0) : amount) +
    tax;

  return (
    // <div className="flex flex-col gap-4">
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-4">
        <CardPay cards={cards || []} onCardChange={handleCardChange} />
      </div>
      <div className="col-span-3 rounded-10 bg-primary-0.5 text-black-heading">
        <div className="body-1-medium flex flex-col gap-2 border-b border-secondary-20 p-4">
          <div className="grid grid-cols-7 gap-2">
            <span className="col-span-3">Amount</span>
            <span className="text-center">:</span>
            <span className="col-span-3 text-end">${parseAmount(amount)}</span>
          </div>
          {fyndrCashApplied ? (
            <div className="grid grid-cols-7 gap-2">
              <span className="col-span-3">Fyndr Cash</span>
              <span className="text-center">:</span>
              <span className="col-span-3 text-end">
                -${parseAmount(walletData?.data?.fyndrCash || 0)}
              </span>
            </div>
          ) : (
            <></>
          )}
          <div className="grid grid-cols-7 gap-2">
            <span className="col-span-3">Tax</span>
            <span className="text-center">:</span>
            <span className="col-span-3 text-end">${parseAmount(tax)}</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            <span className="col-span-3">Total</span>
            <span className="text-center">:</span>
            <span className="col-span-3 text-end">
              ${parseAmount(effectiveTotalAmount)}
            </span>
          </div>
        </div>
        <div className=""></div>
        {isWalletLoading ? (
          <div>Loading...</div>
        ) : walletError ||
          !walletData ||
          !walletData.success ||
          !walletData.data ? (
          <div>Error</div>
        ) : !walletData.data.isWalletActive ? (
          <></>
        ) : (
          <div className="flex flex-col gap-4 border-b border-secondary-20 p-4">
            <span className="text-indicator-green-90">
              Apply up to an extra 5% off
            </span>
            <div className="flex-between gap-2">
              <div className="flex-center gap-2">
                <Checkbox
                  checked={fyndrCashApplied}
                  onCheckedChange={(checked) => {
                    setFyndrCashApplied(checked === true);
                  }}
                  className="border-primary shadow-none  data-[state=checked]:bg-primary"
                />
                <span>Use Fyndr Cash</span>
              </div>
              <div className="flex-center w-16 rounded-5 border border-secondary-20 bg-white px-2 py-1">
                ${walletData.data.fyndrCash}
              </div>
            </div>
          </div>
        )}
        <div className="flex-between border-b border-secondary-20 p-4">
          <div className="flex-center gap-2">
            <Checkbox className="border-primary shadow-none data-[state=checked]:bg-primary" />
            <span>Make this a Gift</span>
          </div>
        </div>
        <div className="flex-center w-full p-4">
          <Button variant="primary" stdWidth>
            Pay Now {"$"}
            {parseAmount(effectiveTotalAmount)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
