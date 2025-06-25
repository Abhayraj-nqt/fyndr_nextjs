import { OfferPurchaseProps } from "../offer-summary";

export type OfferSummaryResponse = {
  data: {
    count: number;
    last: boolean;
    listOfferPurchasedOutDTO: OfferPurchaseProps[];
    partiallyRedeemedOffersCount: number;
    purchasedOffersCount: number;
    redeemedOffersCount: number;
    unredeemedOffersCount: number;
  };
  success: boolean;
};
