import { Coordinates } from "../global";

export type GetBusinessDirectoryParams = {
  params: {
    search?: string;
    page: number;
    pageSize: number;
  };
  payload: {
    indvId: number | null;
    distance: number;
    isCategory: boolean;
    location: Coordinates;
  };
};

export type GetLocationOffersParams = {
  params: {
    locationIds: number[];
  };
};

export type GetLocationOfferReviewsParams = {
  payload: {
    bizId: number[];
  };
};

export type LikeBusinessParams = {
  payload: {
    bizid: number;
    indvid: number;
  };
};
