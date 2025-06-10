import { CampaignProps } from "../campaign";

export type CampaignResponse = CampaignProps;

export type CampaignsResponse = {
  campaigns: CampaignProps[];
  last: boolean;
  resultFromCampaignTag: boolean;
  resultFromTextExactMatch: null | boolean;
};

export type CampaignListResponse = {
  campaigns: CampaignProps[];
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
