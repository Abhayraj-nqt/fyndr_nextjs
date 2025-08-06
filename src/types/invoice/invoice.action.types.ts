import { ActionResponse } from "../global";
import { CreateInvoiceParams, GetTaxParams } from "./invoice.params";
import { CreateInvoiceResponse, GetTaxResponse } from "./invoice.response";

export type GetTax = ({
  payload,
}: GetTaxParams) => Promise<ActionResponse<GetTaxResponse>>;

export type CreateInvoice = ({
  payload,
}: CreateInvoiceParams) => Promise<ActionResponse<CreateInvoiceResponse>>;
