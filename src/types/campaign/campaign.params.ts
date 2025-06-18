import { Coordinates } from "../global";

export type GetLikedCampaignsParams = {
  params: {
    search?: string;
    page?: number;
    pageSize?: number;
    orderBy?: "ASC" | "DESC";
  };
  payload: {
    location: Coordinates;
    userId: number;
  };
};
