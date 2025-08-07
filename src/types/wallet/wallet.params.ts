export type GetWalletTransactionsParams = {
  params: {
    userId: number;
    pgStart: number;
    pgSize: number;
  };
};

export type WalletVerifyParams = {
  payload: { channel: "OFFERS" | string; totalAmount: string };
};
