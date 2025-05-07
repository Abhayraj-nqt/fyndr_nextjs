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
  businessName: string;
  fyndrCashStatus: string | "UNUSED" | "USED";
  invoiceId?: number;
  reason: string | "CASHBACK" | "REDEEM_PROMOCODE";
  transactionDt: string;
};
