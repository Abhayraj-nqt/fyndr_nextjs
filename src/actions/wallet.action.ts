"use server";

import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import { GetWalletTransactions } from "@/types/api-params/wallet.params";

export const onGetWalletTransactions: GetWalletTransactions = async (
  params
) => {
  const { userId, pgStart, pgSize } = params;
  const endpoint = `${API_BASE_URL}/wallet/transactions?userId=${userId}&pgStart=${pgStart}&pgSize=${pgSize}`;

  return _get(endpoint, {
    requireAuth: true,
  });
};
