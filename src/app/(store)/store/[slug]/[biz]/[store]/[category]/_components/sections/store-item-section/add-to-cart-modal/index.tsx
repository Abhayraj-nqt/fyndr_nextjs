"use client";

import React, { useState } from "react";

import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { Textarea } from "@/components/ui/textarea";
import ASSETS from "@/constants/assets";
import { parseAmount } from "@/lib/utils/parser";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";
import { GetStoreResponse } from "@/types/store/store.response";
import { StoreItem } from "@/types/store/store.types";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

import AppointmentPerCart from "./appointment-per-cart";
import AppointmentPerItem from "./appointment-per-item";
import ItemCard from "./item-card";
import ItemInfoSection from "./item-info-section";
import ModifierSection from "./modifier-section";
import NoAppointment from "./no-appointment";
import StoreQtySelector from "./store-qty-selector";

type Props = {
  trigger: React.ReactNode;
  storeItem: StoreItem;
  appointmentType: GetStoreResponse["catalogueAppointmentType"];
  bookingEnabled: GetStoreResponse["catalogBookingEnabled"];
  country: string;
  postalCode: string;
};

const wholeUnits = ["each", "set", "box", "pair"];

const AddToCartModal = ({
  trigger,
  storeItem,
  appointmentType,
  bookingEnabled,
}: Props) => {
  const { addCartItem } = useStoreCartStore();

  const [selectedWholeModifierId, setSelectedWholeModifierId] =
    useState<string>("");
  const [selectedAddonModifierIds, setSelectedAddonModifierIds] = useState<
    string[]
  >([]);
  const [qty, setQty] = useState<number>(1);

  const isWholeUnit: boolean = wholeUnits.includes(storeItem.item.unit);

  const imageUrl =
    storeItem.item?.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR;
  const itemName = storeItem.item.name;

  const wholeModifiers = storeItem.catalogueModifiers.filter(
    (item) => item.modifier.modType === "whole"
  );
  const addonModifiers = storeItem.catalogueModifiers.filter(
    (item) => item.modifier.modType === "addon"
  );

  const handleWholeModifierChange = (value: string) => {
    setSelectedWholeModifierId(value);
  };

  const handleAddonModifierChange = (modifierId: string, checked: boolean) => {
    setSelectedAddonModifierIds((prev) => {
      if (checked) {
        return [...prev, modifierId];
      } else {
        return prev.filter((id) => id !== modifierId);
      }
    });
  };

  const removeWholeModifier = () => {
    setSelectedWholeModifierId("");
  };

  const calculateTotalPrice = () => {
    let total = storeItem.price * Math.max(qty, 1);

    // Add whole modifier price
    if (selectedWholeModifierId) {
      const wholeModifier = wholeModifiers.find(
        (item) => item.modifier.objid.toString() === selectedWholeModifierId
      );
      if (wholeModifier) {
        total += wholeModifier.price;
      }
    }

    // Add addon modifiers prices
    selectedAddonModifierIds.forEach((id) => {
      const addonModifier = addonModifiers.find(
        (item) => item.modifier.objid.toString() === id
      );
      if (addonModifier) {
        total += addonModifier.price;
      }
    });

    return total;
  };

  const handleIncrement = () => {
    if (isWholeUnit) {
      setQty((prev) => prev + 1);
    } else {
      setQty((prev) => Math.round((prev + 0.1) * 100) / 100);
    }
  };

  const handleDecrement = () => {
    if (qty <= 1) return;
    if (isWholeUnit) {
      setQty((prev) => prev - 1);
    } else {
      setQty((prev) => Math.round((prev - 0.1) * 100) / 100);
    }
  };

  const handleAddToCart = async (
    mode: "NO_APPOINTMENT" | "APPOINTMENT_PER_ITEM" | "APPOINTMENT_PER_CART",
    appointment?: AppointmentSlotPayload
  ) => {
    if (qty < 1) {
      toast.error({
        message: "Please increase quantity.",
      });
    }

    const selectedAddonModifiers = addonModifiers.filter((item) =>
      selectedAddonModifierIds.includes(item.modifier.objid.toString())
    );

    const selectedWholeModifiers = selectedWholeModifierId
      ? wholeModifiers.filter(
          (item) => item.modifier.objid.toString() === selectedWholeModifierId
        )
      : [];

    if (mode === "APPOINTMENT_PER_ITEM" && appointment) {
      const itemLevelAppointments = [];
      for (let i = 1; i <= qty; i++) {
        itemLevelAppointments.push(appointment);
      }
      addCartItem({
        itemId: storeItem.objid,
        itemLevelAppointments,
        price: storeItem.price,
        qty,
        storeItem,
        modifiers: {
          addon: selectedAddonModifiers,
          whole: selectedWholeModifiers,
        },
      });

      toast.success({
        message: "Item is added to cart.",
      });

      return;
    }

    const itemLevelAppointments = mode !== "APPOINTMENT_PER_ITEM" ? [] : [];

    addCartItem({
      itemId: storeItem.objid,
      itemLevelAppointments,
      price: storeItem.price,
      qty,
      storeItem,
      modifiers: {
        addon: selectedAddonModifiers,
        whole: selectedWholeModifiers,
      },
    });

    toast.success({
      message: "Item is added to cart.",
    });
  };

  const renderModalActions = () => {
    if (!bookingEnabled || appointmentType === null) {
      return <NoAppointment onAddToCart={handleAddToCart} />;
    } else if (appointmentType === "APPOINTMENT_PER_CART") {
      return <AppointmentPerCart onAddToCart={handleAddToCart} />;
    } else if (appointmentType === "APPOINTMENT_PER_ITEM") {
      return (
        <AppointmentPerItem
          onAddToCart={handleAddToCart}
          itemId={storeItem.objid}
        />
      );
    }

    return null;
  };

  return (
    <Modal
      title={<div>Add To Cart</div>}
      trigger={trigger}
      closeOnOutsideClick={false}
      bodyClassName="!p-0"
    >
      <div className="no-scrollbar flex max-h-[80vh] flex-col gap-4 overflow-y-scroll p-4">
        <ItemInfoSection
          imgUrl={imageUrl}
          name={itemName}
          desc={storeItem.item.description}
          price={storeItem.price}
          unit={storeItem.item.unit}
        />
        <div className="flex flex-col gap-6">
          <ItemCard
            currencySymbol="$"
            imgUrl={imageUrl}
            name={itemName}
            price={storeItem.price}
          />
          <ModifierSection
            modifiers={storeItem.catalogueModifiers}
            selectedWholeModifierId={selectedWholeModifierId}
            selectedAddonModifierIds={selectedAddonModifierIds}
            onWholeModifierChange={handleWholeModifierChange}
            onAddonModifierChange={handleAddonModifierChange}
            onRemoveWholeModifier={removeWholeModifier}
          />
        </div>
        <Textarea
          placeholder="Instructions: spice level, order for, include, exclude"
          className="no-focus placeholder min-h-20 !rounded-10 border border-secondary-20 text-black-70 shadow-none"
        />
        <div className="flex-between text-black-80">
          <div className="title-6">
            Total: ${parseAmount(calculateTotalPrice())}
          </div>
          <StoreQtySelector
            qty={qty}
            setQty={setQty}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>
      </div>
      {renderModalActions()}
    </Modal>
  );
};

export default AddToCartModal;
