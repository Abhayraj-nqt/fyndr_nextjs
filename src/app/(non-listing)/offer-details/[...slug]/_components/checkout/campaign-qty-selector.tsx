import { Minus, Plus } from "lucide-react";
import React, { useState, useTransition } from "react";

import Button from "@/components/global/buttons";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/auth";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { cn } from "@/lib/utils";
import { Campaign, CampaignOffer } from "@/types/campaign/campaign.types";

type QuantityProps = {
  qty: number;
  amount: number;
  tax: number;
  total: number;
};

type Props = {
  maxQty?: number;
  className?: string;
  onQuantityChange?: (qtyData: QuantityProps) => void;
  campaignLocations: Campaign["cmpnLocs"];
  offer: CampaignOffer;
};

const CampaignQtySelector = ({
  maxQty = Infinity,
  campaignLocations = [],
  offer,
  className,
  onQuantityChange,
}: Props) => {
  const { user, isLoading: userLoading, error: userError } = useUser();
  const [transition, startTransition] = useTransition();
  const [qtyData, setQtyData] = useState<QuantityProps>({
    qty: 0,
    amount: 0,
    tax: 0,
    total: 0,
  });

  const handleQtyChange = async (newQty: number) => {};

  //   ---------------------------------------------------------------------------------------------------
  const debouncedHandleQtyChange = useDebouncedCallback(handleQtyChange, 500);
  const handleQtyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = parseInt(e.target.value) || 0;
    debouncedHandleQtyChange(newQty);
  };
  const handleIncrement = () => {
    if (qtyData.qty >= effectiveMaxQty) return;
    handleQtyChange(qtyData.qty + 1);
  };
  const handleDecrement = () => {
    if (qtyData.qty <= 0) return;
    handleQtyChange(qtyData.qty - 1);
  };
  //   ---------------------------------------------------------------------------------------------------

  const effectiveMaxQty =
    offer.usageLimit >= 0 ? Math.min(offer.usageLimit, maxQty) : maxQty;
  const isDecrementDisabled = qtyData.qty <= 0;
  const isIncrementDisabled = qtyData.qty >= effectiveMaxQty;

  if (userLoading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (userError || !user) {
    return (
      <div className="text-sm text-red-500">Please log in to continue</div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        className="size-8 !rounded-5 p-2"
        variant="primary-dark"
        disabled={isDecrementDisabled || isLoading}
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
        disabled={isLoading}
        aria-label={`Quantity for ${offer.title}`}
      />

      <Button
        className="size-8 !rounded-5 p-2"
        variant="primary-dark"
        onClick={handleIncrement}
        disabled={isIncrementDisabled || isLoading}
        type="button"
        aria-label="Increase quantity"
      >
        <Plus size={20} />
      </Button>
    </div>
  );
};

export default CampaignQtySelector;
