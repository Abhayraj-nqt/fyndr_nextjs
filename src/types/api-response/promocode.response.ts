export type VerifyPromocodeResponse = {
  message: string;
  promoCodeDetails: {
    currencySymbol: string;
    amount: number;
  };
  promocode: boolean;
};

export type RedeemPromocodeResponse = {
  message: string;
};
