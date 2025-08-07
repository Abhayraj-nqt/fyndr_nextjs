import { useQuery } from "@tanstack/react-query";

import { onWalletVerify } from "@/actions/wallet.action";
import { WalletVerifyParams } from "@/types/wallet/wallet.params";

export const useVerifyWallet = ({ payload }: WalletVerifyParams) => {
  const { data, isLoading, error, status } = useQuery({
    queryKey: ["verify wallet", payload],
    queryFn: () => onWalletVerify({ payload }),
  });

  return {
    isLoading,
    data,
    error,
    status: status === "success",
  };
};
