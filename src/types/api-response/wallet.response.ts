import { Currency, CurrencySymbol } from "../global";

export type WalletTransactionsResponse = {
  balance: number;
  count: number;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  last: boolean;
  walletTransactionsList: WalletTransactionsProps[];
};
