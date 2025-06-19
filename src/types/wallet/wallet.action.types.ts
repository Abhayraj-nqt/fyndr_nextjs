import { ActionResponse } from "../global";
import { GetWalletTransactionsParams } from "./wallet.params";
import { GetWalletTransactionsResponse } from "./wallet.response";

export type GetWalletTransactions = ({
  params,
}: GetWalletTransactionsParams) => Promise<
  ActionResponse<GetWalletTransactionsResponse>
>;
