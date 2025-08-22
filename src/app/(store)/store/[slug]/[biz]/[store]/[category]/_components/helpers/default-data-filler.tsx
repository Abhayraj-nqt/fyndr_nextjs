/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";

import { GetStoreResponse } from "@/types/store/store.response";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

type Props = {
  bizId: number;
  storeId: number;
  locationId: number;
  storeUrl: string;
  bizName: string;
  storeName: string;
  appointmentType: GetStoreResponse["catalogueAppointmentType"];
  country: string;
  postalCode: string;
};

const DefaultDataFiller = ({
  bizId,
  bizName,
  locationId,
  storeId,
  storeName,
  storeUrl,
  appointmentType,
  country,
  postalCode,
}: Props) => {
  const { setCartData, setShowCartItemsDeleteButton } = useStoreCartStore();

  React.useEffect(() => {
    setCartData({
      bizId,
      bizName,
      locationId,
      storeId,
      storeName,
      storeUrl,
      appointmentType,
      country,
      postalCode,
    });
    setShowCartItemsDeleteButton(false);
  }, [bizId, bizName, locationId, storeId, storeName, appointmentType]);

  return null;
};

export default DefaultDataFiller;
