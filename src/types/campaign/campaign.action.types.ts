import { ActionResponse } from "../global";
import { GetLikedCampaignsParams } from "./campaign.params";
import { GetLikedCampaignsResponse } from "./campaign.response";

export type GetLikedCampaigns = ({
  params,
  payload,
}: GetLikedCampaignsParams) => Promise<
  ActionResponse<GetLikedCampaignsResponse>
>;
