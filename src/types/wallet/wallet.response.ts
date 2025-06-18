import { Currency, CurrencySymbol } from "../global";
import { WalletTransactionsProps } from "./wallet.types";

export type WalletTransactionsResponse = {
  balance: number;
  count: number;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  last: boolean;
  walletTransactionsList: WalletTransactionsProps[];
};
