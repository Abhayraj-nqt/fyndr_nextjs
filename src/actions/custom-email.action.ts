"use server";
import { API_BASE_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import { getCustomeEmailParams } from "@/types/api-params/custom-email.params";
import { EmailCustomResponse } from "@/types/api-response/custom-email.response";

export const onCustomEmail = async (payload: {
  bizId: number;
  text: string;
  showOfferImages: boolean;
}) => {
  // https://api.dev.fyndr.us/identity/custom-email/post-purchase
  const endpoint = `${API_BASE_URL}/identity/custom-email/post-purchase`;
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const fetchCustomEmail: getCustomeEmailParams = async (params) => {
  const endpoint = `${API_BASE_URL}/identity/fetch/custom-email/post-purchase/${params.bizId}`;
  // https://api.dev.fyndr.us/identity/fetch/custom-email/post-purchase/1000389
  return _get<EmailCustomResponse>(endpoint, {
    requireAuth: true,
  });
};
