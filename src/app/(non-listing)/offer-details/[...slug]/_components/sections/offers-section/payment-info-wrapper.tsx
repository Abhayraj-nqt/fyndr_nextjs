"use client";

import React from "react";

import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

import OfferSummarySection from "../offer-summary-section";
import PaymentSection from "../payment-section";

const PaymentInfoWrapper = () => {
  const { paymentOptionsVisible } = useOfferCartStore();

  if (!paymentOptionsVisible) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {<OfferSummarySection />}
      {<PaymentSection />}
    </div>
  );
};

export default PaymentInfoWrapper;
