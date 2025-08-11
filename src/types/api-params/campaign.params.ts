import { CampaignProps, CreateCampaignPayload } from "../campaign";
import { ActionResponse } from "../global";

export type CreateCampaign = (
  payload: CreateCampaignPayload
) => Promise<ActionResponse<CampaignProps>>;
