import { CampaignProps } from "./campaign.types";

export type GetLikedCampaignsResponse = {
  campaigns: CampaignProps[];
  last: boolean;
};
