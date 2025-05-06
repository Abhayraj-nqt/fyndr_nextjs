"use server";

import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import {
  GetInvoiceSummaryProps,
  GetPayableProps,
  GetReceivableProps,
} from "@/types/api-params/transaction.params";
import {
  fetchInvoiceResponse,
  InvoiceSummary,
} from "@/types/api-response/transaction.response";

export const getInvoiceSummary: GetInvoiceSummaryProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/invoice/v2/summary`;

  return _post<InvoiceSummary>(endpoint, payload, {
    requireAuth: true,
  });
};

export const fetchReceivables: GetReceivableProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/invoice/v2/fetch?pgStart=0&pgSize=500`;

  return _post<fetchInvoiceResponse>(endpoint, payload, {
    requireAuth: true,
    cache: "force-cache",
  });
};

export const fetchPayables: GetPayableProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/invoice/v2/fetch?pgStart=0&pgSize=500`;

  return _post<fetchInvoiceResponse>(endpoint, payload, {
    requireAuth: true,
    cache: "force-cache",
  });
};
