"use server";

import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { API_BASE_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import {
  GetDisputeReasonsProps,
  UpdateDisputeStatusProps,
} from "@/types/api-params/dispute.params";
import {
  DisputeReasonResponse,
  RaiseDisputeResponse,
} from "@/types/api-response/dispute.response";

export const onGetDisputeReasons: GetDisputeReasonsProps = async () => {
  const endpoint = `${API_BASE_URL}/invoice/fetchDisputeReasons`;

  return _get<DisputeReasonResponse>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};

export const onRaiseDispute: UpdateDisputeStatusProps = async (
  invoiceId,
  payload
) => {
  const endpoint = `${API_BASE_URL}/invoice/raiseDispute/${invoiceId}`;

  revalidatePath(ROUTES.BUSINESS_DASHBOARD);

  console.log("Payload for raising dispute:", payload);

  return _post<RaiseDisputeResponse>(endpoint, payload, {
    requireAuth: true,
  });
};
