import { WalletTransactionsResponse } from "../api-response/wallet.response";
import { ActionResponse } from "../global";

export type GetWalletTransactions = (params: {
  userId: number;
  pgStart: number;
  pgSize: number;
}) => Promise<ActionResponse<WalletTransactionsResponse>>;
