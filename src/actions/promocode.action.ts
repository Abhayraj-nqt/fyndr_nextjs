"use server";

import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { API_BASE_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import {
  RedeemPromocode,
  VerifyPromocode,
} from "@/types/api-params/promocode.params";
import { ActionResponse } from "@/types/global";
import { getAllPromoCode } from "@/types/api-response/promocode.response";

export const onVerifyPromocode: VerifyPromocode = async (params) => {
  const { code, codeType, countryId, isBusiness } = params;
  const endpoint = `${API_BASE_URL}/identity/verify?isBusiness=${isBusiness}&code=${code}&countryId=${countryId}&codeType=${codeType}`;
  return _get(endpoint);
};

export const onRedeemPromocode: RedeemPromocode = async (params, payload) => {
  const { indvId } = params;

  const endpoint = `${API_BASE_URL}/identity/redeem_promocode/${indvId}`;

  revalidatePath(ROUTES.WALLET);

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const getAllPromoCodes = async(): Promise<ActionResponse<getAllPromoCode[]>> =>{
  const endpoint = `${API_BASE_URL}/admin/promocode/getAll`;
  return _get(endpoint, {
    requireAuth:true
  })
}
