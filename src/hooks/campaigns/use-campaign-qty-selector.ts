import { useSession } from "next-auth/react";
import { useState } from "react";

import { onVerifyOffer } from "@/actions/campaign.action";
import toast from "@/components/global/toast";
import { Campaign, CampaignOffer } from "@/types/campaign/campaign.types";

import { useDebouncedCallback } from "../use-debounced-callback";

type DisabledStatesProps = {
  incrementDisabled: boolean;
  decrementDisabled: boolean;
  inputDisabled: boolean;
};

type QuantityProps = {
  qty: number;
  amount: number;
  tax: number;
  total: number;
};

type Props = {
  offer: CampaignOffer;
  campaignLocations: Campaign["cmpnLocs"];
};

const useCampaignQtySelector = ({ offer, campaignLocations }: Props) => {
  const { data: session } = useSession();

  const [disabledStates, setDisabledStates] = useState<DisabledStatesProps>({
    incrementDisabled: false,
    decrementDisabled: false,
    inputDisabled: false,
  });
  const [qtyData, setQtyData] = useState<QuantityProps>({
    qty: 0,
    amount: 0,
    tax: 0,
    total: 0,
  });

  const handleQtyChange = async (newQty: number) => {
    const qty = Math.max(0, Math.min(newQty, effectiveMaxQty));
  };
  const debouncedHandleQtyChange = useDebouncedCallback(handleQtyChange, 500);
  const handleIncrement = () => {
    if (qtyData.qty >= effectiveMaxQty) return;
    handleQtyChange(qtyData.qty + 1);
  };
  const handleDecrement = () => {
    if (qtyData.qty <= 0) return;
    handleQtyChange(qtyData.qty - 1);
  };
  const handleQtyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = parseInt(e.target.value) || 0;
    debouncedHandleQtyChange(newQty);
  };

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

    if (!session || !session.user) {
      toast.error({
        message: "Please sign-in to proceed",
      });
      return null;
    }

    // Verify offer availability
    const { success: verifySuccess, error: verifyError } = await onVerifyOffer({
      payload: {
        buyerEmail: session.user.email,
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

    return null;
  };

  const maxQty = offer?.usageLimit >= 0 ? offer?.usageLimit : Infinity;
  const usageLimit = offer.usageLimit;
  const effectiveMaxQty =
    offer.usageLimit >= 0 ? Math.min(offer.usageLimit, maxQty) : maxQty;
  // const isDecrementDisabled = qtyData.qty <= 0;
  // const isIncrementDisabled = qtyData.qty >= effectiveMaxQty;

  return {
    // states
    qtyData,
    disabledStates,
    usageLimit,

    // handlers
    handleIncrement,
    handleDecrement,
    handleQtyInputChange,
  };
};

export default useCampaignQtySelector;
