"use server";

import ROUTES from "@/constants/routes";
import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import { GetOfferSummaryParams, UpdateOfferRedeemption } from "@/types/api-params/offersummary.params";
import { OfferSummaryResponse } from "@/types/api-response/offersummary.response";
import { OfferPurchaseProps } from "@/types/offersummary";
import { revalidatePath } from "next/cache";

export const onGetOfferSummary: GetOfferSummaryParams = async (params) => {
  const {
    bizid,
    pgStart,
    pgSize,
    orderBy = "",
    sortBy = "",
    text = "",
    redemptionStatusList = [],
  } = params;
  let endpoint = `${API_BASE_URL}/campaign/offer_purchase/business/${bizid}?pgStart=${pgStart}&pgSize=${pgSize}`;

   if (orderBy) {
    endpoint += `&orderBy=${orderBy}`;
  }

  if (sortBy) {
    endpoint += `&sortBy=${sortBy}`;
  }
  const payload: {
    text?: string;
    redemptionStatusList?: string[];
  } = {};

  if (text) payload.text = text;
  if (redemptionStatusList && redemptionStatusList.length > 0)
    payload.redemptionStatusList = redemptionStatusList;

  return _post(endpoint, payload, {
    requireAuth: true,
    cache: "no-store",
    next: {
      revalidate: 0,
    },
  });
};


export const  onUpdateOfferRedeemption : UpdateOfferRedeemption = async (payload) => {



  const endpoint = `${API_BASE_URL}/invoice/voucher/update`;

  console.log("this is payload", payload);
   
  revalidatePath(ROUTES.BUSINESS_ACCOUNT_OFFER_SUMMARY);
  return _post<OfferPurchaseProps>(endpoint ,payload,{
    requireAuth : true,
  })
  

}