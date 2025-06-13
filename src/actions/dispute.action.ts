"use server";

import { API_BASE_URL, API_GATEWAY_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import { DisputeListParams } from "@/types/api-params/dispute.params";
import { RefundDisputeParams } from "@/types/api-params/refundDispute.params";

export const onDisputeList: DisputeListParams = async (payload) => {
  const endpoint = `${API_BASE_URL}/dispute/search?pgStart=1&pgSize=50`;
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
export const onDisputeRefund: RefundDisputeParams = async (payload) => {
  const endpoint = `${API_GATEWAY_URL}/payment/secure/refund`;
  // https://api-gateway.dev.fyndr.us/payment/secure/refund
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const onDisputeCommentList = async (params: { disputeId: number }) => {
  const { disputeId } = params;
  const endpoint = `${API_BASE_URL}/dispute/fetchComments/${disputeId}`;
  return _get(endpoint, {
    requireAuth: true,
  });
};
export const onDisputeComment = async (payload: {
  disputeId: number | undefined;
  userId: number | undefined;
  comment: string;
}) => {
  const endpoint = `${API_BASE_URL}/dispute/comment`;
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
