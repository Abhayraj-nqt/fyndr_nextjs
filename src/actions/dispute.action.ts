"use server";

import { API_BASE_URL, API_GATEWAY_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import { DisputeListParams } from "@/types/api-params/dispute.params";
import { RefundDisputeParams } from "@/types/api-params/refundDispute.params";

export const onDisputeList: DisputeListParams = async (payload) => {
  const endpoint = `${API_BASE_URL}/dispute/search?pgStart=1&pgSize=50`;
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
export const onDisputeRefund: RefundDisputeParams = async (payload) => {
  const endpoint = `${API_GATEWAY_URL}/secure/refund`;
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
