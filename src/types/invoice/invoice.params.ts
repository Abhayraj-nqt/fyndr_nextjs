import { Currency, CurrencySymbol } from "../global";
import { InvoiceDetails } from "./invoice.types";

export type GetTaxParams = {
  payload: {
    country: string;
    postalCode: string;
  };
};

export type CreateInvoiceParams = {
  payload: {
    baseAmount: string;
    bizid: number;
    buyerQRId: number;
    channel: "offers" | "offer_appointment" | string;
    currency: Currency;
    currencySymbol: CurrencySymbol;
    fyndrCash: number;
    invoiceDetails: InvoiceDetails;
    isBuyerGooglePermissionGranted: boolean;
    merchantId: string;
    taxAmount: string;
  };
};
