import { CampaignProps } from "../campaign";

export type CampaignResponse = CampaignProps;

export type CampaignsResponse = {
  campaigns: CampaignProps[];
  last: boolean;
  resultFromCampaignTag: boolean;
  resultFromTextExactMatch: null | boolean;
};
