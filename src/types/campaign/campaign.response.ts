import { Campaign } from "./campaign.types";

export type GetLikedCampaignsResponse = {
  campaigns: Campaign[];
  last: boolean;
};

export type LikeCampaignResponse = {
  indvId: number;
  objid: number;
  cmpnId: number;
  bizId: number;
  isDeleted: boolean;
  likedCount: number;
};

export type GetCampaignByQrResponse = Campaign;

export type GetCampaignsResponse = {
  campaigns: Campaign[];
  last: boolean;
  resultFromCampaignTag: boolean;
  resultFromTextExactMatch: null | boolean;
};

export type GetBusinessCampaignsResponse = {
  campaigns: Campaign[];
  last: boolean;
};
