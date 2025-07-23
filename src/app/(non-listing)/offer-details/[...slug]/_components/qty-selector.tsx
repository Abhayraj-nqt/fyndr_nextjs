"use client";

import { Minus, Plus } from "lucide-react";
import React, { useCallback, useEffect, useState, useTransition } from "react";

import { onVerifyOffer } from "@/actions/campaign.action";
import { onGetTax } from "@/actions/invoice.action";
import Button from "@/components/global/buttons";
import toast from "@/components/global/toast";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { parseAmount } from "@/lib/utils/parser";
import { Campaign, CampaignOffer } from "@/types/campaign/campaign.types";
import { useCartStore } from "@/zustand/stores/offer-details/cart.store";

type LocationData = {
  country: string;
  postalCode: string;
};

type QuantityProps = {
  qty: number;
  amount: number;
  tax: number;
  total: number;
};

type Props = {
  maxQty?: number;
  campaignLocations: Campaign["cmpnLocs"];
  offer: CampaignOffer;
  campaignId: number;
  className?: string;
  onQuantityChange?: (qtyData: QuantityProps) => void;
};

const QtySelector = ({
  maxQty = Infinity,
  campaignLocations = [],
  campaignId,
  offer,
  className,
  onQuantityChange,
}: Props) => {
  const { user, isLoading, error } = useUser();
  const [transition, startTransition] = useTransition();
  const [qtyData, setQtyData] = useState<QuantityProps>({
    qty: 0,
    amount: 0,
    tax: 0,
    total: 0,
  });
  const [selectedLocationData, setSelectedLocationData] =
    useState<LocationData>({
      country: campaignLocations.length > 0 ? campaignLocations[0].country : "",
      postalCode:
        campaignLocations.length > 0 ? campaignLocations[0].postalCode : "",
    });

  const { getItemQuantity, updateQuantity, addItem, removeItem } =
    useCartStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !user) return <div>Error...</div>;

  if (!user) return null;

  const effectiveMaxQty =
    offer.usageLimit >= 0 ? Math.min(offer.usageLimit, maxQty) : maxQty;

  const isDecrementDisabled = qtyData.qty <= 0;
  const isIncrementDisabled = qtyData.qty >= effectiveMaxQty;

  const handleQtyChange = async (newQty: number) => {
    startTransition(async () => {
      const qty = Math.max(0, Math.min(newQty, effectiveMaxQty));
      if (qty <= 0) {
        setQtyData({
          qty: 0,
          amount: 0,
          tax: 0,
          total: 0,
        });
        onQuantityChange?.({
          amount: 0,
          qty: 0,
          tax: 0,
          total: 0,
        });

        return;
      }

      const { success, error } = await onVerifyOffer({
        payload: {
          buyerEmail: user.email,
          offerId: offer.objid,
          userSelectQuanity: qty,
        },
      });

      if (!success) {
        toast.error({
          message: error?.details?.message || "Failed to verify usage limit",
        });
        return;
      }

      const {
        success: taxSuccess,
        data: taxData,
        error: taxError,
      } = await onGetTax({
        payload: {
          country: campaignLocations[0].country,
          postalCode: campaignLocations[0].postalCode,
        },
      });

      if (!taxSuccess) {
        toast.error({
          message: taxError?.details?.message || "Failed to fetch tax details",
        });
        return;
      }

      if (taxData) {
        const tax = Number(
          parseAmount(offer.offerPrice * taxData.taxRate * qty)
        );
        const amount = Number(parseAmount(offer.offerPrice * qty));

        const total = qty + tax + amount;

        setQtyData({
          qty,
          amount,
          tax,
          total,
        });

        onQuantityChange?.({
          amount,
          qty,
          tax,
          total,
        });
      }
    });
  };

  const handleQtyInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // TODO: Need to add debounce
    handleQtyChange(parseInt(e.target.value) || 0);
  };

  const handleIncrement = async () => {
    if (qtyData.qty >= effectiveMaxQty) return;
    await handleQtyChange(qtyData.qty + 1);
  };

  const handleDecrement = async () => {
    if (qtyData.qty <= 0) return;
    handleQtyChange(qtyData.qty - 1);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        className="size-8 !rounded-5 p-2"
        variant="primary-dark"
        disabled={isDecrementDisabled || transition}
        onClick={handleDecrement}
        type="button"
        aria-label="Decrease quantity"
      >
        <Minus size={20} />
      </Button>

      <Input
        type="number"
        className="hide-input-arrow no-focus body-3 h-8 w-14 rounded-5 border border-secondary-20 bg-white text-black-80 shadow-none !outline-none ring-0"
        value={qtyData.qty}
        min={0}
        max={effectiveMaxQty}
        onChange={handleQtyInputChange}
        disabled={transition}
        aria-label={`Quantity for ${offer.title}`}
      />

      <Button
        className="size-8 !rounded-5 p-2"
        variant="primary-dark"
        onClick={handleIncrement}
        disabled={isIncrementDisabled || transition}
        type="button"
        aria-label="Increase quantity"
      >
        <Plus size={20} />
      </Button>
    </div>
  );
};

export default QtySelector;
