"use server";

import { API_BASE_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import {
  RedeemPromocode,
  VerifyPromocode,
} from "@/types/api-params/promocode.params";

export const onVerifyPromocode: VerifyPromocode = async (params) => {
  const { code, codeType, countryId, isBusiness } = params;
  const endpoint = `${API_BASE_URL}/identity/verify?isBusiness=${isBusiness}&code=${code}&countryId=${countryId}&codeType=${codeType}`;
  return _get(endpoint);
};

export const onRedeemPromocode: RedeemPromocode = async (params, payload) => {
  const { indvId } = params;
  console.log({ params, payload });

  const endpoint = `${API_BASE_URL}/identity/redeem_promocode/${indvId}`;
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
