// !Refactor
export type PromocodeTypesProps =
  | "CASHBACK"
  | "PROMOCODE"
  | "REFERRAL"
  | "REDEEMED"
  | "FYNDR_CASH_EXPIRED"
  | "REDEEM_PROMOCODE"
  | "REGISTRATION_PROMOCODE";

export type WalletTransactionsProps = {
  amount: number;
  businessName?: string;
  fyndrCashStatus: string | "UNUSED" | "USED";
  invoiceId?: number;
  promoCode?: string;
  reason: PromocodeTypesProps;
  transactionDt: string;
};
