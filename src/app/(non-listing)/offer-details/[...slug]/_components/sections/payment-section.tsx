"use client";

import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import Payment from "@/components/global/payment";
import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

const PaymentSection = () => {
  const { items } = useOfferCartStore();

  const calculations = React.useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const totalTax = items.reduce((sum, item) => sum + item.tax, 0);
    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

    const taxRate = subtotal > 0 ? (totalTax / subtotal) * 100 : 0;

    return {
      subtotal,
      totalTax,
      grandTotal,
      taxRate,
    };
  }, [items]);

  return (
    <DefaultCard id="payment-section" className="w-full p-6">
      <h2 className="heading-7-medium mb-2 text-secondary">Select Card</h2>
      <Payment
        total={calculations.grandTotal}
        tax={calculations.totalTax}
        taxRate={calculations.taxRate}
        amount={calculations.subtotal}
        isSubscriptionEnabled={false}
        channel="OFFERS"
      />
    </DefaultCard>
  );
};

export default PaymentSection;
