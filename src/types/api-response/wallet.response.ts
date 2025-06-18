import { Currency, CurrencySymbol } from "../global";

export type GetWalletTransactionsResponse = {
  balance: number;
  count: number;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  last: boolean;
  walletTransactionsList: WalletTransactionsProps[];
};
