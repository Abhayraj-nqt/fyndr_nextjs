import { InvoiceDetails } from "./invoice.types";
import { Biz } from "../business/business.types";
import { Currency, CurrencySymbol } from "../global";

export type GetTaxResponse = {
  country: string;
  taxRate: number;
  postalCode: string;
};

export type CreateInvoiceResponse = {
  objid: 8354;
  biz: Biz;
  invoiceDt: string;
  invoiceDetails: InvoiceDetails;
  taxAmount: 0.86;
  baseAmount: 10.0;
  promoCode: null | unknown | string;
  discountAmount: number;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  merchantId: string;
  status: "pending" | string;
  channel: "offers" | string;
  buyerCountry: string;
  buyerState: string;
  buyerPostalCode: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerFname: string;
  buyerLname: string;
  includesTax: null | unknown;
  tipAmount: number;
  fulfiled: null | unknown;
  deliveryStatus: "NA" | unknown | string;
  fyndrCash: number;
  buyerAddressLine1: string;
  buyerAddressLine2: string;
  buyerCity: string;
  isBuyerGooglePermissionGranted: boolean;
  isOfferGifted: boolean;
  dueDate: null | unknown | string;
};
