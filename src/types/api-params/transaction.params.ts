import {
  fetchInvoiceResponse,
  InvoiceSummary,
} from "../api-response/transaction.response";
import { ActionResponse } from "../global";

export type GetInvoiceSummaryProps = (payload: {
  bizid: number;
  days: string;
}) => Promise<ActionResponse<InvoiceSummary>>;

export type GetReceivableProps = (payload: {
  criteria: "merchant";
  text: string | null;
  bizid: number;
  days: number;
  channel?: string;
  status?: string;
}) => Promise<ActionResponse<fetchInvoiceResponse>>;

export type GetPayableProps = (payload: {
  criteria: "individual";
  buyerId: number;
  days: number;
  text?: string;
}) => Promise<ActionResponse<fetchInvoiceResponse>>;
