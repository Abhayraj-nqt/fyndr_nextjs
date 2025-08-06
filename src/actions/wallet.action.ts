"use server";

import { API_BASE_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import {
  GetWalletTransactions,
  WalletVerify,
} from "@/types/wallet/wallet.action.types";

export const onGetWalletTransactions: GetWalletTransactions = async ({
  params,
}) => {
  const { userId, pgStart, pgSize } = params;
  const endpoint = `${API_BASE_URL}/wallet/transactions?userId=${userId}&pgStart=${pgStart}&pgSize=${pgSize}`;

  return _get(endpoint, {
    requireAuth: true,
    cache: "force-cache",
    next: {
      revalidate: 60000,
    },
  });
};

export const onWalletVerify: WalletVerify = async ({ payload }) => {
  const endpoint = `${API_BASE_URL}/wallet/verify`;
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
