export type VerifyPromocodeResponse = {
  message: string;
  promoCodeDetails: {
    currencySymbol: string;
    amount: number;
  };
  promocode: boolean;
};
