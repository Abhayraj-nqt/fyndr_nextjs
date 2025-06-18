import {
  CampaignListResponse,
  CampaignResponse,
  CampaignsResponse,
  GetLikedCampaignsResponse,
  LikeCampaignResponse,
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
    page?: number;
    pageSize?: number;
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

export type GetCampaignMarkerProps = (payload: {
  indvId: number | null;
  distance: number;
  location: Coordinates;
  categories: number[];
  campaignType?: string[];
  fetchById: string;
  fetchByGoal: string;
  locQRId?: null;
}) => Promise<ActionResponse<CampaignsResponse>>;

export type GetCampaignListProps = (params: {
  bizid: number;
}) => Promise<ActionResponse<CampaignListResponse>>;

export type LikeCampaignProps = (payload: {
  bizId: number | null;
  cmpnId: number | null;
  indvId: number | null;
  isDeleted: boolean | null;
  objid: number | null;
}) => Promise<ActionResponse<LikeCampaignResponse>>;

export type GetLikedCampaigns = (args: {
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
}) => Promise<ActionResponse<GetLikedCampaignsResponse>>;
