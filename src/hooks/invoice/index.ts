import { useQuery } from "@tanstack/react-query";

import { fetchReviewsOverview } from "@/actions/review.actions";
import { onGetInvoiceDetails } from "@/actions/transaction.action";
import { GetInvoiceDetailProps } from "@/types/api-params/transaction.params";

type InvoicePayload = Parameters<GetInvoiceDetailProps>[0];

export const useInvoiceDetails = (
  objid: number | null,
  type: string | null,
  bizid: number | null,
  indvid: number | null
) => {
  return useQuery({
    queryKey: ["invoiceDetails", objid, type, bizid],
    enabled: !!objid && !!type,
    queryFn: async () => {
      const payload: InvoicePayload = { invoiceId: objid! };

      console.log("this is indvid",indvid);

      console.log("this is type inside api", type);
      if (type === "receivable") {
        payload.bizid = bizid!;
      } else {
        payload.buyerId = indvid!;
      }
     
      ;
      const { success, data } = await onGetInvoiceDetails(payload);
      console.log("data after invoice", data)
      if (!success) throw new Error("Failed to fetch invoice details");
      return data;
    },
  });
};

export const useUserReviewOverViews = (bizId?: number) => {
  return useQuery({
    queryKey: ["reviewOverviews", bizId],
    queryFn: async () => {
      console.log("bizID in review", bizId);
      if (!bizId) throw new Error("No bizId provided");
      const response = await fetchReviewsOverview({ bizId });

      console.log("inside action  review ", response);
      return response.data;
    },
    enabled: !!bizId, 
  });
};
