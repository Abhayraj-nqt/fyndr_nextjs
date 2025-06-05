
import { onUpdateOfferRedeemption } from "@/actions/offersummary.actions";
import { OfferSummaryRedemption } from "@/types/offersummary";

import { useMutation, useQuery } from "@tanstack/react-query";


export const useOfferRedeemption = () => {


   return useMutation({
    mutationKey: ["OfferRedeemption"],
    mutationFn: (payload: OfferSummaryRedemption) => onUpdateOfferRedeemption(payload),
  });

}