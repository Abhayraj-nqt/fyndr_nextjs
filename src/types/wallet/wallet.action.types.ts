import { ActionResponse } from "../global";
import {
  GetWalletTransactionsParams,
  WalletVerifyParams,
} from "./wallet.params";
import {
  GetWalletTransactionsResponse,
  WalletVerifyResponse,
} from "./wallet.response";

export type GetWalletTransactions = ({
  params,
}: GetWalletTransactionsParams) => Promise<
  ActionResponse<GetWalletTransactionsResponse>
>;

export type WalletVerify = ({
  payload,
}: WalletVerifyParams) => Promise<ActionResponse<WalletVerifyResponse>>;
