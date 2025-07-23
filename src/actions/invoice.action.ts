"use server";

import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import { CreateInvoice, GetTax } from "@/types/invoice/invoice.action.types";

export const onGetTax: GetTax = async ({ payload }) => {
  const endpoint = `${API_BASE_URL}/invoice/getTax`;

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const onCreateInvoice: CreateInvoice = async ({ payload }) => {
  const endpoint = `${API_BASE_URL}/invoice/create`;

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
