export type VerifyPaymentParams = {
  payload: {
    qrcode: string;
    invoiceId: number;
    cardId: string;
    lat: null | number | unknown;
    lng: null | number | unknown;
    isOfferGifted: boolean;
  };
};
