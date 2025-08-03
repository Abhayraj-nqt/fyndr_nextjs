import { Currency, CurrencySymbol } from "../global";
import { WalletTransactionsProps } from "./wallet.types";

export type GetWalletTransactionsResponse = {
  balance: number;
  count: number;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  last: boolean;
  walletTransactionsList: WalletTransactionsProps[];
};

export type WalletVerifyResponse = {
  isWalletActive: boolean;
  fyndrCash?: number;
};
