import { GetWalletTransactionsResponse } from "../api-response/wallet.response";
import { ActionResponse } from "../global";
import { GetWalletTransactionsParams } from "./wallet.params";

export type GetWalletTransactions = ({
  params,
}: GetWalletTransactionsParams) => Promise<
  ActionResponse<GetWalletTransactionsResponse>
>;
