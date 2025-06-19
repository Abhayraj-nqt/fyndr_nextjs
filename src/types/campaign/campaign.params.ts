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

export type LikeCampaignParams = {
  payload: {
    bizId: number | null;
    cmpnId: number | null;
    indvId: number | null;
    isDeleted: boolean | null;
    objid: number | null;
  };
};

export type GetCampaignByQrParams = {
  params: {
    qrCode: string;
    sortedBy?: string;
    orderBy?: string;
  };
  payload: {
    lat: number;
    lng: number;
  };
};

export type GetCampaignsParams = {
  params: {
    search?: string;
    page?: number;
    pageSize?: number;
    orderBy?: "ASC" | "DESC";
  };
  payload: {
    indvId: number | null;
    distance: number;
    location: Coordinates;
    categories: number[];
    campaignType?: string[];
    fetchById: string;
    fetchByGoal: string;
    locQRId?: null;
  };
};

export type GetBusinessCampaignsParams = {
  params: {
    bizid: number;
  };
};
