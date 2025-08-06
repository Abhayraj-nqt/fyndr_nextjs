"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

import ProceedToPay from "./proceed-to-pay";

const ProceedToPayWrapper = () => {
  const router = useRouter();
  const { getTotalItems, setPaymentOptionsVisible } = useOfferCartStore();
  const totalItems = getTotalItems();

  const handleProceedToPay = () => {
    if (totalItems > 0) {
      setPaymentOptionsVisible(true);
      router.push("#payment-section");
    } else {
      setPaymentOptionsVisible(false);
    }
  };

  return (
    <ProceedToPay disabled={totalItems === 0} onClick={handleProceedToPay} />
  );
};

export default ProceedToPayWrapper;
