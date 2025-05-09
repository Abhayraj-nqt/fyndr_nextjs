type PaymentMethod = {
  brand: string | "visa";
  country: string | "FR";
  created: number;
  default: string | "y";
  exp_month: number;
  exp_year: number;
  id: string;
  last4: string;
};

type EntityRole =
  | "BIZ_ADMIN"
  | "SUPER_ADMIN"
  | "FYNDR_SUPPORT"
  | "INDIVIDUAL_ADMIN";

type EntityType = string;

type RouteAccess = {
  path: string;
  roles: EntityRole[];
};

type WalletTransactionsProps = {
  amount: number;
  businessName?: string;
  fyndrCashStatus: string | "UNUSED" | "USED";
  invoiceId?: number;
  promoCode?: string;
  reason:
    | "CASHBACK"
    | "PROMOCODE"
    | "REFERRAL"
    | "REDEEMED"
    | "FYNDR_CASH_EXPIRED"
    | "REDEEM_PROMOCODE"
    | "REGISTRATION_PROMOCODE";
  transactionDt: string;
};
