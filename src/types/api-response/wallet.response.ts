import { Currency, CurrencySymbol } from "../global";

export type WalletTransactionsProps = {
  amount: number;
  businessName: string;
  fyndrCashStatus: string | "UNUSED" | "USED";
  invoiceId: number;
  reason: string | "CASHBACK" | "REDEEM_PROMOCODE";
  transactionDt: string;
};

export type WalletTransactionsResponse = {
  balance: number;
  count: number;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  last: boolean;
  walletTransactionsList: WalletTransactionsProps;
};
