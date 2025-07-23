/* eslint-disable max-lines */
"use client";

import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";

import { onVerifyOffer } from "@/actions/campaign.action";
import { onGetTax } from "@/actions/invoice.action";
import Button from "@/components/global/buttons";
import toast from "@/components/global/toast";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/auth";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { cn } from "@/lib/utils";
import { parseAmount } from "@/lib/utils/parser";
import { Campaign, CampaignOffer } from "@/types/campaign/campaign.types";
import { useCartStore } from "@/zustand/stores/offer-details/cart2.store";

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
  const { user, isLoading: userLoading, error: userError } = useUser();
  const [transition, startTransition] = useTransition();
  const [qtyData, setQtyData] = useState<QuantityProps>({
    qty: 0,
    amount: 0,
    tax: 0,
    total: 0,
  });

  const {
    getItemQuantity,
    addItem,
    removeItem,
    getCampaignLocation,
    setCampaignLocation,
    requiresLocationSelection,
    openLocationModal,
    setLoading,
    setError,
  } = useCartStore();

  // Initialize quantity from cart
  useEffect(() => {
    const currentQty = getItemQuantity(offer.objid);
    if (currentQty > 0 && qtyData.qty === 0) {
      handleQtyChange(currentQty);
    }
  }, []);

  // Auto-select location if only one available
  useEffect(() => {
    if (campaignLocations.length === 1 && !getCampaignLocation(campaignId)) {
      setCampaignLocation(campaignId, campaignLocations[0], campaignLocations);
    }
  }, [campaignLocations, campaignId]);

  if (userLoading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (userError || !user) {
    return (
      <div className="text-sm text-red-500">Please log in to continue</div>
    );
  }

  const effectiveMaxQty =
    offer.usageLimit >= 0 ? Math.min(offer.usageLimit, maxQty) : maxQty;
  const isDecrementDisabled = qtyData.qty <= 0;
  const isIncrementDisabled = qtyData.qty >= effectiveMaxQty;

  const calculatePricing = async (
    qty: number
  ): Promise<QuantityProps | null> => {
    if (qty <= 0) {
      return {
        qty: 0,
        amount: 0,
        tax: 0,
        total: 0,
      };
    }

    // Verify offer availability
    const { success: verifySuccess, error: verifyError } = await onVerifyOffer({
      payload: {
        buyerEmail: user.email,
        offerId: offer.objid,
        userSelectQuanity: qty,
      },
    });

    if (!verifySuccess) {
      toast.error({
        message:
          verifyError?.details?.message ||
          "Failed to verify offer availability",
      });
      return null;
    }

    // Get location for tax calculation
    const selectedLocation = getCampaignLocation(campaignId);
    if (!selectedLocation) {
      throw new Error("Location not selected");
    }

    // Calculate tax
    const {
      success: taxSuccess,
      data: taxData,
      error: taxError,
    } = await onGetTax({
      payload: {
        country: selectedLocation.country,
        postalCode: selectedLocation.postalCode,
      },
    });

    if (!taxSuccess) {
      toast.error({
        message: taxError?.details?.message || "Failed to calculate tax",
      });
      return null;
    }

    if (taxData) {
      const amount = Number(parseAmount(offer.offerPrice * qty));
      const tax = Number(parseAmount(offer.offerPrice * taxData.taxRate * qty));
      const total = amount + tax;

      return {
        qty,
        amount,
        tax,
        total,
      };
    }

    return null;
  };

  const handleQtyChange = async (newQty: number) => {
    const qty = Math.max(0, Math.min(newQty, effectiveMaxQty));

    setLoading(true);
    setError(null);

    try {
      // Handle location selection requirement
      if (qty > 0 && requiresLocationSelection(campaignId, campaignLocations)) {
        // Open location modal with pending action
        const pendingAction = () => {
          startTransition(async () => {
            try {
              const pricingData = await calculatePricing(qty);
              if (pricingData) {
                setQtyData(pricingData);
                onQuantityChange?.(pricingData);

                // Update cart
                const selectedLocation = getCampaignLocation(campaignId);
                if (selectedLocation) {
                  addItem({
                    offerId: offer.objid,
                    campaignId,
                    locationId: selectedLocation.locationId,
                    qty: pricingData.qty,
                    amount: pricingData.amount,
                    tax: pricingData.tax,
                    total: pricingData.total,
                    offer,
                  });
                }
              }
            } catch (error) {
              console.error("Error in pending action:", error);
              setError("Failed to update quantity");
            } finally {
              setLoading(false);
            }
          });
        };

        openLocationModal(campaignId, pendingAction);
        return;
      }

      // Process quantity change
      startTransition(async () => {
        try {
          const pricingData = await calculatePricing(qty);
          if (pricingData) {
            setQtyData(pricingData);
            onQuantityChange?.(pricingData);

            // Update cart
            if (pricingData.qty > 0) {
              const selectedLocation = getCampaignLocation(campaignId);
              if (selectedLocation) {
                addItem({
                  offerId: offer.objid,
                  campaignId,
                  locationId: selectedLocation.locationId,
                  qty: pricingData.qty,
                  amount: pricingData.amount,
                  tax: pricingData.tax,
                  total: pricingData.total,
                  offer,
                });
              }
            } else {
              removeItem(offer.objid);
            }
          }
        } catch (error) {
          console.error("Error updating quantity:", error);
          setError("Failed to update quantity");
        } finally {
          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Error in handleQtyChange:", error);
      setError("Failed to update quantity");
      setLoading(false);
    }
  };

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

  const isLoading = transition || userLoading;

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

export default QtySelector;
