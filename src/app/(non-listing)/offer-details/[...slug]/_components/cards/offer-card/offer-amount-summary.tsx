"use client";

import React from "react";

import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

type Props = {
  offerId: number;
};

const OfferAmountSummary = ({ offerId }: Props) => {
  const { getCartItem } = useOfferCartStore();

  const cartItem = getCartItem(offerId);

  console.log("cartItem", cartItem);

  if (!cartItem) return null;

  return (
    <div className="flex-between body-3-medium gap-4 rounded-b-10 border-t border-secondary-20 bg-inherit p-4 text-black-heading">
      <div className="">
        Amount: {cartItem.offer.currencySymbol}
        {cartItem.amount}
      </div>
      <div className="">
        Tax: {cartItem.offer.currencySymbol}
        {cartItem.tax}
      </div>
      <div className="">
        Total: {cartItem.offer.currencySymbol}
        {cartItem.total}
      </div>
    </div>
  );
};

export default OfferAmountSummary;
