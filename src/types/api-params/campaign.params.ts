import {
  CampaignResponse,
  CampaignsResponse,
} from "../api-response/campaign.response";
import { ActionResponse, Coordinates } from "../global";

export type GetCampaignByQrProps = (
  params: {
    qrCode: string;
    sortedBy?: string;
    orderBy?: string;
  },
  payload: {
    lat: number;
    lng: number;
  }
) => Promise<ActionResponse<CampaignResponse>>;

export type GetCampaignsProps = (
  params: {
    search?: string;
    page: number;
    pageSize: number;
    orderBy?: "ASC" | "DESC";
  },
  payload: {
    indvId: number | null;
    distance: number;
    location: Coordinates;
    categories: number[];
    campaignType?: string[];
    fetchById: string;
    fetchByGoal: string;
    locQRId?: null;
  }
) => Promise<ActionResponse<CampaignsResponse>>;
