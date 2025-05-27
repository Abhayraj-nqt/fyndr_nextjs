"use server";

import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import { GetOfferSummaryParams } from "@/types/api-params/offersummary.params";

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