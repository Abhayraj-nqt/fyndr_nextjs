/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

const NavigationCleanerOfferCartStore = () => {
  const pathname = usePathname();
  const {
    clearCart,
    clearCampaignId,
    clearLocationId,
    setPaymentOptionsVisible,
  } = useOfferCartStore();

  useEffect(() => {
    clearCart();
    clearCampaignId();
    clearLocationId();
    setPaymentOptionsVisible(false);
  }, [pathname]);

  return null;
};

export default NavigationCleanerOfferCartStore;
