"use client";

import { Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

import Button from "@/components/global/buttons";
import { Input } from "@/components/ui/input";
import useOfferQtySelector from "@/hooks/campaigns/use-offer-qty-selector";
import { cn } from "@/lib/utils";
import { Campaign, CampaignOffer } from "@/types/campaign/campaign.types";

type Props = {
  className?: string;
  offer: CampaignOffer;
  campaignLocations: Campaign["cmpnLocs"];
};

const OfferQtySelector = ({ className, campaignLocations, offer }: Props) => {
  const { data: session } = useSession();
  const {
    disabledStates,
    handleDecrement,
    handleIncrement,
    handleQtyInputChange,
    qtyData,
    effectiveMaxQty,
  } = useOfferQtySelector({
    offer,
    campaignLocations,
  });

  const { decrementDisabled, incrementDisabled, inputDisabled } =
    disabledStates;

  if (!session || !session.user) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        className="size-8 !rounded-5 p-2"
        variant="primary-dark"
        disabled={decrementDisabled}
        onClick={handleDecrement}
        type="button"
        aria-label="Decrease quantity"
      >
        <Minus size={20} />
      </Button>

      <Input
        type="number"
        className="hide-input-arrow no-focus body-3 h-8 w-14 rounded-5 border border-secondary-20 bg-white text-black-80 shadow-none !outline-none ring-0 disabled:cursor-text disabled:opacity-100"
        value={qtyData.qty}
        min={0}
        max={effectiveMaxQty}
        onChange={handleQtyInputChange}
        disabled={inputDisabled}
        aria-label={`Quantity for ${offer.title}`}
      />

      <Button
        className="size-8 !rounded-5 p-2"
        variant="primary-dark"
        onClick={handleIncrement}
        disabled={incrementDisabled}
        type="button"
        aria-label="Increase quantity"
      >
        <Plus size={20} />
      </Button>
    </div>
  );
};

export default OfferQtySelector;
