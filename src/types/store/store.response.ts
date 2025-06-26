import { BusinessDirectory, LocationOffer } from "./store.types";

export type GetBusinessDirectoryResponse = {
  bizdir: BusinessDirectory[];
  count: number;
  last: boolean;
  resultFromTextExactMatch: null | unknown;
};

export type GetLocationOffersResponse = LocationOffer[];

export type GetLocationOfferReviewsResponse = {
  bizCount: {
    bizid: number;
    count: number;
  }[];
};

export type LikeBusinessResponse = {
  success: boolean;
};
